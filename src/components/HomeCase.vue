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
			<el-table-column prop="intro" label="简介" min-width="80">
			</el-table-column>
			<el-table-column prop="thumb" label="缩图(280 X 490)" min-width="150">
			</el-table-column>
			<el-table-column prop="pic" label="原图(784 X 445)" min-width="150">
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
					<el-input v-model="editFormData.name" placeholder="客户店铺名称，小于30个字符"></el-input>
				</el-form-item>
				<el-form-item label="简介" prop="intro">
					<el-input v-model="editFormData.intro" placeholder="设计简介，小于128个字符"></el-input>
				</el-form-item>
				<el-form-item label="缩图" prop="thumb">
					<el-input v-model="editFormData.thumb" placeholder="图片尺寸(280 X 490)"></el-input>
				</el-form-item>
				<el-form-item label="原图" prop="pic">
					<el-input v-model="editFormData.pic" placeholder="图片尺寸(784 X 445)"></el-input>
				</el-form-item>
				<el-form-item label="详情" prop="detail">
					<el-input v-model="editFormData.detail" type="textarea" :rows="10" placeholder="必须切片且每张切片的宽度（1920px）必须大于高度，多张图片使用 | 分隔，图片格式为gif，jpg，jpeg，png的一种"></el-input>
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
					<el-input v-model="addFormData.name" placeholder="客户店铺名称，小于30个字符"></el-input>
				</el-form-item>
				<el-form-item label="简介" prop="intro">
					<el-input v-model="addFormData.intro" placeholder="设计简介，小于128个字符"></el-input>
				</el-form-item>
				<el-form-item label="缩图" prop="thumb">
					<el-input v-model="addFormData.thumb" placeholder="图片尺寸(280 X 490)"></el-input>
				</el-form-item>
				<el-form-item label="原图" prop="pic">
					<el-input v-model="addFormData.pic" placeholder="图片尺寸(784 X 445)"></el-input>
				</el-form-item>
				<el-form-item label="详情" prop="detail">
					<el-input v-model="addFormData.detail" type="textarea" :rows="10" placeholder="必须切片且每张切片的宽度（1920px）必须大于高度，多张图片使用 | 分隔，图片格式为gif，jpg，jpeg，png的一种"></el-input>
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

	import {getHomeCasesList, delHomeCase, delMultiHomeCase, editHomeCase, addHomeCase} from '../api/api';

	import {isImageUrl, isImagesUrl, isUrl} from '../common/js/rule';

	export default {
		name: 'homeCase', //--组件名称
		data: function() {
			let valiateName = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('名称不能为空，请输入名称'));
				}
				if (value.length > 30) {
					return callback(new Error('名称不能超过30个字符'));
				}
				callback();
			};
			let validateIntro = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('简介不能为空，请输入简介'));
				}
				if (value.length > 128) {
					return callback(new Error('简介不能超过128个字符'));
				}
				callback();
			};

			return {
				total: 50,
				nowPage: 1,
				// 预览地址
				detail: 'http://www.ipinru.com/custom/home/id/',
				// 帅选条件
				filter: {
					id: ''
				},
				list: [],
				// 列表加载
				listLoading: false,

				// 选中的列表
				selections: [],

				// 表单验证规则
				formRules: {
					name: [
						{required:true, validator: valiateName, trigger:'blur'}
					],
					intro: [
						{required:true, validator: validateIntro, trigger:'blur'}
					],
					thumb: [
						{required:true, validator: isImageUrl, trigger:'blur'}
					],
					pic: [
						{required:true, validator: isImageUrl, trigger:'blur'}
					],
					detail: [
						{required:true, validator: isImagesUrl, trigger:'blur'}
					]
				},

				// 编辑-显隐
				editFormVisible: false,
				// 编辑-数据
				editFormData: {
					id: 0,
					name: '',
					intro: '',
					thumb: '',
					pic: '',
					detail: ''
				},
				// 编辑-提交加载
				editLoading: false,

				// 新增-显隐
				addFormVisible: false,
				// 新增-数据
				addFormData: {
					name: '',
					intro: '',
					thumb: '',
					pic: '',
					detail: ''
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
				getHomeCasesList(params).then(res => {
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
					delHomeCase(params).then(res => {
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
					pic: '',
					tid: '',
					name: '',
					cate: '',
					shop: '',
					thumb: ''
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
					delMultiHomeCase(params).then(res => {
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
						editHomeCase(params).then(res => {
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
						addHomeCase(params).then(res => {
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