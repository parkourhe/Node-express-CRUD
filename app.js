var express =require('express')

var router = require('./router.js')


var bodyParser = require('body-parser')

var fs =require('fs')

var app  = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.engine('html',require('express-art-template'))

app.use('/node_modules/',express.static('./node_modules/'))

app.use('/public/',express.static('./public/'))


// 挂载路由
app.use(router)


app.listen('3000',function(){
	console.log('running');
})