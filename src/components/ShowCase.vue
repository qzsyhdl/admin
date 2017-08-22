<template>
	<div>
		<!-- 查找 -->
		<el-col :span="24" class="search">
			<el-form :inline="true" :model="filter">
				<el-form-item>
					<el-input v-model="filter.id" placeholder="编号 - 多个编号用 | 分隔"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" @click="handleDelMulti" :disabled="!selections.length">批量删除</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 客户案例列表 -->
		<el-table :data="list" v-loading="listLoading" border style="width:100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="id" label="编号" sortable width="90">
			</el-table-column>
			<el-table-column prop="name" label="名称" min-width="100">
			</el-table-column>
			<el-table-column prop="cate" label="行业" width="105">
			</el-table-column>
			<el-table-column prop="type" label="类型" width="105">
			</el-table-column>
			<el-table-column prop="ctime" label="创建时间" width="105">
			</el-table-column>
			<el-table-column prop="star" label="推荐指数" width="105">
			</el-table-column>
			<el-table-column prop="thumb" label="缩图(360 X 任意)" min-width="140">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="small" @click="handleView(scope.row.id)">预览</el-button>
					<el-button size="small" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="page">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;"></el-pagination>
		</el-col>
		<!-- 编辑界面 -->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editFormData" label-width="80px" :rules="formRules" ref="editForm">
				<el-form-item label="编号" prop="id">
					<el-input v-model="editFormData.id" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="name">
					<el-input v-model="editFormData.name" placeholder="模块名称，小于32个字符"></el-input>
				</el-form-item>
				<el-form-item label="行业" prop="cate">
					<el-select v-model="editFormData.cate" placeholder="请选择行业">
						<el-option v-for="item in cates" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="editFormData.type" placeholder="请选择类型">
						<el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="推荐" prop="star">
					<el-select v-model="editFormData.star" placeholder="请选择推荐指数">
						<el-option v-for="item in stars" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="缩图" prop="thumb">
					<el-input v-model="editFormData.thumb" placeholder="图片尺寸(360 X 任意)"></el-input>
				</el-form-item>
				<el-form-item label="代码" prop="code">
					<el-input v-model="editFormData.code" type="textarea" :rows="10" placeholder="请输入DIY代码"></el-input>
				</el-form-item>
				<el-form-item label=" ">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click="editSubmit('editForm')" :loading="editLoading">提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 新增界面 -->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addFormData" label-width="80px" :rules="formRules" ref="addForm">
				<el-form-item label="名称" prop="name">
					<el-input v-model="addFormData.name" placeholder="模块名称，小于32个字符"></el-input>
				</el-form-item>
				<el-form-item label="行业" prop="cate">
					<el-select v-model="addFormData.cate" placeholder="请选择行业">
						<el-option v-for="item in cates" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="addFormData.type" placeholder="请选择类型">
						<el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="推荐" prop="star">
					<el-select v-model="addFormData.star" placeholder="请选择推荐指数">
						<el-option v-for="item in stars" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="缩图" prop="thumb">
					<el-input v-model="addFormData.thumb" placeholder="图片尺寸(360 X 任意)"></el-input>
				</el-form-item>
				<el-form-item label="代码" prop="code">
					<el-input v-model="addFormData.code" type="textarea" :rows="10" placeholder="请输入DIY代码"></el-input>
				</el-form-item>
				<el-form-item label=" ">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click="addSubmit('addForm')" :loading="addLoading">提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>

	import {getShowCasesList, delShowCases, delMultiShowCases, editShowCases, addShowCases} from '../api/api';

	import {isImageUrl} from '../common/js/rule';

	export default {
		name: 'showCase', //--组件名称
		data: function() {

			const cates = [
				{value: '女装', label: '女装'},
				{value: '男装', label: '男装'},
				{value: '童装', label: '童装'},
				{value: '工业', label: '工业'},
				{value: '数码', label: '数码'},
				{value: '鞋包', label: '鞋包'},
				{value: '家居', label: '家居'},
				{value: '食品', label: '食品'},
				{value: '美容', label: '美容'},
				{value: '母婴', label: '母婴'},
				{value: '饰品', label: '饰品'}
			];
			const types = [
				// {value: '其它', label: '其它'},
				{value: '全屏海报', label: '全屏海报'},
				{value: '拼图广告', label: '拼图广告'},
				{value: '活动节日', label: '活动节日'},
				{value: '产品陈列', label: '产品陈列'},
				{value: '分类导航', label: '分类导航'},
				{value: '客服中心', label: '客服中心'}
			];
			const stars = [
				// {value: '不推荐', label: '不推荐'},
				{value: '一星', label: '一星'},
				{value: '二星', label: '二星'},
				{value: '三星', label: '三星'},
				{value: '四星', label: '四星'},
				{value: '五星', label: '五星'},
				{value: '六星', label: '六星'},
				{value: '七星', label: '七星'},
				{value: '八星', label: '八星'},
				{value: '九星', label: '九星'}
			];

			let valiateName = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('名称不能为空，请输入名称'));
				}
				if (value.length > 32) {
					return callback(new Error('名称不能超过32个字符'));
				}
				callback();
			};
			

			return {
				total: 50,
				nowPage: 1,
				// 预览地址
				detail: 'http://www.ipinru.com/ali/preview/id/',
				// 帅选条件
				filter: {
					id: ''
				},
				list: [],
				// 列表加载
				listLoading: false,

				// 行业
				cates: cates,
				types: types,
				stars: stars,

				// 选中的列表
				selections: [],

				// 表单验证规则
				formRules: {
					name: [
						{required:true, validator: valiateName, trigger:'blur'}
					],
					cate: [
						{required:true, message:'请选择行业', trigger:'change'}
					],
					type: [
						{required:true, message:'请选择类型', trigger:'change'}
					],
					star: [
						{required:true, message:'请选择推荐指数', trigger:'change'}
					],
					thumb: [
						{required:true, validator: isImageUrl, trigger:'blur'}
					],
					code: [
						{required:true, message:'请输入DIY代码', trigger:'blur'}
					]
				},

				// 编辑-显隐
				editFormVisible: false,
				// 编辑-数据
				editFormData: {
					id: 0,
					name: '',
					cate: '',
					type: '',
					star: '',
					thumb: '',
					code: ''
				},
				// 编辑-提交加载
				editLoading: false,

				// 新增-显隐
				addFormVisible: false,
				// 新增-数据
				addFormData: {
					name: '',
					cate: '',
					type: '',
					star: '',
					thumb: '',
					code: ''
				},
				// 新增-提交加载
				addLoading: false
			}
		},
		methods: {
			// 列表数据
			getList() {
				let params = {
					id: this.filter.id,
					page: this.nowPage
				};
				this.listLoading = true;
				getShowCasesList(params).then(res => {
					this.total = res.data.total;
					this.list = res.data.list;
					this.listLoading = false;
				});
			},
			
			// 操作-翻页
			handleCurrentChange(currentPage) {
				this.nowPage = currentPage;
				this.getList();
			},
			// 操作-编辑
			handleEdit(row) {
				this.editFormVisible = true;
				this.editFormData = Object.assign({}, row);
				if (this.$refs.editForm) {
					this.$refs.editForm.resetFields();
				}
			},
			// 操作-删除
			handleDel(id) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let params = {id: id};
					delShowCases(params).then(res => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getList();
					})
				})
			},
			// 操作-预览
			handleView(id) {
				window.open(`${this.detail+id}.html`);
			},
			// 操作-新增
			handleAdd() {
				this.addFormVisible = true;
				this.addFormData = {
					name: '',
					cate: '',
					type: '',
					star: '',
					thumb: '',
					code: ''
				};
				if (this.$refs.addForm) {
					this.$refs.addForm.resetFields();
				}
			},
			// 操作-选择
			handleSelectionChange(val) {
				this.selections = val;
			},
			// 操作-多选删除
			handleDelMulti() {
				let ids = this.selections.map(item => item.id).toString();
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let params = {ids: ids};
					delMultiShowCases(params).then(res => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getList();
					})
				});
			},

			// 编辑-提交
			editSubmit(formName) {
				this.$refs[formName].validate(valid =>{
					if (valid) {// 提交
						this.editLoading = true;
						let params = Object.assign({}, this.editFormData);
						editShowCases(params).then(res => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs[formName].resetFields();
							this.editFormVisible = false;
							this.getList();
						});

					} else {
						return false;
					}
				});
			},

			// 新增-提交
			addSubmit(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.addLoading = true;
						let params = Object.assign({}, this.addFormData);
						addShowCases(params).then(res => {
							this.addLoading = false;
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.$refs[formName].resetFields();
							this.addFormVisible = false;
							this.getList();
						})
					}
				});
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