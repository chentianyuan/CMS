<template>
	<div class="star">
		<div id="background" class="wall"></div>
        <div id="midground" class="wall"></div>
        <div id="foreground" class="wall"></div>
	</div>
</template>

<script>
	export default{
		name:'star'
	}
</script>

<style scoped="scoped" lang="scss">
    .star{
    	z-index:-1;
    }
    .wall{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index:-1;
    }
    @mixin set($time,$z:0){
    	//scss混合应用
    	-webkit-animation: STAR-MOVE #{$time} linear infinite;
	    -moz-animation: STAR-MOVE #{$time} linear infinite;
	    -ms-animation: STAR-MOVE #{$time} linear infinite;
	    animation: STAR-MOVE #{$time} linear infinite; 	
    	z-index:$z;
    }
    
    #background {
	    background: black url('http://sandbox.runjs.cn/uploads/rs/374/zx7h4auw/background.png') repeat 5% 0%;
		@include set(300s,-1);
	}
	#midground {
	    background: url('http://sandbox.runjs.cn/uploads/rs/374/zx7h4auw/midground.png') repeat 20% 0%;	   
		@include set(200s,-1);
	}
	/*#foreground {
	    background: url('http://sandbox.runjs.cn/uploads/rs/374/zx7h4auw/foreground.png') repeat 35% 0%;
		@include set(100s,2)
	}*/
    @-webkit-keyframes STAR-MOVE {
		from {
			background-position:0% 0%
		}
		to {
			background-position: 600% 0%
		}
	}
	@keyframes STAR-MOVE {
		from {
			background-position: 0% 0%
		}
		to {
			background-position: 600% 0%
		}
	}
</style>