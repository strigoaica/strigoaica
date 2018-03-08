![Strigoaica](https://image.ibb.co/h0Uz4G/witch_on_a_broomstick_480x480.jpg)

# Strigoaică

### Usage 
Method: **POST**   
Path: **/send**   
Body: 
```
{  
  "templateId": String,
  "data": Object,
  ?"strategies": String | Array<String>
}
``` 

### Strategies
- [x] Messenger
- [x] Gmail (Pending refactoring) 
- [x] Sengrid (Pending refactoring)
- [x] MailDev (Pending refactoring)
- [ ] email
- [ ] GCM (Google Cloud Messaging)
- [ ] APN (Apple Push Notification)

### Gmail
> [more info](https://support.google.com/accounts/answer/6010255)

Env Required:
- Username **gmail.auth.user**
- Password **gmail.auth.pass**

### Sendgrid
> [more info](https://sendgrid.com/)
  
Env Required:
- API Key **sendgrid.apiKey**

### MailDev
> [more info](http://danfarrelly.nyc/MailDev/)
  
Env Required:
- Port **maildev.port**

### Messenger
> [more info](https://developers.facebook.com/docs/messenger-platform/reference/send-api/)
  
Env Required:
- Page Access Token **facebook.pageAccessToken**
