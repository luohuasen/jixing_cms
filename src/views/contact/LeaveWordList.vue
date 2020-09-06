<template>
    <section>
        <!--列表-->
        <el-table :data="works" highlight-current-row  :show-overflow-tooltip="true" v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="60"> </el-table-column>
            <el-table-column prop="username" label="用户姓名" width="100"> </el-table-column>
            <el-table-column prop="phone" label="联系电话" width="150"> </el-table-column>
            <el-table-column prop="email" label="电子邮箱" width="200"> </el-table-column>
            <el-table-column prop="qq" label="微信/QQ" width="100"> </el-table-column>
            <el-table-column prop="companyName" label="公司名称" width="100"> </el-table-column>
            <el-table-column prop="gmtCreate" label="留言时间" width="200"> </el-table-column>

            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" :fullscreen="true">
            <el-form :model="editForm" label-width="80px" ref="editForm">
                <el-form-item label="名称" prop="username">
                    <el-input v-model="editForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系手机" prop="phone">
                    <el-input v-model="editForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="qq/微信" prop="qq">
                    <el-input v-model="editForm.qq" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="editForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司名称" prop="companyName">
                    <el-input v-model="editForm.companyName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="body">
                    <el-input v-model="editForm.body" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import { getLeaveWordListPage, updateLeaveWord, deleteLeaveWord } from '../../api/api';

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
                getLeaveWordListPage(para).then((res) => {
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
                    deleteLeaveWord(para).then((res) => {
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
                    title: '',
                    displayOrder: '',
                    icon: '',
                    body: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.editForm);
                            updateLeaveWord(para).then((res) => {
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
                            console.log(para);
                            addLeaveWord(para).then((res) => {
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
                this.editForm.icon = res.data;
            },
            uploadAddFormImageSuccess: function (res) {
                this.addForm.icon = res.data;
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