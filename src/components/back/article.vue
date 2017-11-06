<template>
	<div class="container" id="contain">
		<headnav active="0"></headnav>
		<!--
        	作者：651388057@qq.com
        	时间：2017-11-06
        	描述：这边代码写的有点蠢，本来在psots.vue中使用动态路由就可以减少代码量的，懒癌晚期不改了，直接copy了= =
        -->
		<div class="mainBox" id="main">			
			<article class="ass clearfix">
				<h2>{{article.title}}</h2>
				<section>{{article.date}}</section>
				<p>{{article.content}}</p>
			</article>
		</div>
	</div>
</template>

<script>
	import headnav from '../common/headnav'
	export default{
		name:'article',
		data(){
			return{
				articleId:'',
				article:{}
			}
		},
		components:{
			headnav
		},
		mounted(){
			this.articleId = this.$route.query._id
			//console.log(this.$route.query._id)
			this.$axios.post('/api/getoneArticle',{queryid:this.articleId}).then((res)=>{
				this.article = res.data.msg[0]
				setTimeout(()=>{
					this.$store.dispatch('setheight',document.querySelector("#contain").offsetHeight) 
		  			document.getElementById("main").style.opacity = 1
		  		},0)
				console.log(this.article)
			}).catch(err=>{
				console.log(err)
			})
		}
	}
</script>

<style lang="scss" scoped="scoped">
 @import '../../assets/css/post.scss';
.ass{
	p{
		padding:20px !important;
		font-size:1.2rem;
		line-height:24px;
	}
}
</style>