<template>
	<div class="wrap" :class="scroll?'show':''" @click="back">
		<span class="fa fa-arrow-up fa-3x"></span>
	</div>
</template>

<script>
	export default{
		name:'backtoTop',
		data(){
			return{
				scroll:false
			}
		},
		mounted(){
			//setInterval(()=>{console.log(this.scrolltop)},100)
			document.addEventListener('scroll',()=>{
				//console.log(document.documentElement.scrollTop || document.body.scrollTop)
				var top = document.documentElement.scrollTop || document.body.scrollTop
				if(top > 350){
					this.scroll = true	
				}else{
					this.scroll = false
				}
			},false)
			//true是捕获，false是冒泡，一般都是用false
		},
		methods:{
			back(){
				//console.log("啊啊啊")
				var speed = 50
				var loca = document.documentElement.scrollTop || document.body.scrollTop
				var timer = null
				timer = setInterval(()=>{
					loca -= speed
					if(speed > 15){
						speed = speed - 2	
					}
					if(loca < 0){						
						window.scrollTo(0,0)
						clearInterval(timer)
					}else{
						window.scrollTo(0,loca)	
					}
				},10)
			}
		}
//		computed:{
//			scrolltop:function(){
//				console.log(document.documentElement.scrollTop || document.body.scrollTop)
//				return document.documentElement.scrollTop || document.body.scrollTop
//			}
//		}
	}
</script>

<style scoped="scoped" lang="scss">
	.wrap{
		cursor:pointer;
		box-sizing:border-box;
		width:50px;
		height:50px;
		background:#000000;
		position:fixed;
		right:50px;
		bottom:50px;
		opacity:0;
		transition:all 1s;	
	}
	.show{
		opacity:.5;
		&:hover{
			opacity:1;	
		}
	}
</style>