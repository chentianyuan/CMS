<template>
  <div id="app">
  	<star></star>
    <router-view/>
  </div>
</template>

<script>
	import star from './components/star'
	export default {
	  name: 'app',
	  components:{
	  	star
	  },
	  watch:{
	  	//route只能使用watch监听，因为$route作为已存在的对象，使用computed会出现意想不到的错误
	  	'$route':'update'
	  },
	 	computed:{
	  	//从全局数据中获取到当前登录者的信息权限
			login:function(){
				return this.$store.state.whertherlogin
			}			
	  },
	  methods:{
	  	update(){
	  		setTimeout(()=>{	
	  			if(!this.login && this.$route.path != '/'){
	  				alert('请登陆后查看')
		  			this.$router.push({path:'/'})
		  		}		
  		},100)
	  	}
	  }
	}
</script>

<style>
html{
	font-size:14px;
}
*{
	margin:0;
	padding:0;
}
#app {
  font-family: 'Comic Sans MS', 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif,Font-Awesome !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow:hidden;
  color:#fff;
}
a{
	cursor:pointer;
}
.clearfix:after{
      content:'';
      height:'';
      display:block;
      visibility:hidden;
      clear:both;
}
.clearfix{
      zoom:1;
}
</style>
