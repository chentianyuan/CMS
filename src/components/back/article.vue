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
				<footer>
					<a @click="readArticle(prearticle)"><span :class="prearticle.content?'fa fa-chevron-left':''"></span>{{prearticle.title}}</a>
					<a @click="readArticle(nextarticle)">{{nextarticle.title}}<span :class="nextarticle.content?'fa fa-chevron-right':''"></span></a>
				</footer>
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
				article:{},
				prearticle:{
					title:'没有上一篇了'
				},
				nextarticle:{
					title:'没有下一篇了'
				}
			}
		},
		components:{
			headnav
		},
		watch:{
	  		'$route':'updateArticle'
		},
		mounted(){
			this.updateArticle()
		},
		methods:{
			updateArticle(){
				this.acount = this.$route.query.account
			//console.log(this.$route.query.account)
			this.$axios.post('/api/getoneArticle',{acount:this.acount}).then((res)=>{
				this.article = res.data.msg[0]
				setTimeout(()=>{
					this.$store.dispatch('setheight',document.querySelector("#contain").offsetHeight) 
		  			this.show("main")	  		
		  		},0)
			}).catch(err=>{
				console.log(err)
			})
			
			//上一篇
			if(parseInt(this.acount)-1 >= 0){
				this.$axios.post('/api/getoneArticle',{acount:parseInt(this.acount)-1+''}).then((res)=>{
					this.prearticle = res.data.msg[0]
				}).catch(err=>{
					console.log(err)
				})
			}else{
					this.prearticle = {"title":"没有上一篇了"}			
			}
			
			//下一篇
			this.$axios.post('/api/getoneArticle',{acount:parseInt(this.acount)+1+''}).then((res)=>{
				if(res.data.msg[0]){
					this.nextarticle = res.data.msg[0]					
				}else{
					this.nextarticle = {"title":"没有下一篇了"}
				}
			}).catch(err=>{
				console.log(err)
			})
			},
			readArticle(article){
				if(article._id){
		  			document.getElementById("main").style.opacity = 0					
		  			setTimeout(()=>{this.$router.push({path:'/posts/article',query:article})},200)			
				}
		  	}
		}
	}
</script>

<style lang="scss" scoped="scoped">
 @import '../../assets/css/post.scss';
.ass{
	min-height:400px;
	p{
		padding:20px 20px 54px 20px !important;
		font-size:1.2rem;
		line-height:24px;
	}
	footer{
		z-index:1000;
		bottom:0;
		position:absolute;
		width:100%;
		display:flex;
		justify-content:space-between;
		a{
			border:0 !important;
			span{
				&:first-child{
					margin-right:10px;
				}
				&:last-child{
					margin-left:10px;
				}
				
			}
		} 
	}
}
</style>