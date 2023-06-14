# throwaway-site

Bits and bobs of a site

## Certificate Creation

```
openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365

openssl rsa -in keytmp.pem -out key.pem
```
