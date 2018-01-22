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
Env Required:
- Username **STRIGOAICA_GMAIL_USER**
- Password **STRIGOAICA_GMAIL_PASS**

### Sendgrid
Env Required:
- apiKey **STRIGOAICA_SENDGRID_KEY**
