<template>
	<div class="container" id="contain">
		<headnav active="3"></headnav>
		<div class="mainBox" id="main">
			<section>
				<p>前端萌新</p>
				<p>即将完结学生时代，开始搬砖生涯</p>
				<p>need offer ...</p>
				<p>Encounter like people, like the rest of the world, drifting across the sea, finally see the land.</p>
				<p>//why did i use English ?</p>
				<p>//it's font-Family looks awesome</p>
				<ul>
					<li><a href="javascript:"><span class="fa fa-whatsapp"></span></a></li>
					<li><a href="javascript:"><span class="fa fa-wechat"></span></a></li>
					<li><a href="javascript:"><span class="fa fa-flickr"></span></a></li>
					<li><a href="javascript:"><span class="fa fa-qq"></span></a></li>
				</ul>
			</section>
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
	  	}
	  },
	  mounted(){
	  	setTimeout(()=>{
	  		this.$store.dispatch('setheight',document.querySelector("#contain").offsetHeight) 
		  	this.show("main")
	  	},0)
	  },
	  components:{
	  	headnav
	  }
	}
</script>

<style scoped="scoped" lang="scss">
.container{
	.mainBox{
		text-align:left;
		max-width:800px;
		margin:0 auto;
		overflow:hidden;
		opacity:0;
		transition:all 0.5s;
		section{
			font-size:1.4rem;
			border-radius:1px solid #fff;
			border-radius:5px;
			padding:20px;
			p{
				color:#fff;
				padding:20px;
				line-height:28px;
			}	
			ul{
				width:50%;
				display:flex;
				margin:20px auto;
				list-style:none;
				justify-content:space-around;
				li{
					a{	
						color:#fff;
					}
				}
			}
		}
	}	
}
</style>