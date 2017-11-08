<template>
	<div class="container" id="contain">
		<headnav active="1"></headnav>
		<div class="mainBox" id="main">
			<header>
				<h1>All Tags</h1>
				<ul>
					<li v-for="(tag,index) in tags" @click="goAnchor(tag.tagName,index)">{{tag.tagName}}</li>
				</ul>
			</header>
			<div class="eachTag" v-for="(tag,index) in tags">
				<h3 :id="tag.tagName" :class="bounce==index?'bounce animated':''"># {{tag.tagName}}</h3>
				<ul class="tag-article-list">
					<li v-for="(article,index) in tag.tagList">
						<a href="javascript:" @click="readArticle(article)">
							{{article.title}}
						<span>{{article.date}}</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import headnav from '../common/headnav'
	import axios from 'axios'
	export default {
	  name: 'tag',
	  data(){
	  	return{
	  		//可优化，应从数据拿到数据后，生成含有的标签
	  		tags:[
	  		{tagName:'Vue',tagList:[]},
	  		{tagName:'javascript',tagList:[]},
	  		{tagName:'express',tagList:[]},
	  		{tagName:'CSS',tagList:[]},
	  		{tagName:'sass',tagList:[]},
	  		{tagName:'gulp',tagList:[]},
	  		{tagName:'webpack',tagList:[]},
	  		{tagName:'socket.io',tagList:[]},
	  		{tagName:'微信小程序',tagList:[]}
	  		],
	  		mainlist:[],
	  		vue:[],
	  		js:[],
	  		express:[],
	  		css:[],
	  		sass:[],
	  		gulp:[],
	  		webpack:[],
	  		socket:[],
	  		weixin:[],
	  		bounce:-1
	  	}
	  },
	  components:{
	  	headnav
	  },
	  methods:{
	  	goAnchor(id,index){
	  		console.log(index)
	  		var timer = null
	  		var curTop = 0
	  		var anchor = document.getElementById(id)
	  		//console.log(anchor.offsetTop)
       		//document.body.scrollTop = anchor.offsetTop
			timer = setInterval(()=>{
				curTop += 8
				if(curTop < anchor.offsetTop-30){
	  				window.scrollTo(0,curTop)					
				}else{
					window.scrollTo(0,anchor.offsetTop-30)
					clearInterval(timer)
					this.bounce = index
					setTimeout(()=>{
						this.bounce = -1
					},1000)
				}
			},5)

	  	},
	  	readArticle(article){
	  		this.$router.push({path:'/posts/article',query:article})
	  	}
	  },
	  mounted(){
	  	//promise的功能是可以将复杂的异步处理轻松地进行模式化
	  	var P1 = new Promise((resolve,reject)=>{
			this.$axios.post('/api/getArticles').then(res=>{
		  		this.mainlist = res.data.msg
		  		//console.log(this.mainlist)
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
	  			this.mainlist.forEach((value)=>{
	  				//console.log(value.tag)
	  				switch(value.tag){
	  					case "Vue":
	  						this.tags[0].tagList.push(value);
	  						break;
	  					case "javascript":
	  						this.tags[1].tagList.push(value);
	  						break;
	  					case "express":
	  						this.tags[2].tagList.push(value);
	  						break;
	  					case "css":
	  						this.tags[3].tagList.push(value);
	  						break;
	  					case "sass":
	  						this.tags[4].tagList.push(value);
	  						break;
	  					case "gulp":
	  						this.tags[5].tagList.push(value);
	  						break;
	  					case "webpack":
	  						this.tags[6].tagList.push(value);
	  						break;
	  					case "socket.io":
	  						this.tags[7].tagList.push(value);
	  						break;
	  					case "微信小程序":
	  						this.tags[8].tagList.push(value);
	  						break;
	  					default:
	  						console.log('不存在');
	  						break;
	  				}
	  			})
	  			resolve()
	  		})
	  	}).then(()=>{
	  		return new Promise((resolve,reject)=>{
	  			//这种不是异步的操作可以不用放在promise中
				this.$store.dispatch('setheight',document.querySelector("#contain").offsetHeight)  				  			
	  			resolve()
	  		})
	  	})
	  	.catch(err=>{
	  		console.log(err)
	  	})
	  }
	}
</script>

<style scoped="scoped" lang="scss">
$black:#999999;
.container{
	width:100%;
	.mainBox{
		text-align:left;
		max-width:800px;
		margin:0 auto;
		overflow:hidden;
		opacity:0;
		transition:all 0.5s;
		header ul{
			margin-top:20px;
			li{
				font-size:1.5rem;
			    display: inline-block;
				margin: 10px 20px 10px 0;
				cursor:pointer;
				transition: all .3s;
			&:hover{
				transform:scale(1.1);
			}
			}
		}
		.eachTag{
			margin-top:50px;
			h3{
				font-size:1.4rem;
				transition:all 1s;
			};
			
			ul{
				margin-left:20px;
				list-style:none;
				li{
					margin:20px 0;
					a{
						transition: all .3s;					
						font-size:1.1rem;
						border-bottom: 0 none;
						color:#fff;
						text-decoration:none; 
						&:hover{
							border-bottom:2px solid $black;							
						}
					}
					span{
						font-size:1rem;
						color:$black;
					}
				}
			}
		}
	}
}
</style>