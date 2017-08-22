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
			<el-table-column prop="cate" label="行业" min-width="80">
			</el-table-column>
			<el-table-column prop="shop" label="店铺" min-width="90">
			</el-table-column>
			<el-table-column prop="thumb" label="缩图(370 X 650)" min-width="150">
			</el-table-column>
			<el-table-column prop="pic" label="原图(628 X 355)" min-width="150">
			</el-table-column>
			<el-table-column prop="tid" label="模板ID" min-width="90">
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
			<el-form :model="editFormData" label-width="120px" :rules="formRules" ref="editForm">
				<el-form-item label="编号" prop="id">
					<el-input v-model="editFormData.id" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="name">
					<el-input v-model="editFormData.name" placeholder="客户1688店铺名称，小于30个字符"></el-input>
				</el-form-item>
				<el-form-item label="行业" prop="cate">
					<el-input v-model="editFormData.cate" placeholder="客户1688店铺行业，小于10个字符"></el-input>
				</el-form-item>
				<el-form-item label="店铺" prop="shop">
					<el-input v-model="editFormData.shop" placeholder="客户1688店铺地址"></el-input>
				</el-form-item>
				<el-form-item label="缩图" prop="thumb">
					<el-input v-model="editFormData.thumb" placeholder="图片尺寸(370 X 650)"></el-input>
				</el-form-item>
				<el-form-item label="原图" prop="pic">
					<el-input v-model="editFormData.pic" placeholder="图片尺寸(628 X 355)"></el-input>
				</el-form-item>
				<el-form-item label="模板ID" prop="tid">
					<el-input v-model="editFormData.tid" placeholder="模板ID为14为正整数"></el-input>
				</el-form-item>
				<el-form-item label=" ">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click="editSubmit('editForm')" :loading="editLoading">提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 新增界面 -->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addFormData" label-width="120px" :rules="formRules" ref="addForm">
				<el-form-item label="名称" prop="name">
					<el-input v-model="addFormData.name" placeholder="客户1688店铺名称，小于30个字符"></el-input>
				</el-form-item>
				<el-form-item label="行业" prop="cate">
					<el-input v-model="addFormData.cate" placeholder="客户1688店铺行业，小于10个字符"></el-input>
				</el-form-item>
				<el-form-item label="店铺" prop="shop">
					<el-input v-model="addFormData.shop" placeholder="客户1688店铺地址"></el-input>
				</el-form-item>
				<el-form-item label="缩图" prop="thumb">
					<el-input v-model="addFormData.thumb" placeholder="图片尺寸(370 X 650)"></el-input>
				</el-form-item>
				<el-form-item label="原图" prop="pic">
					<el-input v-model="addFormData.pic" placeholder="图片尺寸(628 X 355)"></el-input>
				</el-form-item>
				<el-form-item label="模板ID" prop="tid">
					<el-input v-model="addFormData.tid" placeholder="模板ID为14为正整数"></el-input>
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

	import {getUserCasesList, delUserCase, delMultiUserCase, editUserCases, addUserCases} from '../api/api';

	import {isImageUrl, isUrl} from '../common/js/rule';

	export default {
		name: 'userCase', //--组件名称
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
			let validateCate = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('行业不能为空，请输入行业'));
				}
				if (value.length > 10) {
					return callback(new Error('行业不能超过10个字符'));
				}
				callback();
			};
			let validateTid = (rule, value, callback) => {
				if (!isNaN(value) && value.length === 14) {
					callback();
				} else {
					callback(new Error('请输入正确的14为整数'));
				}
			};

			return {
				total: 50,
				nowPage: 1,
				// 预览地址
				detail: 'http://www.ipinru.com/ali/cases/id/',
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
					cate: [
						{required:true, validator: validateCate, trigger:'blur'}
					],
					shop: [
						{required:true, validator: isUrl, trigger:'blur'}
					],
					thumb: [
						{required:true, validator: isImageUrl, trigger:'blur'}
					],
					pic: [
						{required:true, validator: isImageUrl, trigger:'blur'}
					],
					tid: [
						{required:true, validator: validateTid, trigger:'blur'}
					]
				},

				// 编辑-显隐
				editFormVisible: false,
				// 编辑-数据
				editFormData: {
					id: 0,
					pic: '',
					tid: '',
					name: '',
					cate: '',
					shop: '',
					thumb: ''
				},
				// 编辑-提交加载
				editLoading: false,

				// 新增-显隐
				addFormVisible: false,
				// 新增-数据
				addFormData: {
					pic: '',
					tid: '',
					name: '',
					cate: '',
					shop: '',
					thumb: ''
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
				getUserCasesList(params).then(res => {
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
					delUserCase(params).then(res => {
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
					delMultiUserCase(params).then(res => {
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
						editUserCases(params).then(res => {
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
						addUserCases(params).then(res => {
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