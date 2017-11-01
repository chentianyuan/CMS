<template>
	<div class="container">
		<headnav active="0"></headnav>
		<div class="mainBox">			
			<div v-for="(article,index) in articles" class="ass">
				<h2>{{article.title}}</h2>
				<section>{{article.date}}</section>
				<p>{{article.content}}</p>
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
			.ass{
				margin-bottom:10px;
				background:rgba(51,51,51,0.8);			
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
					padding:5px;
				}
				p{
					padding:5px 5px 10px 5px;
					cursor:pointer;
				}
			}
		}
	}
</style>