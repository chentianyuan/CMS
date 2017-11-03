<template>
	<div class="container">
		<headnav active="0"></headnav>
		<div class="mainBox" id="main">			
			<div v-for="(article,index) in articles" class="ass clearfix" @mousemove="skew($event,index)" @mouseleave="clearRot(index)">
				<h2>{{article.title}}</h2>
				<section>{{article.date}}</section>
				<p>{{article.content}}</p>
				<a href="javascript:" @click="readmore">阅读全部</a>
			</div>
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
	  		articles:[]
	  	}
	  },
	  components:{
	  	headnav
	  },
	  mounted(){
	  	this.$axios.post('/api/getArticles').then(res=>{
	  		this.articles = res.data.msg
	  	}).catch(err=>{
	  		alert('获取文章失败')
	  	})
	  },
	  methods:{
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
	  		var topDis = dom.getBoundingClientRect().top
	  		
	  		var Xskew = e.pageX - leftDis + 10  +1  //加1防止为0时翻转出问题
	  		var Yskew = e.pageY - topDis
	  		
	  		//console.log(dom.getBoundingClientRect())
	  		//console.log(Xskew,Yskew)
	  		if(Yskew >= Hdom/2){	
	  			//6.5设为x轴方向倾斜的最大参数，从6.5到-6.5
	  			var Xdeg = -(4/(Hdom/2))*(Yskew-(Hdom/2))
	  		}else{
	  			//此处有转义错误，先用6.5除2好了
	  			var Xdeg = (4/(Hdom/2))*((Hdom/2)-Yskew)
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
	  	}
	  }
	}
</script>

<style scoped="scoped" lang="scss">
	$black:#999999;
	.container{
		width:100;
		.mainBox{
			max-width:800px;
			margin:0 auto;
			overflow:hidden;
			perspective:800px;
			transition: 1s transform;
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
					color:$black;
					text-decoration:underline;
					transform:scale(1.1);
				}
				section{
					color:$black;
					padding:5px;
				}
				p{
					text-align:left;
					padding:10px 120px 10px;
					cursor:pointer;
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
	}
</style>