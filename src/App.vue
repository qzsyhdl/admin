<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app'//组件名称
}
</script>

<style>
body{
	margin: 0;
	padding: 0;
	overflow: hidden;
}
#app {
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
	font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
