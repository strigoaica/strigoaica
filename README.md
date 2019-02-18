<p align="center">
	<img width="200px" src="https://image.ibb.co/h0Uz4G/witch_on_a_broomstick_480x480.jpg"/>
</p>


# Strigoaică
[![GitHub license](https://img.shields.io/github/license/strigoaica/strigoaica.svg)](https://github.com/strigoaica/strigoaica/blob/master/LICENSE.md) [![Build Status](https://travis-ci.org/strigoaica/strigoaica.svg?branch=master)](https://travis-ci.org/strigoaica/strigoaica) [![GitHub release](https://img.shields.io/github/release/strigoaica/strigoaica.svg)](https://github.com/strigoaica/strigoaica/releases)


**Project agnostic service for template based notification delivery**
> *Full documentation can be found at the Strigoaică's [Wiki Page](https://github.com/strigoaica/strigoaica/wiki)*


#### Quick Install
```
### Download and extract latest release
wget $(curl -s https://api.github.com/repos/strigoaica/strigoaica/releases/latest | grep -oE "https.*strigoaica\.tgz")
tar -zxvf strigoaica.tgz
cd dist

### Install node modules
npm i

### Start server
node server.js
```
**(optional)**
```
### Get sample configuration 
wget -O strigoaica.yml https://raw.githubusercontent.com/strigoaica/strigoaica/master/strigoaica.example.yml

### Add sample strategies
npm i strigoaica-facebook strigoaica-gmail

### Download sample template
mkdir templates/facebook
wget -O templates/facebook/example.txt https://raw.githubusercontent.com/strigoaica/strigoaica/master/templates/facebook/example.txt

### Run the example command
./node_modules/strigoaica-facebook/scripts/example.sh
```

#### Available strategies
- [Facebook](https://github.com/strigoaica/strigoaica-facebook)
- [Gmail](https://github.com/strigoaica/strigoaica-gmail)
- [Amazon Simple Email Service (template)](https://github.com/strigoaica/strigoaica-ses-template)
- [SendGrid](https://github.com/strigoaica/strigoaica-sendgrid)

#### Under construction strategies
- [Firebase Cloud Messaging](https://github.com/strigoaica/strigoaica-fcm)

#### General Usage
Method: **POST**   
Path: **/send**   
Body: 
```
{  
  "templateId": String,  
  "data": Object,  
  "strategies": String | Array<String>  
}  
``` 
