---
title: "Confluent Kafka GKE"
date: 2017-11-23
tags: [gke,kubernetes,kafka,zookeeper, confluent]
---

In the [previous post](/post/kafka-kube-and-statefulsets-on-gke/) we went
through using StatefulSets to deploy Kafka and Zookeeper on GKE. One problem was
that we used an effectively "random" image. Confluent provides [a set of
images](https://github.com/confluentinc/cp-docker-images) for deploying Kafka,
Zookeeper, and more that is continually updated and supported so we'd like to
move to those images.

## Zookeeper changes

We're basically going to be combining the already-working object definitions
from the last post with the
[quickstart](https://docs.confluent.io/current/installation/docker/docs/quickstart.html#zookeeper)
and other reference documentation from Confluent. Let's reuse the service name
and other fairly inconsequential items.

The `HOSTNAME` for a StatefulSet is postfixed with a number (`zk-0`, `zk-1`,
...) so we'll grab that in our `command` and set the `ZOOKEEPER_SERVER_ID` by
chopping off the `zk-` prefix. Hopefully in the future, we'll be able to use the
[downward
api](https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/)
with `metadata.ordinal` or similar since overriding `command` is pretty hacky.

```yaml
image: confluentinc/cp-zookeeper:3.3.1
command:
  - "bash"
  - "-c"
  - "ZOOKEEPER_SERVER_ID=$((${HOSTNAME:3}+1)) && /etc/confluent/docker/run"
```

We also set up the `ZOOKEEPER_SERVERS` config with the full entries for the
three zk pods for leader election and quorum. Remember that we're using a
headless service so that Zookeeper can handle it's own routing.

```yaml
data:
  servers: "zk-0.zk-svc.default.svc.cluster.local:2888:3888;zk-1.zk-svc.default.svc.cluster.local:2888:3888;zk-2.zk-svc.default.svc.cluster.local:2888:3888"
```

That and some env var changes gets us the Zookeeper yaml.

### Zookeeper yaml:

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
  tick: "2000"
  servers: "zk-0.zk-svc.default.svc.cluster.local:2888:3888;zk-1.zk-svc.default.svc.cluster.local:2888:3888;zk-2.zk-svc.default.svc.cluster.local:2888:3888"
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
  podManagementPolicy: Parallel
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
        image: confluentinc/cp-zookeeper:3.3.1
        command:
          - "bash"
          - "-c"
          - "ZOOKEEPER_SERVER_ID=$((${HOSTNAME:3}+1)) && /etc/confluent/docker/run"
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
        - name : ZOOKEEPER_TICK_TIME
          valueFrom:
            configMapKeyRef:
                name: zk-cm
                key: tick
        - name : ZOOKEEPER_SYNC_LIMIT
          valueFrom:
            configMapKeyRef:
                name: zk-cm
                key: tick
        - name : ZOOKEEPER_SERVERS
          valueFrom:
            configMapKeyRef:
                name: zk-cm
                key: servers
        - name: ZOOKEEPER_CLIENT_PORT
          value: "2182"
        # SERVER_ID is required but not used as this value
        - name: ZOOKEEPER_SERVER_ID
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        volumeMounts:
        - name: datadir
          mountPath: /var/lib/zookeeper
  volumeClaimTemplates:
  - metadata:
      name: datadir
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
```

# Kafka Changes

We'll modify the kafka configmap to connect to zookeeper at the appropriate
locations.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: kafka-cm
data:
  advertised.listeners: PLAINTEXT://kafka-0.kafka-svc.default.svc.cluster.local:9093
  connect: zk-0.zk-svc.default.svc.cluster.local:2181,zk-1.zk-svc.default.svc.cluster.local:2181,zk-2.zk-svc.default.svc.cluster.local:2181
```

We'll also modify the `command` to set `KAFKA_ADVERTISED_LISTENERS` and
`KAFKA_BROKER_ID`. Both options use the pull the prefix off the `HOSTNAME` to
leave us with the pod's number (`${HOSTNAME##*-}`). `KAFKA_ADVERTISED_LISTENERS`
need to be set to this pod's host and port, while the `KAFKA_BROKER_ID` needs to
be a unique number. Luckily for us, we have Kubernetes allocating unique pod
names with number prefixes (because statefulset). These look like `kafka-0`,
`kafka-1`, etc.

```yaml
image: confluentinc/cp-kafka:3.3.1
...
command:
  - sh
  - -c
  - "KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka-${HOSTNAME##*-}.kafka-svc.default.svc.cluster.local:9093 KAFKA_BROKER_ID=${HOSTNAME##*-} /etc/confluent/docker/run"
```

# Kafka yaml

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
apiVersion: v1
kind: ConfigMap
metadata:
  name: kafka-cm
data:
  advertised.listeners: PLAINTEXT://kafka-0.kafka-svc.default.svc.cluster.local:9093
  #PLAINTEXT://:9093
  connect: zk-0.zk-svc.default.svc.cluster.local:2181,zk-1.zk-svc.default.svc.cluster.local:2181,zk-2.zk-svc.default.svc.cluster.local:2181
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
        image: confluentinc/cp-kafka:3.3.1
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
        - "KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka-${HOSTNAME##*-}.kafka-svc.default.svc.cluster.local:9093 KAFKA_BROKER_ID=${HOSTNAME##*-} /etc/confluent/docker/run"
        env:
        - name: KAFKA_HEAP_OPTS
          value : "-Xmx512M -Xms512M"
        - name: KAFKA_OPTS
          value: "-Dlogging.level=INFO"
        - name: KAFKA_ADVERTISED_LISTENERS
          valueFrom:
            configMapKeyRef:
                name: kafka-cm
                key: advertised.listeners
        - name: KAFKA_ZOOKEEPER_CONNECT
          valueFrom:
            configMapKeyRef:
                name: kafka-cm
                key: connect
        volumeMounts:
        - name: datadir
          mountPath: /var/lib/kafka
        # readinessProbe:
        #   exec:
        #    command:
        #     - sh
        #     - -c
        #     - "/opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server=localhost:9093"
  volumeClaimTemplates:
  - metadata:
      name: datadir
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
```

# Fin

We can now play with Kafka. First we'll exec into `kafka-0`.

```shell
kubectl exec -it kafka-0 bash
```

Notably, we use a shell in `kafka-0` to do this because the headless services
are only available in-cluster. First, we set an environment variable to store
the list of kafka brokers. Then we use `kafka-topics` and the pre-existing
`$KAFKA_ZOOKEEPER_CONNECT` to create a topic. We can then list all topics
according to zookeeper, produce a few messages, and consume a few messages.

```shell
> export KAFKA_BROKERS=kafka-0.kafka-svc.default.svc.cluster.local:9093;kafka-1.kafka-svc.default.svc.cluster.local:9093;kafka-2.kafka-svc.default.svc.cluster.local:9093
> kafka-topics --create \
               --zookeeper $KAFKA_ZOOKEEPER_CONNECT \
               --replication-factor 3 \
               --partitions 3 \
               --topic test
Created topic "test".
> kafka-topics --list --zookeeper $KAFKA_ZOOKEEPER_CONNECT
__consumer_offsets
test
> kafka-console-producer --broker-list $KAFKA_BROKERS --topic test
This is a message
This is another message
> kafka-console-consumer \
      --bootstrap-server $KAFKA_BROKERS \
      --topic test \
      --from-beginning
This is a message
This is another message
```
