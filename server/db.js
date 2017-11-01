const mongoose = require('mongoose')
//mongoose.Promise = global.Promise
const Schema = mongoose.Schema

//登录验证数据库模型
const userSchema = new Schema({
  name: String,
  pwd: String
})

const articleSchema = new Schema({
  title:String,
  content:String,
  date:String
})

//连接blog数据库
mongoose.connect('mongodb://127.0.0.1:27017/blog',{
  useMongoClient: true
})

const db = mongoose.connection

db.on('error', function () {
	console.log('数据库连接出错')
})
//
db.once('open', function () {
	console.log('数据库已连接')
})

const Models = {
	//通过表名取出表操作模型
	users:mongoose.model('users',userSchema),
	posts:mongoose.model('post',articleSchema)
}


module.exports = Models