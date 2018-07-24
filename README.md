<p align="center">
	<img width="200px" src="https://image.ibb.co/h0Uz4G/witch_on_a_broomstick_480x480.jpg"/>
</p>

# Strigoaică
[![GitHub license](https://img.shields.io/github/license/stefanoschrs/strigoaica.svg)](https://github.com/stefanoschrs/strigoaica/blob/master/LICENSE.md) [![Build Status](https://travis-ci.org/stefanoschrs/strigoaica.svg?branch=master)](https://travis-ci.org/stefanoschrs/strigoaica) [![GitHub release](https://img.shields.io/github/release/stefanoschrs/strigoaica.svg)](https://github.com/stefanoschrs/strigoaica/releases)

**Project agnostic service for template based notification delivery**
> *Full documentation can be found at the Strigoaică's [Wiki Page](https://github.com/stefanoschrs/strigoaica/wiki)*

#### Quick Install
```
## Clone repo
git clone git@github.com:stefanoschrs/strigoaica.git && cd $(basename $_ .git)
## Install node modules
npm i
## Copy configuration
cp strigoaica.example.yml strigoaica.yml
## Add a strategy
npm i strigoaica-facebook
## Run
node server.js
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
