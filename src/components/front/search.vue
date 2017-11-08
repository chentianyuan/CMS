<template>
	<div class="container" id="contain">
		<headnav active="2"></headnav>
		<div class="mainBox" id="main">
			<section>
				<input v-model="search" type="text" placeholder="支持标题、标签查询" @input="Search"/>
				<span></span>
			</section>
			<ul v-if="whichWant != ''">
				<li v-for="(article,index) in whichWant">
					<a href="javascript:" @click="readArticle(article)">
						<span ref="title">{{article.title}}</span>
						<span>{{article.date}}</span>
					</a>
					
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import headnav from '../common/headnav'
	import axios from 'axios'
	export default {
	  name: 'search',
	  data(){
	  	return{
	  		search:'',
	  		result:[],
	  		articles:[],
	  		whichWant:[]
	  	}
	  },
	  components:{
	  	headnav
	  },
	  mounted(){
		  	this.show("main")	  		
		  	this.$axios.post('/api/getArticles').then(res=>{
		  		this.articles = res.data.msg
		  	}).catch(err=>{  		
	  	})
	  },
	  methods:{
	  	Search(){
	  		var promise = new Promise((resolve,reject)=>{
	  			this.whichWant = []  		
		  		if(this.search != ''){
		  			var reg = new RegExp(this.search,'g')
		  			//object.assign(copy,obj)存在局限性
		  			var copy = JSON.parse(JSON.stringify(this.articles))
		  			copy.map((value,index)=>{
		  				if(value.title.indexOf(this.search) != -1){					
		  					value.title = value.title.replace(reg,"<span class='Highlight' style='color:#00BFFF'>"+this.search+"</span>")
		  					this.whichWant.push(value)
	  					}
	  				})
		  			resolve()
		  		}else{
		  			reject()
		  		}
	  		})
	  		promise
	  		.then(()=>{
	  			return new Promise((resolve,reject)=>{
	  				//vue总是等到函数执行完毕，再渲染视图，所以此处使用promise也无法处理vue的异步操作，只能通过全局的定时器来使获取dom在浏览器渲染之后
	  				setTimeout(()=>{
	  					//vue渲染之后的操作，只有放在定时器中了
	  					if(this.whichWant.length == 0)
	  						return
	  					this.$refs.title.forEach((value,index)=>{
	  						value.innerHTML = this.whichWant[index].title	  						
	  					})
						this.$store.dispatch('setheight',document.querySelector("#contain").offsetHeight)  				  					  				  				 					
	  				},0)
	  				resolve()
	  			})
	  		})
	  		.catch(()=>{
	  			console.log('没有内容')
	  		})
	  			
	  	},
	  	readArticle(article){
	  		this.$router.push({path:'/posts/article',query:article})
	  	}
	  }
	}
</script>

<style scoped="scoped" lang="scss">
$black:#999999;
.container{
	width:100%;
	@mixin borderset($w){
		border:$w solid #fff;		
	}
	.mainBox{
		.Highlight{
			color:#00BFFF;
		}
		text-align:left;
		max-width:800px;
		margin:0 auto;
		overflow:hidden;
		opacity:0;
		transition:all 0.5s;
		}
		section{
			text-align:center;
			input{
				width:90%;
				height:40px;
				outline:0;
				text-align:center;
				background:transparent;
				color:#fff;
				text-shadow:5px 5px 5px rgba(0,0,0,.3);
				font-size:1.4rem;
				@include borderset(2px);
			}
		}
		ul{
			width:90%;
			list-style:none;
			@include borderset(1px);
			margin:5px auto;							
			li{		
				margin:18px;
				padding:2px;		
				a{
					transition:all .3s;			
					box-sizing:border-box;
					color:#fff;
					padding:5px;
					&:hover{
						border-bottom:2px solid $black;
					}
					span{
						cursor:pointer; 
						&:first-child{
							font-size:1.3rem;
						}
						&:last-child(2){
							margin-left:15px;
							color:$black;
						}	
									
					}	
									
				}
			}
			
		}
	}
</style>