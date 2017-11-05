<template>
	<div class="container" id="contain">
		<headnav active="1"></headnav>
		<div class="mainBox">
			<header>
				<h1>All Tags</h1>
				<ul>
					<li v-for="(tag,index) in tags">{{tag.tagName}}</li>
				</ul>
			</header>
			<div class="eachTag" v-for="(tag,index) in tags">
				<h3>#{{tag.tagName}}</h3>
				<ul class="tag-article-list">
					<li v-for="(article,index) in tag.tagList">
						{{article.title}}
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
	  		weixin:[]
	  	}
	  },
	  components:{
	  	headnav
	  },
	  mounted(){
	  	//promise的功能是可以将复杂的异步处理轻松地进行模式化
	  	var P1 = new Promise((resolve,reject)=>{
			this.$axios.post('/api/getArticles').then(res=>{
		  		this.mainlist = res.data.msg
		  		//console.log(this.mainlist)
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
.container{
	width:100%;
	.mainBox{
		text-align:left;
		max-width:800px;
		margin:0 auto;
		overflow:hidden;
		header ul{
			margin-top:20px;
			li{
			    display: inline-block;
				margin: 10px 20px 10px 0;
				transition: all .3s;
			}
		}
		.eachTag{
			margin-top:50px;
			h3{
				font-size:1.4rem;
			};
		}
	}
}
</style>