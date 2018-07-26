<p align="center">
	<img width="200px" src="https://image.ibb.co/h0Uz4G/witch_on_a_broomstick_480x480.jpg"/>
</p>

# Strigoaică
[![GitHub license](https://img.shields.io/github/license/stefanoschrs/strigoaica.svg)](https://github.com/stefanoschrs/strigoaica/blob/master/LICENSE.md) [![Build Status](https://travis-ci.org/stefanoschrs/strigoaica.svg?branch=master)](https://travis-ci.org/stefanoschrs/strigoaica) [![GitHub release](https://img.shields.io/github/release/stefanoschrs/strigoaica.svg)](https://github.com/stefanoschrs/strigoaica/releases)

**Project agnostic service for template based notification delivery**
> *Full documentation can be found at the Strigoaică's [Wiki Page](https://github.com/stefanoschrs/strigoaica/wiki)*

#### Quick Install
```
## Download and extract latest release
wget $(curl -s https://api.github.com/repos/stefanoschrs/strigoaica/releases/latest | grep -oE "https.*strigoaica\.tgz")
tar -zxvf strigoaica.tgz
cd dist
## Install node modules
npm i
## Get sample configuration (optional)
wget -O strigoaica.yml https://raw.githubusercontent.com/stefanoschrs/strigoaica/master/strigoaica.example.yml
## Add a sample strategy (optional)
npm i strigoaica-facebook
mkdir templates/facebook
wget -O templates/facebook/example.txt https://raw.githubusercontent.com/stefanoschrs/strigoaica/master/templates/facebook/example.txt
## Start server
node server.js
## Run the example command (optional)
./node_modules/strigoaica-facebook/scripts/example.sh
```

#### Available strategies
- [Facebook](https://github.com/stefanoschrs/strigoaica-facebook)
- -Gmail-

#### General Usage
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
