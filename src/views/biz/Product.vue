<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="handleAdd">新增</el-button>
		</el-col>
		<!--列表-->
		<el-table :data="works" highlight-current-row  :show-overflow-tooltip='true' v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="60"> </el-table-column>
			<el-table-column prop="title" label="标题" width="200"> </el-table-column>
			<el-table-column prop="is_big" label="是否大图" width="100"> </el-table-column>
			<el-table-column label="图片" width="100" >
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<img :src="scope.row.image0" />
						<img slot="reference" :src="scope.row.image0" :alt="scope.row.image0" style="max-height: 50px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="图片" width="100" >
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<img :src="scope.row.image1" />
						<img slot="reference" :src="scope.row.image1" :alt="scope.row.image1" style="max-height: 50px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="图片" width="100" >
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<img :src="scope.row.image2" />
						<img slot="reference" :src="scope.row.image2" :alt="scope.row.image2" style="max-height: 50px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="图片" width="100" >
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
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="标题" prop="title">
					<el-input v-model="editForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否是大图" prop="is_big">
					<el-input v-model="editForm.is_big" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片1">
					<el-input v-model="editForm.image0" ></el-input>
				</el-form-item>
				<el-form-item label="图片2">
					<el-input v-model="editForm.image1" ></el-input>
				</el-form-item>
				<el-form-item label="图片3">
					<el-input v-model="editForm.image2" ></el-input>
				</el-form-item>
				<el-form-item label="图片3">
					<el-input v-model="editForm.image3" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="标题" prop="name">
					<el-input v-model="addForm.title"></el-input>
				</el-form-item>
				<el-form-item label="是否是大图" prop="is_big">
					<el-input v-model="addForm.is_big"></el-input>
				</el-form-item>
				<el-form-item label="图片1">
					<el-input v-model="addForm.image0" ></el-input>
				</el-form-item>
				<el-form-item label="图片2">
					<el-input v-model="addForm.image1" ></el-input>
				</el-form-item>
				<el-form-item label="图片3">
					<el-input v-model="addForm.image2" ></el-input>
				</el-form-item>
				<el-form-item label="图片4">
					<el-input v-model="addForm.image3" ></el-input>
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
					title: '',
					is_big: '',
					image0: '',
					image1: '',
					image2: '',
					image3: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				addForm: {
					title: '',
					is_big: '',
					image0: '',
					image1: '',
					image2: '',
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
			}
		},
		mounted() {
			this.list();
		}
	}

</script>

<style scoped>

</style>