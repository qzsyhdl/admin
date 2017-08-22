<template>
	<div class="team">
		<ul>
			<li v-for="item in members">
				<el-card style="width:200px;" :body-style="{padding:'0'}">
					<img :src="item.image" :alt="item.name">
					<span>{{item.name}}</span>
				</el-card>
			</li>
			
		</ul>
	</div>
</template>
<script>
export default {
	name: 'team', //--组件名称
	data () {
		return {
	 		members: [
				{name: '林芳柽', image: require('../assets/1.jpg')},
				{name: '郑少燕', image: require('../assets/2.jpg')},
				{name: '曾重阳', image: require('../assets/3.jpg')},
				{name: '洪定沦', image: require('../assets/4.jpg')},
				{name: '刘婉云', image: require('../assets/5.jpg')},
				{name: '李梦娇', image: require('../assets/6.jpg')},
				{name: '柯清丽', image: require('../assets/12.jpg')},
				{name: '高丽兰', image: require('../assets/11.jpg')},
				{name: '曾志煌', image: require('../assets/7.jpg')},
				{name: '傅燕萍', image: require('../assets/9.jpg')},
				{name: '林静', image: require('../assets/8.jpg')},
				{name: '王珊珊', image: require('../assets/10.jpg')}
	 		]
		}
	}
}
</script>
<style lang="less">/* -- 绑定到属性选择器 */
	.team {
		ul {
			
			list-style: none;
			li {
				width: 240px;
				float: left;
				margin-bottom: 40px;
				.el-card {
					text-align: center;
					img {
						width: 100%;
						display: block;
					}
					span {
						line-height: 40px;
						font-size: 18px;
					}
				}
			}
			&:after {
				content: '';
				display: table;
				clear: both;
			}
		}
	}
</style>
