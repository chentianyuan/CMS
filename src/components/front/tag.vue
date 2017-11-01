<template>
	<div class="container">
		<headnav active="1"></headnav>
	</div>
</template>

<script>
	import headnav from '../common/headnav'
	import axios from 'axios'
	export default {
	  name: 'tag',
	  data(){
	  	return{
	  	}
	  },
	  components:{
	  	headnav
	  }
	}
</script>

<style scoped="scoped" lang="scss">
.container{
	width:100;
}
</style>