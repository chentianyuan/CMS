<template>
	<div class="container" id="contain">
		<headnav active="0"></headnav>
		<div class="mainBox" id="main">			
			<article v-for="(article,index) in articleshow" class="ass clearfix" @mousemove="skew($event,index)" @mouseleave="clearRot(index)">
				<h2>{{article.title}}</h2>
				<section>{{article.date}}</section>
				<p>{{article.content}}</p>
				<a href="javascript:" @click="readmore">阅读全部</a>
			</article>
		</div>
		<div class="page">
			<div class="page-item" v-for="index in pageNum" :class="cur==index?'active':''" @click="other(index)">{{index}}</div>
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
		  		this.pageNum = Math.ceil(res.data.msg.length/this.everyPagenum) //向上取整
		  		document.getElementById("main").style.opacity = 1
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
	  	readmore(){
	  		
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
	  		this.cur = index
	  	}
	  }
	}
</script>

<style scoped="scoped" lang="scss">
	$black:#999999;
	.container{
		width:100%;
		.mainBox{
			max-width:800px;
			margin:0 auto;
			overflow:hidden;
			perspective:800px;
			transition:all 0.5s;
			opacity:0;
			.ass{
				margin-bottom:10px;
				background:rgba(51,51,51,0.8);							
				/*三维效果设置，父元素设置景深perspective，容器设置transform-style为3d*/
				transform-style: preserve-3d;
				transition:all 0.2s;   
				box-shadow: 0 5px 5px rgba(255,255,255,0.1);
				border-radius:15px;
				h2{
					font-size:1.5rem;
					font-weight:500;
					padding:10px;
					letter-spacing:2px;	
					cursor:pointer;
					transition:all 0.2s;
				}
				h2:hover{
					//color:$black;
					//text-decoration:underline;
					transform:scale(1.1);
					letter-spacing:4px;
				}
				section{
					color:$black;
					padding:5px;
				}
				p{
					text-align:left;
					padding:10px 120px 10px;
					cursor:pointer;
					letter-spacing:1px;
					
				}
				a{
					float:right;
					color:$black;
					padding:10px;
					margin:10px;
					text-decoration:none;
					border-bottom:1px solid $black; 
					&:hover{
						color:#fff;
						background:#000000;
						border-color:#000000;
					}
				}
			}
		}
		//分页
		.page{
			z-index:20;
			position:absolute;
			//暂时不用border-radius: 3px 3px 0 0;
			width:40px;
			top:50%;
			right:50px;
			box-sizing:border-box;
			color:$black;
			background: rgba(51, 51, 51, 0.8);
			.page-item{
				cursor:pointer;
				height:40px;
				line-height:40px;			
				padding:5px 0;	
				transition:all 1s;
			}
			.active{
				color:#fff;
				transform:scale(1.4);
			}
		}
	}
</style>