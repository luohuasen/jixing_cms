<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="handleAdd">新增</el-button>
		</el-col>
		<!--列表-->
		<el-table :data="works" highlight-current-row  :show-overflow-tooltip='true' v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="60"> </el-table-column>
			<el-table-column label="大图" width="150" >
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<img :src="scope.row.bigImage" />
						<img slot="reference" :src="scope.row.bigImage" :alt="scope.row.bigImage" style="max-height: 50px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="小图1" width="150" >
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<img :src="scope.row.image0" />
						<img slot="reference" :src="scope.row.image0" :alt="scope.row.image0" style="max-height: 50px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="小图2" width="150" >
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<img :src="scope.row.image1" />
						<img slot="reference" :src="scope.row.image1" :alt="scope.row.image1" style="max-height: 50px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="小图3" width="150" >
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<img :src="scope.row.image2" />
						<img slot="reference" :src="scope.row.image2" :alt="scope.row.image2" style="max-height: 50px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="小图4" width="150" >
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<img :src="scope.row.image3" />
						<img slot="reference" :src="scope.row.image3" :alt="scope.row.image3" style="max-height: 50px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
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
				<el-form-item label="大图标题" prop="is_big">
					<el-input v-model="editForm.bigTitle" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="大图">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadEditFormImageSuccessBig">
						<img v-if="editForm.bigImage" :src="editForm.bigImage" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="标题1" prop="title0">
					<el-input v-model="editForm.title0" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图1">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadEditFormImageSuccess0">
						<img v-if="editForm.image0" :src="editForm.image0" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="标题2" prop="title0">
					<el-input v-model="editForm.title1" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图2">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadEditFormImageSuccess1">
						<img v-if="editForm.image1" :src="editForm.image1" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="标题3" prop="title2">
					<el-input v-model="editForm.title2" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图3">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadEditFormImageSuccess2">
						<img v-if="editForm.image2" :src="editForm.image2" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="标题4" prop="title3">
					<el-input v-model="editForm.title3" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图4">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadEditFormImageSuccess3">
						<img v-if="editForm.image3" :src="editForm.image3" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
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
				<el-form-item label="大图标题" prop="bigTitle">
					<el-input v-model="addForm.bigTitle" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="大图">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadAddFormImageSuccessBig">
						<img v-if="addForm.bigImage" :src="addForm.bigImage" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="标题1" prop="title0">
					<el-input v-model="addForm.title0" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图1">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadAddFormImageSuccess0">
						<img v-if="addForm.image0" :src="addForm.image0" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="标题2" prop="title1">
					<el-input v-model="addForm.title1" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图2">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadAddFormImageSuccess1">
						<img v-if="addForm.image1" :src="addForm.image1" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="标题3" prop="title2">
					<el-input v-model="addForm.title2" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图3">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadAddFormImageSuccess2">
						<img v-if="addForm.image2" :src="addForm.image2" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="标题4" prop="title3">
					<el-input v-model="addForm.title3" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图4">
					<el-upload
							class="avatar-uploader"
							action="http://www.jixing.com/upload/image"
							:show-file-list="false"
							:on-success="uploadAddFormImageSuccess3">
						<img v-if="addForm.image3" :src="addForm.image3" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
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
	import { getProductListPage, updateProduct, addProduct, deleteProduct } from '../../api/api';

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
					bigTitle: '',
					bigImage: '',
					title0: '',
					image0: '',
					title1: '',
					image1: '',
					title2: '',
					image2: '',
					title3: '',
					image3: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				addForm: {
					bigTitle: '',
					bigImage: '',
					title0: '',
					image0: '',
					title1: '',
					image1: '',
					title2: '',
					image2: '',
					title3: '',
					image3: ''
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
				getProductListPage(para).then((res) => {
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
					deleteProduct(para).then((res) => {
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
				this.addForm = {
					title: '',
					is_big: '',
					image0: '',
					image1: '',
					image2: '',
					image3: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							updateProduct(para).then((res) => {
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
							addProduct(para).then((res) => {
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
			uploadEditFormImageSuccessBig: function (res) {
				this.editForm.bigImage = res.data;
			},
			uploadEditFormImageSuccess0: function (res) {
				this.editForm.image0 = res.data;
			},
			uploadEditFormImageSuccess1: function (res) {
				this.editForm.image1 = res.data;
			},
			uploadEditFormImageSuccess2: function (res) {
				this.editForm.image2 = res.data;
			},
			uploadEditFormImageSuccess3: function (res) {
				this.editForm.image3 = res.data;
			},
			uploadAddFormImageSuccessBig: function (res) {
				this.addForm.bigImage = res.data;
			},
			uploadAddFormImageSuccess0: function (res) {
				this.addForm.image0 = res.data;
			},
			uploadAddFormImageSuccess1: function (res) {
				this.addForm.image1 = res.data;
			},
			uploadAddFormImageSuccess2: function (res) {
				this.addForm.image2 = res.data;
			},
			uploadAddFormImageSuccess3: function (res) {
				this.addForm.image3 = res.data;
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