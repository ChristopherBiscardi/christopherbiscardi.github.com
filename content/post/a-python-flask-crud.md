---
title: "A Python Flask CRUD"
date: 2012-12-06 
url: "/2012/12/6/a-python-flask-crud/"
---


Recently I was asked to build a CRUD app.

The task was open to using any tech I wanted on the backend, so my first thought was a distributed service in Erlang with a WebMachine interface. This would satisfy the REST requirements for the location service, which we could access via an application server for web.

However, the preferred method for this task was described to be Python/Flask, So we’ll use that.

Since sessions are not technically RESTful, they cannot be included in a user authentication scheme. Client side on mobile devices is a different story, with iOS using keychain for security and Android advocating OAuth-type approaches. As it happens, the task language doesn’t include the concept of users, just locations, so we’ll skip authentication to make it REST-Compliant (note: REST doesn’t have a spec.)

Attributes of a favorite location object include:

- id
- lat
- lng
- address (e.g. 800 Market Street, San Francisco, CA 94114)
- name (e.g. Work)

This could easily fit in a SQL database, but since we’re using Geolocation and I happen to know that MongoDB’s Geo facilities would allow us to query based on distance from our current position, we’ll use Mongo. Alternatively, we could have also used ElasticSearch/Solr/Lucene but Mongo will serve our purposes just fine.

We will be deploying on Heroku to use the free ssl support and addons. In reality Heroku is a test platform due to being hosted on EC2 US East only. We will also be skipping the CDN (CloudFront/S3/etc) as the total users here will be under 5.

I’ve never used Flask before, so this will take a little longer than normal. If I was going for turnaround time, I might have used node.js and express or RESTify because I’m stronger with JS/node.

To connect to the Mongo Instance on Heroku || localhost:

```python
  import pymongo

  # Get MongoDB URL if on Heroku, else use localhost
  MONGO_URL = os.environ.get('MONGOHQ_URL')

   if MONGO_URL:
       # Get a connection
       conn = pymongo.Connection(MONGO_URL)

       # Get the database
       db = conn[urlparse(MONGO_URL).path[1:]]
   else:
       # Not on an app with the MongoHQ add-on, do some localhost action
       conn = pymongo.Connection('localhost', 27017)
       db = conn['test']
  # locations Collection
  locationsC = db.locations
```

And set up some content negotiation formatters:

```python
# Content Negotiation Formatters


class JSONFormatter(Formatter):
    format = 'json'
    mimetypes = ['application/json']

    def render(self, obj):
        return json.dumps(obj)


class HTMLFormatter(Formatter):
    format = 'json'
    mimetypes = ['text/html']

    def configure(self, template):
        self.template = template

    def render(self, obj):
        return render_template(self.template, **obj)
```

Having got some server basics out of the way I started on the structure of the home page. There isn’t a defined business purpose here, so I chose to make the design based around creating new locations.

[![Python Crud App Homepage](http://res.cloudinary.com/diqzbm8lz/image/upload/h_174,w_300/v1428611529/Screen-shot-2013-01-18-at-8.31.37-AM_vtxjto.png)](http://www.christopherbiscardi.com/2012/12/06/a-python-flask-crud/screen-shot-2013-01-18-at-8-31-37-am/)
