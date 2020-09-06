<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="handleAdd">新增</el-button>
		</el-col>
		<!--列表-->
		<el-table :data="works" highlight-current-row  :show-overflow-tooltip="true" v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="60"> </el-table-column>
			<el-table-column prop="username" label="登录名" width="200"> </el-table-column>
			<el-table-column prop="password" label="密码" width="200"> </el-table-column>
			<el-table-column label="头像" width="200">
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<img :src="scope.row.avatar" />
						<img slot="reference" :src="scope.row.avatar" :alt="scope.row.avatar" style="max-height: 50px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="nickname" label="昵称" width="200"> </el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="登录名" prop="title">
					<el-input v-model="editForm.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="editForm.password" :min="0" :max="200"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadEditFormImageSuccess">
						<img v-if="editForm.avatar" :src="editForm.avatar" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="昵称">
					<el-input v-model="editForm.nickname" :min="0" :max="200"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="登录名" prop="name">
					<el-input v-model="addForm.username" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="密码">
					<el-input v-model="addForm.password" :min="0" :max="200"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadEditFormImageSuccess">
						<img v-if="addForm.avatar" :src="addForm.avatar" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="昵称">
					<el-input v-model="addForm.nickname" :min="0" :max="200"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getUserListPage, updateUser, addUser, deleteUser } from '../../api/api';

	export default {
		data() {
			return {
				works: [],
				total: 0,
				page: 1,
				listLoading: false,
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
					id: 0,
					username: '',
					password: '',
					avatar: '',
					nickname: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				addForm: {
					username: '',
					password: '',
					avatar: '',
					nickname: ''
				}

			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.list();
			},
			//获取用户列表
			list() {
				let para = {
					pageNum: this.page,
					pageSize: 20
				};
				this.listLoading = true;
				getUserListPage(para).then((res) => {
					this.total = res.data.sum;
					this.works = res.data.list;
					this.listLoading = false;
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: row.id };
					deleteUser(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.list();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				console.log(this.addFormVisible)
				this.addForm = {
					username: '',
					password: '',
					avatar: '',
					nickname: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							updateUser(para).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.list();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.list();
							});
						});
					}
				});
			},
			uploadEditFormImageSuccess: function (res) {
				this.editForm.image = res.data;
			},
			uploadAddFormImageSuccess: function (res) {
				this.addForm.image = res.data;
			}
		},
		mounted() {
			this.list();
		}
	}

</script>

<style scoped>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>