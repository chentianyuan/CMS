const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const api = require('./api')
const app = express()

//端口设为3000端口
app.set('port', (process.env.port || 3000))
//解析请求参数，express默认中间件
app.use(bodyParser.json())
//解析请求参数，express默认中间件
app.use(bodyParser.urlencoded({extended: false}))


//CORS跨域配置
app.all('*',(req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		if (req.method == 'OPTIONS'){
			res.sendStatus(200)
		    //让options请求快速返回
		}
		else {
		    next();
		}
});

//引入所有的接口处理程序
app.use(api)

//app.use('/',(req,res)=>{
//	res.send('这段显示在服务器开启后的页面3000端口')
//})
//app.post('/api/test',(req,res)=>{
//    res.send('请求已接收')
//})

app.listen(app.get('port'),()=>{
	console.log('服务器开启')
})
