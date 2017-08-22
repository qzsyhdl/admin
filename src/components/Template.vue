<template>
	<div>
		<!-- 查找 -->
		<el-col :span="24" class="search">
			<el-form :inline="true" :model="filter">
				<el-form-item>
					<el-input v-model="filter.name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 模板列表 -->
		<el-table :data="list" v-loading="isLoading" border style="width:100%" :default-sort="{prop:'name', order:'descending'}">
			<el-table-column prop="name" label="名称" min-width="200">
			</el-table-column>
			<el-table-column prop="type" label="类型" sortable min-width="80">
			</el-table-column>
			<el-table-column prop="cate" label="行业" sortable min-width="80">
			</el-table-column>
			<el-table-column prop="color" label="颜色" sortable min-width="80">
			</el-table-column>
			<el-table-column prop="price" label="价格" sortable min-width="80">
			</el-table-column>
			<el-table-column prop="sale" label="销量" sortable min-width="80">
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-button @click="viewMore(scope.row)" type="text" size="small">查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="page">
			<el-pagination layout="prev, pager, next" @current-change="switchPage" :page-size="pageSize" :total="total" style="float:right;"></el-pagination>
		</el-col>
	</div>
</template>
<script>
	import {getTemplateList} from '../api/api';
	
	export default {
		name: 'template', //--组件名称
		data() {
			return {
				total: 50,//总条数
				nowPage: 1,//当前页码
				pageSize: 15,//每页显示个数
				filter: {//过滤条件
					name: ''
				},
				list: [],//模板列表
				isLoading: false,
				detail: 'https://jz.1688.com/template/market/detail.htm?key='//阿里详情地址
			}
		},
		methods: {
			// 获取模板列表
			getList() {
				let params = {
					page: this.nowPage,
					name: this.filter.name
				};
				this.isLoading = true;
				getTemplateList(params).then(res=>{
					this.total = res.data.total;
					this.list = res.data.list;
					this.isLoading = false;
				});
			},
			// 翻页
			switchPage(currentPage) {
				this.nowPage = currentPage;
				this.getList();
			},
			viewMore(row){
				window.open(this.detail+row.tid);
			}
		},
		mounted() {
			this.getList();
		}
	}
</script>
<style scoped>
	.page {
		margin-top: 20px;
	}
</style>