<template>
	<div class="navWrap">
		<a href="javascript:" class="mine"><span class="fa fa-grav"></span>###</a>
		<ul>
			<li :class="active == 0 ? 'active':''"><router-link :to="{path:'./posts'}" class="nav">文章</router-link></li>
			<li :class="active == 1 ? 'active':''"><router-link :to="{path:'./tag'}" class="nav">标签</router-link></li>
			<li :class="active == 2 ? 'active':''"><router-link :to="{path:'./search'}" class="nav">搜索</router-link></li>
			<li :class="active == 3 ? 'active':''"><router-link :to="{path:'./about'}" class="nav">关于</router-link></li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:'headnav',
		props:['active'],
		data(){
			return{
				title:1
			}
		},
		mounted(){
		}
	}
</script>

<style scoped="scoped" lang="scss">
$w : #fff;
.navWrap{
	display:flex;
	width:100%;
	.mine{
	color:$w;
	cursor:pointer;
	flex-basis:300px;
	font-size:1.8rem;
	height:50px;
	line-height:50px;
	padding:25px;
		span{
			font-size:2.2rem;
			margin-right:20px;
		}
	}
	ul{
		height:100px;
		display:flex;
		width:100%;
		justify-content:space-around;
		li{
			list-style:none;
			font-size:1.8rem;			
			.nav{
				line-height:100px;
				border:0;
				text-decoration:none;
				color:#999999;
			}
			.nav:hover{
				line-height:90px;
				transition:all 0.3s;
				padding-bottom:4px;
				border-bottom:4px solid #fff;
				color:$w;
			}
		}
	}
	.active a{
		line-height:90px !important;
		padding-bottom:4px !important;
		border-bottom:4px solid $w !important;
		color:$w !important;
	}
	.router-link-active{
	}
}

</style>