---
title: "Kafka, Kube, and Statefulsets on GKE"
date: 2017-11-17
tags: [gke,kubernetes,kafka,zookeeper]
---

# Kubernetes StatefulSets

> StatefulSet is the workload API object used to manage stateful applications.
> StatefulSets are beta in 1.8.
>
> [k8s
> docs](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)

[Kafka][kafka] and [Zookeeper][zookeeper] are two of the motivating examples for
StatefulSets in [Kubernetes][k8s]. Being stateful applications, we'll need disks
to store the data on. GKE can help us allocate disks and compute for brokers
even as we scale the service up.

# Booting a GKE Cluster

First we need the right Google Container Engine cluster. Since this is fairly
basic and meant for development we'll use a three node GKE cluster. This allows
us to run a 3-node Zookeeper ensemble and 3 kafka brokers. There should be one
Zookeeper and one Kafka Broker on each node. We'll modify the node type to
`n1-standard-2` which will be able to handle everything's memory requirements,
etc.

```shell
gcloud container clusters create test-cluster \
  --machine-type "n1-standard-2" \
  --cluster-version "1.8.3-gke.0"
```

# Running Zookeeper on Kubernetes

We'll use the [Zookeeper][zookeeper-statefulset] and [Kafka][kafka-statefulset]
example configs to start. First, the Zookeeper config:

```shell
➜ kubectl apply -f 10-zookeeper.yml
service "zk-svc" created
configmap "zk-cm" created
poddisruptionbudget "zk-pdb" created
statefulset "zk" created
```

```shell
➜ kubectl apply -f 20-kafka-brokers.yml
service "kafka-svc" created
poddisruptionbudget "kafka-pdb" created
statefulset "kafka" created
```

Note that if you spin them up too fast sequentially, kafka will `Error`, then
`CrashLoopBackOff` until it can connect to Zookeeper.

```
NAME      READY     STATUS              RESTARTS   AGE
kafka-0   0/1       Error               1          46s
zk-0      1/1       Running             0          1m
zk-1      1/1       Running             0          1m
zk-2      0/1       ContainerCreating   0          25s
```

A healthy cluster:

```
NAME      READY     STATUS    RESTARTS   AGE
kafka-0   1/1       Running   3          2m
kafka-1   1/1       Running   0          1m
kafka-2   1/1       Running   0          47s
zk-0      1/1       Running   0          3m
zk-1      1/1       Running   0          3m
zk-2      1/1       Running   0          2m
```

# Testing Kafka

We can use the following command to interactively choose a kafka container to
exec into.

```
kubectl get pods --no-headers | fzf | awk '{print $1}' | xargs -o -I % kubectl exec -it % bash
```

![](/img/fzf-kgp-zookeeper-kafka.png)

and then `ls` to see that we're in.

```
kafka@kafka-0:/$ ls
KEYS  boot  etc   lib	 media	opt   root  sbin  sys  usr
bin   dev   home  lib64  mnt	proc  run   srv   tmp  var
kafka@kafka-0:/$
```

We'll need to create a new topic (so run this in the container we just exec'd
into). The most interesting piece of this is that we're pointing to the
zookeeper nodes using the cluster addresses (such as
`zk-0.zk-svc.default.svc.cluster.local:2181`). This breaks down into the
stateful node identifier (`zk-0`), the service name (`zk-svc`), and the
network/namespace defaults (as well as the port).

```shell
kafka-topics.sh --create \
  --topic test \
  --zookeeper zk-0.zk-svc.default.svc.cluster.local:2181,zk-1.zk-svc.default.svc.cluster.local:2181,zk-2.zk-svc.default.svc.cluster.local:2181 \
  --partitions 3 \
  --replication-factor 2
```

and run a simple console consumer using the `kafka-console-consumer.sh` script.

```shell
kafka-console-consumer.sh --topic test --bootstrap-server localhost:9093
```

then exec into the same container again and run the producer so we can send
messages to the consumer.

```shell
> kafka-console-producer.sh --topic test --broker-list localhost:9093
hello
I like kafka
goodbye
```

Now we can check out the ISRs and partitions

```
> kafka-topics.sh --describe --topic test \
  --zookeeper zk-0.zk-svc.default.svc.cluster.local:2181,zk-1.zk-svc.default.svc.cluster.local:2181,zk-2.zk-svc.default.svc.cluster.local:2181
Topic:test	PartitionCount:3	ReplicationFactor:2	Configs:
	Topic: test	Partition: 0	Leader: 2	Replicas: 2,0	Isr: 2,0
	Topic: test	Partition: 1	Leader: 0	Replicas: 0,1	Isr: 0,1
	Topic: test	Partition: 2	Leader: 1	Replicas: 1,2	Isr: 1,2
```

## Kubernetes Objects

For Zookeeper we created the following objects:

* [Service][service]
* [ConfigMap][configmap]
* [PodDisruptionBudget][disruption-budget]
* [StatefulSet][statefulsets]

For Kafka Brokers we created very similar objects:

* [Service][service]
* [PodDisruptionBudget][disruption-budget]
* [StatefulSet][statefulsets]

Both of these look pretty similar. They each use a `StatefulSet`, `Service`, and
`PodDisruptionBudget`. Zookeeper also uses a `ConfigMap` instead of a file, etc

### Zookeeper

#### Service

The Zookeeper `Service` is the first object we see in the yaml file.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: zk-svc
  labels:
    app: zk-svc
spec:
  ports:
  - port: 2888
    name: server
  - port: 3888
    name: leader-election
  clusterIP: None
  selector:
    app: zk
```

This block says we're creating a `Service` with a name of `zk-svc` (remember the
URLs we had to use to access Zookeeper earlier). We've removed the `clusterIP`
which makes this a [Headless Service][headless-service]. Since Zookeeper and
Kafka handle their own load balancing, etc, using a headless service lets us opt
out of Kubernetes' load balancing and service discovery, letting Zookeeper/Kafka
handle it on their own. Also notice that we've exposed the appropriate ports for
Zookeeper leader election and server access.

#### ConfigMap

Next we define a `ConfigMap`, which contains configuration options for
Zookeeper.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: zk-cm
data:
  jvm.heap: "1G"
  tick: "2000"
  init: "10"
  sync: "5"
  client.cnxns: "60"
  snap.retain: "3"
  purge.interval: "0"
```

#### PodDisruptionBudget

Next we create a `PodDisruptionBudget` that lets us ensure that a minimum of 2
nodes will be available at any given time _due to voluntary disruptions like
upgrades_. It's important to note that this does not cover nodes crashing on
their own.

```yaml
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  name: zk-pdb
spec:
  selector:
    matchLabels:
      app: zk
  minAvailable: 2
```

#### StatefulSet

Ah yes, the central dish to our exploration, the [StatefulSet][statefulsets].

We set the affinity for the Zookeeper pod to try to place itself on a node that
doesn't already have a Zookeeper node.

```yaml
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
            - key: "app"
              operator: In
              values:
              - zk
        topologyKey: "kubernetes.io/hostname"
```

The container specification is fairly readable if you're familiar with running
containers. There's the start command, env vars, and resourcing. We then get to
the readiness and liveness probes, which use a custom shell script to ask the
cluster if it's ok (using `ruok`).

```yaml
readinessProbe:
  exec:
    command:
    - "zkOk.sh"
  initialDelaySeconds: 10
  timeoutSeconds: 5
livenessProbe:
  exec:
    command:
    - "zkOk.sh"
  initialDelaySeconds: 10
  timeoutSeconds: 5
```

The volume mounts allocate a volume named `datadir` and claim `10Gi` of storage.
This is a generic way to "claim" storage and translates to a
[`gcePersistentDisk`](https://kubernetes.io/docs/concepts/storage/volumes/#gcepersistentdisk)
on GKE.

```yaml
  volumeMounts:
  - name: datadir
    mountPath: /var/lib/zookeeper
```

```yaml
volumeClaimTemplates:
- metadata:
    name: datadir
  spec:
    accessModes: [ "ReadWriteOnce" ]
    resources:
      requests:
        storage: 10Gi
```

The Kafka yaml file has basically the same components so I won't go over it
here.

Congrats, you're running Kafka on GKE. This should be good enough for any
testing you'd want to run. In the next post in this series we'll go over how to
use the Confluent Platform instead of the containers specified in these yaml
files.

# Extra Content (yaml files)

## Zookeeper

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: zk-svc
  labels:
    app: zk-svc
spec:
  ports:
  - port: 2888
    name: server
  - port: 3888
    name: leader-election
  clusterIP: None
  selector:
    app: zk
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: zk-cm
data:
  jvm.heap: "1G"
  tick: "2000"
  init: "10"
  sync: "5"
  client.cnxns: "60"
  snap.retain: "3"
  purge.interval: "0"
---
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  name: zk-pdb
spec:
  selector:
    matchLabels:
      app: zk
  minAvailable: 2
---
apiVersion: apps/v1beta1
kind: StatefulSet
metadata:
  name: zk
spec:
  serviceName: zk-svc
  replicas: 3
  template:
    metadata:
      labels:
        app: zk
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchExpressions:
                  - key: "app"
                    operator: In
                    values:
                    - zk
              topologyKey: "kubernetes.io/hostname"
      containers:
      - name: k8szk
        imagePullPolicy: Always
        image: gcr.io/google_samples/k8szk:v2
        resources:
          requests:
            memory: "2Gi"
            cpu: "500m"
        ports:
        - containerPort: 2181
          name: client
        - containerPort: 2888
          name: server
        - containerPort: 3888
          name: leader-election
        env:
        - name : ZK_REPLICAS
          value: "3"
        - name : ZK_HEAP_SIZE
          valueFrom:
            configMapKeyRef:
                name: zk-cm
                key: jvm.heap
        - name : ZK_TICK_TIME
          valueFrom:
            configMapKeyRef:
                name: zk-cm
                key: tick
        - name : ZK_INIT_LIMIT
          valueFrom:
            configMapKeyRef:
                name: zk-cm
                key: init
        - name : ZK_SYNC_LIMIT
          valueFrom:
            configMapKeyRef:
                name: zk-cm
                key: tick
        - name : ZK_MAX_CLIENT_CNXNS
          valueFrom:
            configMapKeyRef:
                name: zk-cm
                key: client.cnxns
        - name: ZK_SNAP_RETAIN_COUNT
          valueFrom:
            configMapKeyRef:
                name: zk-cm
                key: snap.retain
        - name: ZK_PURGE_INTERVAL
          valueFrom:
            configMapKeyRef:
                name: zk-cm
                key: purge.interval
        - name: ZK_CLIENT_PORT
          value: "2181"
        - name: ZK_SERVER_PORT
          value: "2888"
        - name: ZK_ELECTION_PORT
          value: "3888"
        command:
        - sh
        - -c
        - zkGenConfig.sh && zkServer.sh start-foreground
        readinessProbe:
          exec:
            command:
            - "zkOk.sh"
          initialDelaySeconds: 10
          timeoutSeconds: 5
        livenessProbe:
          exec:
            command:
            - "zkOk.sh"
          initialDelaySeconds: 10
          timeoutSeconds: 5
        volumeMounts:
        - name: datadir
          mountPath: /var/lib/zookeeper
      securityContext:
        runAsUser: 1000
        fsGroup: 1000
  volumeClaimTemplates:
  - metadata:
      name: datadir
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
```

## Kafka

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: kafka-svc
  labels:
    app: kafka
spec:
  ports:
  - port: 9093
    name: server
  clusterIP: None
  selector:
    app: kafka
---
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  name: kafka-pdb
spec:
  selector:
    matchLabels:
      app: kafka
  minAvailable: 2
---
apiVersion: apps/v1beta1
kind: StatefulSet
metadata:
  name: kafka
spec:
  serviceName: kafka-svc
  replicas: 3
  template:
    metadata:
      labels:
        app: kafka
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchExpressions:
                  - key: "app"
                    operator: In
                    values:
                    - kafka
              topologyKey: "kubernetes.io/hostname"
        podAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
             - weight: 1
               podAffinityTerm:
                 labelSelector:
                    matchExpressions:
                      - key: "app"
                        operator: In
                        values:
                        - zk
                 topologyKey: "kubernetes.io/hostname"
      terminationGracePeriodSeconds: 300
      containers:
      - name: k8skafka
        imagePullPolicy: Always
        image: gcr.io/google_samples/k8skafka:v1
        resources:
          requests:
            memory: "1Gi"
            cpu: 500m
        ports:
        - containerPort: 9093
          name: server
        command:
        - sh
        - -c
        - "exec kafka-server-start.sh /opt/kafka/config/server.properties --override broker.id=${HOSTNAME##*-} \
          --override listeners=PLAINTEXT://:9093 \
          --override zookeeper.connect=zk-0.zk-svc.default.svc.cluster.local:2181,zk-1.zk-svc.default.svc.cluster.local:2181,zk-2.zk-svc.default.svc.cluster.local:2181 \
          --override log.dir=/var/lib/kafka \
          --override auto.create.topics.enable=true \
          --override auto.leader.rebalance.enable=true \
          --override background.threads=10 \
          --override compression.type=producer \
          --override delete.topic.enable=false \
          --override leader.imbalance.check.interval.seconds=300 \
          --override leader.imbalance.per.broker.percentage=10 \
          --override log.flush.interval.messages=9223372036854775807 \
          --override log.flush.offset.checkpoint.interval.ms=60000 \
          --override log.flush.scheduler.interval.ms=9223372036854775807 \
          --override log.retention.bytes=-1 \
          --override log.retention.hours=168 \
          --override log.roll.hours=168 \
          --override log.roll.jitter.hours=0 \
          --override log.segment.bytes=1073741824 \
          --override log.segment.delete.delay.ms=60000 \
          --override message.max.bytes=1000012 \
          --override min.insync.replicas=1 \
          --override num.io.threads=8 \
          --override num.network.threads=3 \
          --override num.recovery.threads.per.data.dir=1 \
          --override num.replica.fetchers=1 \
          --override offset.metadata.max.bytes=4096 \
          --override offsets.commit.required.acks=-1 \
          --override offsets.commit.timeout.ms=5000 \
          --override offsets.load.buffer.size=5242880 \
          --override offsets.retention.check.interval.ms=600000 \
          --override offsets.retention.minutes=1440 \
          --override offsets.topic.compression.codec=0 \
          --override offsets.topic.num.partitions=50 \
          --override offsets.topic.replication.factor=3 \
          --override offsets.topic.segment.bytes=104857600 \
          --override queued.max.requests=500 \
          --override quota.consumer.default=9223372036854775807 \
          --override quota.producer.default=9223372036854775807 \
          --override replica.fetch.min.bytes=1 \
          --override replica.fetch.wait.max.ms=500 \
          --override replica.high.watermark.checkpoint.interval.ms=5000 \
          --override replica.lag.time.max.ms=10000 \
          --override replica.socket.receive.buffer.bytes=65536 \
          --override replica.socket.timeout.ms=30000 \
          --override request.timeout.ms=30000 \
          --override socket.receive.buffer.bytes=102400 \
          --override socket.request.max.bytes=104857600 \
          --override socket.send.buffer.bytes=102400 \
          --override unclean.leader.election.enable=true \
          --override zookeeper.session.timeout.ms=6000 \
          --override zookeeper.set.acl=false \
          --override broker.id.generation.enable=true \
          --override connections.max.idle.ms=600000 \
          --override controlled.shutdown.enable=true \
          --override controlled.shutdown.max.retries=3 \
          --override controlled.shutdown.retry.backoff.ms=5000 \
          --override controller.socket.timeout.ms=30000 \
          --override default.replication.factor=1 \
          --override fetch.purgatory.purge.interval.requests=1000 \
          --override group.max.session.timeout.ms=300000 \
          --override group.min.session.timeout.ms=6000 \
          --override inter.broker.protocol.version=0.10.2-IV0 \
          --override log.cleaner.backoff.ms=15000 \
          --override log.cleaner.dedupe.buffer.size=134217728 \
          --override log.cleaner.delete.retention.ms=86400000 \
          --override log.cleaner.enable=true \
          --override log.cleaner.io.buffer.load.factor=0.9 \
          --override log.cleaner.io.buffer.size=524288 \
          --override log.cleaner.io.max.bytes.per.second=1.7976931348623157E308 \
          --override log.cleaner.min.cleanable.ratio=0.5 \
          --override log.cleaner.min.compaction.lag.ms=0 \
          --override log.cleaner.threads=1 \
          --override log.cleanup.policy=delete \
          --override log.index.interval.bytes=4096 \
          --override log.index.size.max.bytes=10485760 \
          --override log.message.timestamp.difference.max.ms=9223372036854775807 \
          --override log.message.timestamp.type=CreateTime \
          --override log.preallocate=false \
          --override log.retention.check.interval.ms=300000 \
          --override max.connections.per.ip=2147483647 \
          --override num.partitions=1 \
          --override producer.purgatory.purge.interval.requests=1000 \
          --override replica.fetch.backoff.ms=1000 \
          --override replica.fetch.max.bytes=1048576 \
          --override replica.fetch.response.max.bytes=10485760 \
          --override reserved.broker.max.id=1000 "
        env:
        - name: KAFKA_HEAP_OPTS
          value : "-Xmx512M -Xms512M"
        - name: KAFKA_OPTS
          value: "-Dlogging.level=INFO"
        volumeMounts:
        - name: datadir
          mountPath: /var/lib/kafka
        readinessProbe:
          exec:
           command:
            - sh
            - -c
            - "/opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server=localhost:9093"
      securityContext:
        runAsUser: 1000
        fsGroup: 1000
  volumeClaimTemplates:
  - metadata:
      name: datadir
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
```

[kafka]: https://kafka.apache.org/
[zookeeper]: https://zookeeper.apache.org/
[k8s]: https://kubernetes.io/
[gke]: https://cloud.google.com/container-engine/
[zookeeper-statefulset]: https://github.com/kubernetes/contrib/tree/0c2c22990617bc5ddb696ae7171ecbe1ca208d17/statefulsets/zookeeper
[kafka-statefulset]: https://github.com/kubernetes/contrib/tree/0c2c22990617bc5ddb696ae7171ecbe1ca208d17/statefulsets/kafka
[statefulsets]: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/
[service]: https://kubernetes.io/docs/concepts/services-networking/service/
[configmap]: https://kubernetes.io/docs/tasks/configure-pod-container/configmap/
[disruption-budget]: https://kubernetes.io/docs/concepts/workloads/pods/disruptions/
[headless-service]: https://kubernetes.io/docs/concepts/services-networking/service/#headless-services
