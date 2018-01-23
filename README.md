![Strigoaica](https://image.ibb.co/h0Uz4G/witch_on_a_broomstick_480x480.jpg)

# Strigoaică

### Usage 
Method: **POST**   
Path: **/send**   
Body: **{ "templateId": "x", "data": { } }** 

### Strategies
- [x] Gmail
- [x] Sengrid
- [x] MailDev (email previewing)
- [ ] email
- [ ] Messenger
- [ ] GCM (Google Cloud Messaging)
- [ ] APN (Apple Push Notification)

### Gmail
> [more info](https://support.google.com/accounts/answer/6010255)

Env Required:
- Username **STRIGOAICA_GMAIL_USER**
- Password **STRIGOAICA_GMAIL_PASS**

### Sendgrid
> [more info](https://sendgrid.com/)
  
Env Required:
- apiKey **STRIGOAICA_SENDGRID_KEY**

### MailDev
> [more info](http://danfarrelly.nyc/MailDev/)
  
Env Required:
- port **STRIGOAICA_MAILDEV_PORT**