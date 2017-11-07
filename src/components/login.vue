<template>
	<div id="login">
	  <div class="form">
	      <i class="fa fa-grav fa-3x" ref="fa"></i>
	    <p class="input">
	      <i class="fa fa-user fa-fw"></i>
	      <input type="text"
	             placeholder="用户名"
	             v-model="name"
	             @blur="test(0)">
	    </p>
	    <p class="input">
	      <i class="fa fa-key fa-fw"></i>
	      <input type="password"
	             placeholder="密码"
	             v-model="pwd"
	             @blur="test(1)">
	    </p>
	    <p class="info" :class="info==''?'hid':'in'">{{info}}</p>
	    <p class="sub">
	      <button @click="submit()">提交</button>
	    </p>
	  </div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      name:'',
      pwd:'',
      info:''
    }
  },
  methods:{
  	submit(){
  		//反向代理可以使得简写接口，因为已经代理到3000端口
  		this.$axios.post('/api/login',{name:this.name,pwd:this.pwd}).then(res=>{
  			if(res.data.state == 0){
				this.info = '暂无用户'
  			}else if(res.data.state == 2){				
  				this.info = '密码输入有误，请重新输入'
  			}else{
  				this.info = '登录成功,正在准备跳转...'
  				//这里可以用promise改写的
				//采用这种方式也能获取并操作dom
  				this.$refs.fa.style.webkitTransform = "rotate(360deg)"		
  				setTimeout(()=>{
					this.$store.dispatch('login')
  					this.$router.push({path:'posts'})
  				},1000)
  			}
  		}).catch(err=>{	
  			console.log(err)
  		})
  	},
  	test(value){
  		if(value==0&&this.name==''){
  			this.info = '请输入用户名'
  		}else if(value==1&&this.pwd==''){
  			this.info = '请输入密码'
  		}else{
  			this.info = ''
  		}
  	}
  }
}
</script>

<style scoped lang="scss">
#login{
	height:300px;
	width:400px;
	z-index:1;		
	display:block;
	position:absolute;
	top:50%;
	left:50%;
	//分开写会产生覆盖
	transform:translateX(-200px) translateY(-150px);
}
i,p,button{
	color:#eeeeee;
	transition:all 1s;
}
.form{
	.icon{
		color:#fffff;
	}	
	input{
		background:transparent;
		outline:0;
		border:0;
		border-bottom:1px solid gray;
		padding:10px 25px 10px 0px;

	}
	p{
		margin:40px 0;
		font-size:1rem;
		i{
			transition:all 1s;		
			padding:10px;
		}
		i:hover{
			transform:scale(1.4) translateY(2px);
		}
		input{
			color:#EEEEEE;
		}
		button{
			background:transparent;
			outline:0;
			border:0;
			display:inline-block;
			padding:5px 20px;
			border:1px solid #EEEEEE;
			cursor:pointer;
			letter-spacing:1px;
			font-weight:bold;
			font-family:"estrangelo edessa" !important;
		}
	}
	.info{
		color:#FFFF00;
		transition:all 1s;			
	}
	.hid{
		visibility:hidden;
		transition:all 1s;			
	}
	.in{
		visibility:inherit;
		transition:all 1s;			
	}
	.sub button:hover{
		background:#F4F4F4;
		color:#000000;
		transition:all 1s;
	}
}
</style>
