<template>
    <section>
        <el-form :inline="true" class="demo-form-inline" style="text-align: left">
            <el-form-item label="一级分类">
                <el-select v-model="cataId" placeholder="请选择">
                    <el-option
                            v-for="item in catagoryList"
                            :key="item.id"
                            :label="item.catagoryName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="list">查询</el-button>
                <el-button type="danger" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>

        <!--列表-->
        <el-table :data="works" highlight-current-row  :show-overflow-tooltip="true" v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="60"> </el-table-column>
            <el-table-column prop="subCatagoryName" label="标题" width="200"> </el-table-column>
            <el-table-column prop="subCatagoryDesc" label="描述" width="200"> </el-table-column>
            <el-table-column prop="displayOrder" label="排序" width="200"> </el-table-column>
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
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" :fullscreen="true">
            <el-form :model="editForm" label-width="80px" ref="editForm">
                <el-form-item label="标题" prop="subCatagoryName">
                    <el-input v-model="editForm.subCatagoryName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="subCatagoryDesc">
                    <el-input v-model="editForm.subCatagoryDesc" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序" prop="displayOrder">
                    <el-input v-model="editForm.displayOrder" :min="0" :max="200"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false" :fullscreen="true">
            <el-form :model="addForm" label-width="80px" ref="addForm">
                <el-form-item label="标题" prop="subCatagoryName">
                    <el-input v-model="addForm.subCatagoryName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="subCatagoryDesc">
                    <el-input v-model="addForm.subCatagoryDesc" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="displayOrder">
                    <el-input v-model="addForm.displayOrder" :min="0" :max="200"></el-input>
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
    import { getSubCatagoryListPage, updateSubCatagory, addSubCatagory, deleteSubCatagory, getCatagoryListPage} from '../../api/api';

    export default {
        data() {
            return {
                catagoryList: [],
                cataId: 1,
                works: [],
                total: 0,
                page: 1,
                listLoading: false,
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                //编辑界面数据
                editForm: {
                    id: 0,
                    subCatagoryName: '',
                    subCatagoryDesc: '',
                    displayOrder: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                //新增界面数据
                addForm: {
                    subCatagoryName: '',
                    subCatagoryDesc: '',
                    displayOrder: ''
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
                    cataId: this.cataId,
                };
                this.listLoading = true;
                getSubCatagoryListPage(para).then((res) => {
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
                    deleteSubCatagory(para).then((res) => {
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
                    subCatagoryName: '',
                    subCatagoryDesc: '',
                    displayOrder: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.editForm);
                            updateSubCatagory(para).then((res) => {
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
                            para.catagoryId = this.cataId;
                            addSubCatagory(para).then((res) => {
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
            getCatagoryList: function (){
                let para = {};
                getCatagoryListPage(para).then((res) => {
                    this.catagoryList = res.data.list;
                });
            }
        },
        mounted() {
            this.getCatagoryList();
            this.list();
        }
    }

</script>

<style scoped>

</style>