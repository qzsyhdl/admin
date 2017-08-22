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
					<el-button type="danger" @click="handleDelMulti" :disabled="!this.selections.length">批量删除</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 店招列表 -->
		<el-table :data="list" v-loading="listLoading" border style="width:100%;" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="id" label="编号" sortable width="90">
			</el-table-column>
			<el-table-column prop="cate" label="行业" sortable width="100">
			</el-table-column>
			<el-table-column prop="pic" label="图片" min-width="80">
			</el-table-column>
			<el-table-column label="操作" width="140">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
				<el-form-item label="行业" prop="cate">
					<el-select v-model="editFormData.cate" placeholder="请选择行业">
						<el-option v-for="item in cates" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="图片" prop="pic">
					<el-input v-model="editFormData.pic"></el-input>
				</el-form-item>
				<el-form-item label=" ">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click="editSubmit('editForm')" :loading="editLoading">提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 新增界面 -->
		<el-dialog title="编辑" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addFormData" label-width="80px" :rules="formRules" ref="addForm">
				<el-form-item label="行业" prop="cate">
					<el-select v-model="addFormData.cate" placeholder="请选择行业">
						<el-option v-for="item in cates" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="图片" prop="pic">
					<el-input v-model="addFormData.pic"></el-input>
				</el-form-item>
				<el-form-item label=" ">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click="addSubmit('addForm')" :loading="editLoading">提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import {getSignList, editSign, delSign, delMultiSign, addSign} from '../api/api';
	import {isImageUrl} from '../common/js/rule';

	export default {
		name: 'Sign', //--组件名称
		data() {
			const cates = 
			[
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
			return {
				total: 50,
				nowPage: 1,
				// 帅选条件
				filter: {
					id: ''
				},
				list: [],
				listLoading: false,

				// 行业
				cates: cates,

				// 选中的列表
				selections: [],

				// 编辑界面-验证
				formRules: {
					cate: [
						{required:true, message:'请选择行业', trigger:'change'}
					],
					pic: [
						{required:true, validator:isImageUrl, trigger:'blur'}
					]
				},

				//编辑-显隐
				editFormVisible: false,
				//编辑-数据
				editFormData: {
					id: 0,
					cate: '',
					pic: ''
				},
				// 编辑-提交加载
				editLoading: false,
				
				// 新增-显隐
				addFormVisible: false,
				// 新增-数据
				addFormData: {
					cate: '',
					pic: ''
				},
				// 新增-提交加载
				addLoading: false

			}
		},
		methods: {
			getList() {
				let params = {
					id: this.filter.id,
					page: this.nowPage
				}
				this.listLoading = true;
				getSignList(params).then(res => {
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
					delSign(params).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getList();
					})
				});
			},
			// 操作-新增
			handleAdd() {
				this.addFormVisible = true;
				this.addFormData = {
					cate: '',
					pic: ''
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
				this.$confirm('确认删除选中的记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let params = {ids: ids};

					delMultiSign(params).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getList();
					})
				})
			},

			// 编辑-提交
			editSubmit(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.editLoading = true;
						let params = Object.assign({}, this.editFormData);
						editSign(params).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs[formName].resetFields();
							this.editFormVisible = false;
							this.getList();
						})
					}
				});
			},
			
			// 新增-提交
			addSubmit(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.addLoading = true;
						let params = Object.assign({}, this.addFormData);
						addSign(params).then(res => {
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