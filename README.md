# CSE-534-Project


#http-tests
Comparing HTTP/1.1, HTTP/2 and HTTP/2 with adaptive server push with Node.js. HTTP/3 server was developed using python - aioquic. 

##HTTP/1.1 Server Running Command
Run the below command in your cmd.

```
node http1.js

```

##HTTP/2.0 Server Running Command
Run the below command in your cmd.

```
node http2.js

```


##HTTP/2.0 Adpative Server Push Running Command
Run the below command in your cmd.

```
node http2kpush.js

```

##HTTP/3 Adpative Server Push Running Command
Make sure python 3.8 is installed and all the requirments for aioquic (https://github.com/aiortc/aioquic) are installed. Run the below command in your cmd.

```
$ python examples/http3_server.py --certificate tests/ssl_cert.pem --private-key tests/ssl_key.pem

```
