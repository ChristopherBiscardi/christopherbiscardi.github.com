---
title: "GeoSpatial Indexing with Riak Search 2.0 (Yokozuna/Solr)"
date: 2014-02-07
url: "/2014/2/7/geospatial-indexing-with-riak-search-2-0-yokozunasolr/"
---


In this post we will be using curl to construct a geospatial index using Riak
Search 2 (also known as Yokozuna) which is backed by Solr.

I’ll be using [Riak Pre11](http://docs.basho.com/riak/2.0.0pre11/downloads/) for
this.

In `etc/riak.conf` change `search` to `on`:
 (It was on line 411 for me)

```
search = on
```

Make sure your `ulimit` is 4096 or greater:

```bash
ulimit -n 4096
```

Then start Riak. I’m using `console` myself, but `start` would also work.

```bash
./bin/riak console
```


## Creating a Schema

Let’s create a schema so that Solr indexes our data correctly (file available
[here](https://gist.github.com/ChristopherBiscardi/8876815)):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<schema name="geotest" version="1.5">
  <uniqueKey>_yz_id
  <fields>
    <field name="name" type="string" indexed="true" stored="true"/>
    <field name="loc"  type="location_rpt"  indexed="true" stored="true"/>

    <!-- Begin Yokozuna Fields -->
   <field name="_yz_id" type="_yz_str" indexed="true" stored="true" required="true" />

   <field name="text" type="text_ws" indexed="true" stored="false" multiValued="true"/>

   <field name="_version_" type="long" indexed="true" stored="true"/>

   <!-- Entropy Data: Data related to anti-entropy -->
   <field name="_yz_ed" type="_yz_str" indexed="true" stored="false"/>

   <!-- Partition Number: Used as a filter query param -->
   <field name="_yz_pn" type="_yz_str" indexed="true" stored="false"/>

   <!-- First Partition Number: The first partition in this doc's
        preflist, used for further filtering on overlapping partitions. -->
   <field name="_yz_fpn" type="_yz_str" indexed="true" stored="false"/>

   <!-- If there is a sibling, use vtag to differentiate them -->
   <field name="_yz_vtag" type="_yz_str" indexed="true" stored="false"/>

   <!-- Node: The name of the node that this doc was created on. -->
   <field name="_yz_node" type="_yz_str" indexed="true" stored="false"/>

   <field name="_yz_rt" type="_yz_str" indexed="true" stored="true"/>

   <!-- Riak Bucket: The bucket of the Riak object this doc corresponds to. -->
   <field name="_yz_rb" type="_yz_str" indexed="true" stored="true"/>

   <!-- Riak Key: The key of the Riak object this doc corresponds to. -->
   <field name="_yz_rk" type="_yz_str" indexed="true" stored="true"/>

   <!-- Node: Stores a flag if this doc is the product of a failed object extration -->
   <field name="_yz_err" type="_yz_str" indexed="true" stored="false"/>
  </fields>
  <types>
    <fieldType name="location_rpt"   class="solr.SpatialRecursivePrefixTreeFieldType"
	               spatialContextFactory="com.spatial4j.core.context.jts.JtsSpatialContextFactory"
	               distErrPct="0.025"
	               maxDistErr="0.000009"
	               units="degrees"
	            />
    <!-- since fields of this type are by default not stored or indexed,
         any data added to them will be ignored outright.  -->
    <fieldtype name="ignored" stored="false" indexed="false" multiValued="true" class="solr.StrField" />

    <!-- YZ String: Used for non-analyzed fields -->
    <fieldType name="_yz_str" class="solr.StrField" sortMissingLast="true"/>
    <fieldType name="string" class="solr.StrField" sortMissingLast="true"/>
    <fieldType name="boolean" class="solr.BoolField" sortMissingLast="true"/>
    <fieldType name="int" class="solr.TrieIntField" precisionStep="0" positionIncrementGap="0"/>
    <fieldType name="float" class="solr.TrieFloatField" precisionStep="0" positionIncrementGap="0"/>
    <fieldType name="long" class="solr.TrieLongField" precisionStep="0" positionIncrementGap="0"/>
    <fieldType name="double" class="solr.TrieDoubleField" precisionStep="0" positionIncrementGap="0"/>
    <!--
     Numeric field types that index each value at various levels of precision
     to accelerate range queries when the number of values between the range
     endpoints is large. See the javadoc for NumericRangeQuery for internal
     implementation details.

     Smaller precisionStep values (specified in bits) will lead to more tokens
     indexed per value, slightly larger index size, and faster range queries.
     A precisionStep of 0 disables indexing at different precision levels.
    -->
    <fieldType name="tint" class="solr.TrieIntField" precisionStep="8" positionIncrementGap="0"/>
    <fieldType name="tfloat" class="solr.TrieFloatField" precisionStep="8" positionIncrementGap="0"/>
    <fieldType name="tlong" class="solr.TrieLongField" precisionStep="8" positionIncrementGap="0"/>
    <fieldType name="tdouble" class="solr.TrieDoubleField" precisionStep="8" positionIncrementGap="0"/>
    <fieldType name="date" class="solr.TrieDateField" precisionStep="0" positionIncrementGap="0"/>
    <!-- A Trie based date field for faster date range queries and date faceting. -->
    <fieldType name="tdate" class="solr.TrieDateField" precisionStep="6" positionIncrementGap="0"/>
    <!--Binary data type. The data should be sent/retrieved in as Base64 encoded Strings -->
    <fieldtype name="binary" class="solr.BinaryField"/>
    <fieldType name="random" class="solr.RandomSortField" indexed="true"/>
    <!-- A text field that only splits on whitespace for exact matching of words -->
    <fieldType name="text_ws" class="solr.TextField" positionIncrementGap="100">
      <analyzer>
        <tokenizer class="solr.WhitespaceTokenizerFactory"/>
      </analyzer>
    </fieldType>
    <!-- A general text field that has reasonable, generic
         cross-language defaults: it tokenizes with StandardTokenizer,
         removes stop words from case-insensitive "stopwords.txt"
         (empty by default), and down cases.  At query time only, it
         also applies synonyms. -->
    <fieldType name="text_general" class="solr.TextField" positionIncrementGap="100">
      <analyzer type="index">
        <tokenizer class="solr.StandardTokenizerFactory"/>
        <filter class="solr.StopFilterFactory" ignoreCase="true" words="stopwords.txt"/>
        <filter class="solr.LowerCaseFilterFactory"/>
      </analyzer>
      <analyzer type="query">
        <tokenizer class="solr.StandardTokenizerFactory"/>
        <filter class="solr.StopFilterFactory" ignoreCase="true" words="stopwords.txt"/>
        <filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" expand="true"/>
        <filter class="solr.LowerCaseFilterFactory"/>
      </analyzer>
    </fieldType>
  </types>
</schema>
```

The important parts here are the schema name being `geotest`

```xml
<schema name="geotest" version="1.5">
```

our two fields. `name` and `loc`

```xml
    <field name="name" type="string" indexed="true" stored="true"/>
    <field name="loc"  type="location_rpt"  indexed="true" stored="true"/>```

and our fieldType `location_rpt`

```xml
	<fieldType name="location_rpt"   class="solr.SpatialRecursivePrefixTreeFieldType"
	               distErrPct="0.025"
	               maxDistErr="0.000009"
	               units="degrees"
	            />
```

Pretty much everything else is boilerplate so that the Riak Solr integration
works.

## Upload Schema

We can now upload this schema (I saved the schema above as schema.xml in my
current directory):

```bash
curl -i -XPUT http://localhost:8098/search/schema/geotest \
  -H 'content-type: application/xml' \
  --data-binary @schema.xml
```


## Create Index

…and we create an index named “my_geo_index” which uses the schema (name =
“geotest”) we just uploaded.

```bash
curl -i -XPUT http://localhost:8098/search/index/my_geo_index \
  -H 'content-type: application/json' \
  -d '{"schema":"geotest"}'
```

They should both return 204 responses.


## Create Bucket Type

Next we’ll create a bucket type named “geo_type” using the `riak-admin` command.
Our bucket type won’t have any special properties, it just needs to exist.

```bash
./bin/riak-admin bucket-type create geo_type '{"props":{}}'
```


## Activate Bucket Type

We also need to activate our new bucket type:

```bash
./bin/riak-admin bucket-type activate geo_type
```


## Create Bucket

We will now create a bucket named “stuff” under the `geo_type` bucket type. In
addition, this command associates the Solr index `my_geo_index` with the bucket
`stuff`

```bash
curl -XPUT 'http://localhost:8098/types/geo_type/buckets/stuff/props' \
  -H 'content-type: application/json' \
  -d '{"props":{"search_index":"my_geo_index"}}'
```


## Indexing Data

That’s it. Let’s index some data!

```bash
curl -i -H 'content-type: application/json' -X PUT 'http://localhost:8098/types/geo_type/buckets/stuff/keys/sf' -d '{"name":"San Francisco", "loc":"37.774929,-122.419416"}'
curl -i -H 'content-type: application/json' -X PUT 'http://localhost:8098/types/geo_type/buckets/stuff/keys/sj' -d '{"name":"San Jose", "loc":"37.339386,-121.894955"}'
curl -i -H 'content-type: application/json' -X PUT 'http://localhost:8098/types/geo_type/buckets/stuff/keys/mv' -d '{"name":"Mountain View", "loc":"37.386052,-122.083851"}'
```


## Querying

Now for the fun part. Let’s find all of our data, scored and sorted by distance.
The score will return a distance (in degrees). We are querying from a location
in Palo Alto, California, so we should see fairly small distances to Mountain
View, San Jose and San Francisco.

```bash
curl 'http://localhost:8098/search/my_geo_index?&fl=*,score&sort=score%20asc&q={!geofilt%20score=distance%20filter=false%20sfield=loc%20pt=37.441883,-122.143019%20d=10}&wt=json'
```

The query returns the results:

```javascript
{
   "responseHeader":{
      "status":0,
      "QTime":24,
      "params":{
         "shards":"127.0.0.1:8093/solr/my_geo_index",
         "sort":"score asc",
         "fl":"*,score",
         "q":"{!geofilt score=distance filter=false sfield=loc pt=37.441883,-122.143019 d=10}",
         "127.0.0.1:8093":"_yz_pn:64 OR (_yz_pn:61 AND (_yz_fpn:61)) OR _yz_pn:60 OR _yz_pn:57 OR _yz_pn:54 OR _yz_pn:51 OR _yz_pn:48 OR _yz_pn:45 OR _yz_pn:42 OR _yz_pn:39 OR _yz_pn:36 OR _yz_pn:33 OR _yz_pn:30 OR _yz_pn:27 OR _yz_pn:24 OR _yz_pn:21 OR _yz_pn:18 OR _yz_pn:15 OR _yz_pn:12 OR _yz_pn:9 OR _yz_pn:6 OR _yz_pn:3",
         "wt":"json"
      }
   },
   "response":{
      "numFound":4,
      "start":0,
      "maxScore":0.39857662,
      "docs":[
         {
            "loc":"37.386052,-122.083851",
            "name":"Mountain View",
            "_yz_id":"geo_type_stuff_mv_42",
            "_yz_rk":"mv",
            "_yz_rt":"geo_type",
            "_yz_rb":"stuff",
            "score":0.072977245
         },
         {
            "loc":"37.339386,-121.894955",
            "name":"San Jose",
            "_yz_id":"geo_type_stuff_sj_21",
            "_yz_rk":"sj",
            "_yz_rt":"geo_type",
            "_yz_rb":"stuff",
            "score":0.2221485
         },
         {
            "loc":"37.774929,-122.419416",
            "name":"San Francisco",
            "_yz_id":"geo_type_stuff_sf_60_MeNonMcIRG8mmdJpk5KfM",
            "_yz_rk":"sf",
            "_yz_rt":"geo_type",
            "_yz_rb":"stuff",
            "score":0.39857662
         },
         {
            "loc":"37.774929,-122.419416",
            "name":"San Francisco",
            "_yz_id":"geo_type_stuff_sf_60_5n4gT2r1Gt2qlHwfKCwypL",
            "_yz_rk":"sf",
            "_yz_rt":"geo_type",
            "_yz_rb":"stuff",
            "score":0.39857662
         }
      ]
   }
}
```

You’ll notice that there are two San Franciscos. This is because I inserted data
twice into Riak without using a VClock the second time (While I was writing this
post), resulting in siblings. This issue is easily resolvable by resolving the
siblings as mentioned
[here](http://docs.basho.com/riak/latest/theory/concepts/Vector-Clocks/).

Now, we can convert to miles by multiplying the score (which is degrees) by
`69.09341`. If we do this for San Jose it would be `.2221485 * 69.09341`, or
about `15.34 mi`.

For Kilometers we use `111.1951`, which gives us about `24.7 km`.

Since our query location was from Palo Alto, California, we can see that San
Jose is indeed, approximately that 15 miles away. Our search was successful!
