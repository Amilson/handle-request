## Handle Request

### A service to test a slow http response and more

### Description

**Why?**

Make a request to simulate a slow response.
Test how your application responds to a slow request/respose from your backend api.
Maybe there are others services doing this, with but handle request you might use responses with http error codes as your choice.

**How it works?**

Handle request will make a request with your url and returns the response in a payload to you.

**It's safe?**

Yes, every request just are only redirected, there is no data saved.

**My request needs some of header fields like Bearer, it's work?**

Yes, there is no problem, every header send to handle request will be send to the url param.

### Plus:

* Could be configurable to return HTTP status error, like 404, 500, etc.

### Taste it

**Handle Request** is deployed on https://amilson.dev/handle-request/index.html, so go ahead and taste it.


### API

#### Request

Build a URL with the following params:

```bash
https://amilson.dev/handle-request/delay/{delay_time}
```
```bash
https://amilson.dev/handle-request/delay/{delay_time}/url/{url}
```
```bash
https://amilson.dev/handle-request/error/{http_error}
```
```bash
https://amilson.dev/handle-request/error/{http_error}/delay/{delay_time}
```


<dl>
    <dt><code>delay_time</code></dt>
    <dd>Time to delay in milliseconds</dd>
    <dt><code>url</code></dt>
    <dd>The URL to get response</dd>
    <dt><code>http_error</code></dt>
    <dd>Any http error code</dd>
</dl>

### Feel free to send contributions by pull-request
