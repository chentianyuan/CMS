const express = require('express')
const router = express.Router()
const db = require('./db')

//编写前端接口尽量使用post方法
router.post('/api/login',(req,res)=>{
	//console.log(req.body)
	var {name,pwd} = req.body
	//findOne为单查
	//find会查出集合里面所有的文档

	console.log(req.body)
	//查出users表中名为name的人的pwd的值
	db.users.findOne({name},"pwd",(err,doc)=>{
		if(err){
			console.log(err)
			return
		}
		if(!doc){
			res.send({state:0,msg:"账号不存在"})
			return
		}else if(doc.pwd != pwd){
			res.send({state:2,msg:'密码输入错误'})
			return
		}else if(doc.pwd == pwd){
			res.send({state:1,msg:'登录成功'})
			return
		}else{
			res.send({state:3,msg:"未知错误"})
			return
		}
	})

//  数据库再出错便用思思酱测试
//	db.User.create({"name":"fy","pwd":"789"},(err,doc)=>{
//		if(err){
//			console.log(err)
//			return
//		}
//		console.log('插入成功')
//	})
	
//console.log(db.User)
	//res.sendStatus(200)
	//console.log('成功')
})

router.post('/api/getArticles',(req,res)=>{
	db.posts.find({},(err,doc)=>{
		if(err){
			console.log(err)
			return
		}
		if(doc){			
			res.send({state:1,msg:doc})
		}else{
			res.send({state:0})
		}

	})

//每次想要使用一个表，必须新建一个表
//	db.posts.create({"content":"测试文章","date":"2017/10/28 10:13:1"},(err,doc)=>{
//		if(err){
//			console.log(err)
//		}else{
//			console.log(doc)
//		}
//	})
})

module.exports = router