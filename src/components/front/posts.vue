<template>
	<div class="container" id="contain">
		<!--<router-view></router-view>-->
		<headnav active="0"></headnav>
		<div class="mainBox" id="main">			
			<article v-for="(article,index) in articleshow" class="ass clearfix" @mousemove="skew($event,index)" @mouseleave="clearRot(index)">
				<h2 @click="readArticle(article)">{{article.title}}</h2>
				<section>{{article.date}}</section>
				<p>{{article.content}}</p>
				<a href="javascript:" @click="readArticle(article)">阅读全部</a>
			</article>
		</div>
		<div class="page">
			<div class="page-item  fa fa-chevron-left" @click="other(cur-1)"></div>
			<div class="page-item" v-for="index in pageNum" :class="cur==index?'active':''" @click="other(index)">{{index}}</div>
			<div class="page-item  fa fa-chevron-right" @click="other(cur+1)"></div>
		</div>
	</div>
</template>

<script>
	import headnav from '../common/headnav'
	import axios from 'axios'
	export default {
	  name: 'posts',
	  data(){
	  	return{
	  		articles:[],
	  		articleshow:[],
	  		pageNum:3,
	  		everyPagenum:5,
	  		cur:1
	  	}
	  },
	  watch:{
	  	articles:'changearticle',
	  	cur:'changearticle'
	  },
	  components:{
	  	headnav
	  },
	  mounted(){
		//promise的功能是可以将复杂的异步处理轻松地进行模式化
	  	var P1 = new Promise((resolve,reject)=>{
			this.$axios.post('/api/getArticles').then(res=>{
		  		this.articles = res.data.msg
		  		this.pageNum = Math.ceil(this.articles.length/this.everyPagenum) //向上取整
		  		//此处可以添加到vue全局函数中，在main.js中注册vue.prototype.show = id=>{document.getELementById(id).style.opacity = 1}
		  		//document.getElementById("main").style.opacity = 1
		  		this.show("main")
		  		resolve()
		  }).catch(err=>{
		  		reject(err)
		  	})
  		})
	  	
		//起调的肯定是一个promise对象，.then操作符中传入一个函数,若是异步函数，可以继续返回一个promise对象，作为下一个起调，如果是同步操作，则直接写函数体即可 		
	  	P1
	  	.then(()=>{
	  		return new Promise((resolve,reject)=>{
	  			//这种不是异步的操作可以不用放在promise中
				this.$store.dispatch('setheight',document.querySelector("#contain").offsetHeight)  				  			
	  			resolve()
	  		})
	  	})
	  	.catch(err=>{
	  		console.log(err)
	  	})
	  	
	  },
	  methods:{
	  	changearticle(){
	  		var arr = []
	  		this.articleshow = []
	  		for(var i = (this.cur-1)*this.everyPagenum ; i < this.everyPagenum*this.cur && this.articles[i] ; i++){
	  			arr.push(this.articles[i])
	  		}
	  		this.articleshow = arr
	  		setTimeout(()=>{
				this.$store.dispatch('setheight',document.querySelector("#contain").offsetHeight) 
	  		},0)

	  	},
	  	skew(e,index){
	  		//获取文章dom元素
	  		var dom = document.querySelector('#main').childNodes[index]
	  		//获取元素自身高度和宽度
	  		var Wdom = dom.offsetWidth
	  		var Hdom = dom.offsetHeight
	  		
	  		//dom.getBoundingClientRect()可以直接获取到元素的与浏览器的相对位置
	  		var leftDis = dom.getBoundingClientRect().left
	  		var topDis = dom.getBoundingClientRect().top + 20
	  		
	  		//注意，e.pageY始终获取的是鼠标位置与原始窗口顶部的位置，也就是说，无论滚动条滚动多少，在同一个地方的e.pageY不变，但是dom.getBoundingClientRect().top在变，所以计算相对高度时，要减去滚动的高度
	  		var Xskew = e.pageX - leftDis + 10  //加10防止为0时翻转出问题
	  		var Yskew = e.pageY - document.documentElement.scrollTop - topDis
	  		
	  		//console.log(e.pageY)
	  		//console.log(Xskew,Yskew)
	  		if(Yskew >= Hdom/2){	
	  			//6.5设为x轴方向倾斜的最大参数，从6.5到-6.5
	  			var Xdeg = -(4/(Hdom/2))*(Yskew-(Hdom/2))
	  		}else{
	  			//此处有转义错误，先用4除2好了

	  			var Xdeg = (4/(Hdom/2))*((Hdom/2)-Yskew)
	  			//console.log('Xdeg为'+Xdeg)
	  			//var Ydeg = (3.25/Wdom)*(Xskew - (Wdom/2))
	  		}
	  		//高度195的一半,和宽度不一样，这里设为固定值
	  		if(Xskew < Wdom/2){
	  			var Ydeg = -(6.5/(Wdom/2))*(Wdom/2-Xskew)
	  		}else{
	  			var Ydeg = (6.5/(Wdom/2))*(Xskew-Wdom/2)
	  		}
	  		//console.log(Xdeg,Ydeg)
	  		dom.style.webkitTransform = "rotateX("+Xdeg+"deg)"+"rotateY("+Ydeg+"deg)"
	  	},
	  	clearRot(index){	  		
	  		document.querySelector('#main').childNodes[index].style.webkitTransform = "rotate(0deg)"
	  	},
	  	other(index){
	  		if(index > Math.ceil(this.articles.length/this.everyPagenum)){
	  			alert('已经是最后一页')
	  			return
	  		}else if(index < 1){
	  			alert('已经是第一页')
	  			return
	  		}else{	
	  			this.cur = index
	  		}
	  	},
	  	readArticle(article){
	  		this.$router.push({path:'/posts/article',query:article})
	  	}
	  }
	}
</script>

<style scoped="scoped" lang="scss">
 @import '../../assets/css/post.scss';
 .ass p{
 	box-sizing:border-box;
 	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp:4;
	overflow: hidden;
	text-overflow:ellipsis;
	max-height:67px;
 }
 @media all and (max-width: 1200px) {
    p{
    	padding:10px 20px 10px !important;
    }
}
</style>