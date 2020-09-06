<template>
    <section>
        <el-form :inline="true" class="demo-form-inline" style="text-align: left">
            <el-form-item label="一级分类">
                <el-select v-model="catagoryId" placeholder="请选择" @change="getSubCatagoryList">
                    <el-option
                            v-for="item in catagoryList"
                            :key="item.id"
                            :label="item.catagoryName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="二级分类">
                <el-select v-model="subCatagoryId" placeholder="请选择">
                    <el-option
                            v-for="item in subCatagoryList"
                            :key="item.id"
                            :label="item.subCatagoryName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="list">查询</el-button>
            </el-form-item>
        </el-form>

        <!--列表-->
        <el-table :data="works" highlight-current-row  :show-overflow-tooltip="true" v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="60"> </el-table-column>
            <el-table-column prop="productTitle" label="标题" width="200"> </el-table-column>
            <el-table-column label="Icon图片" width="200">
                <template slot-scope="scope">
                    <el-popover placement="right" title="" trigger="hover">
                        <img :src="scope.row.icon" />
                        <img slot="reference" :src="scope.row.icon" :alt="scope.row.icon" style="max-height: 50px;max-width: 130px">
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--列表-->
        <el-table :data="unWorks" highlight-current-row  :show-overflow-tooltip="true" v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="60"> </el-table-column>
            <el-table-column prop="productTitle" label="标题" width="200"> </el-table-column>
            <el-table-column label="Icon图片" width="200">
                <template slot-scope="scope">
                    <el-popover placement="right" title="" trigger="hover">
                        <img :src="scope.row.icon" />
                        <img slot="reference" :src="scope.row.icon" :alt="scope.row.icon" style="max-height: 50px;max-width: 130px">
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    import {
        getCatagoryListPage,
        getRelatedListProductInfoListPage,
        getUnRelatedListProductInfoListPage,
        addProductCatagory,
        deleteProductCatagory,
        getSubCatagoryListPage
    } from '../../api/api';

    export default {
        data() {
            return {
                works: [],
                unWorks: [],
                total: 0,
                page: 1,
                listLoading: false,
                catagoryId:1,
                catagoryList: [],
                subCatagoryId: 1,
                subCatagoryList: []
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
                    subCatagoryId: this.subCatagoryId,
                };
                this.listLoading = true;
                getRelatedListProductInfoListPage(para).then((res) => {
                    this.total = res.data.sum;
                    this.works = res.data.list;
                });
                getUnRelatedListProductInfoListPage(para).then((res) => {
                    this.total = res.data.sum;
                    this.unWorks = res.data.list;
                });
                this.listLoading = false;
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {
                        productId: row.id ,
                        subCatagoryId: this.subCatagoryId ,
                    };
                    deleteProductCatagory(para).then((res) => {
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
            //显示新增界面
            handleAdd: function (index, row) {
                this.$confirm('确认添加该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {
                        productId: row.id ,
                        subCatagoryId: this.subCatagoryId
                    };
                    addProductCatagory(para).then((res) => {
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
            getCatagoryList() {
                let para = {

                };
                getCatagoryListPage(para).then((res) => {
                    this.total = res.data.sum;
                    this.catagoryList = res.data.list;
                    this.catagoryId = this.catagoryList[0].id;
                });
            },
            getSubCatagoryList() {
                let para = {
                    cataId: this.catagoryId,
                };
                this.listLoading = true;
                getSubCatagoryListPage(para).then((res) => {
                    this.total = res.data.sum;
                    this.subCatagoryList = res.data.list;
                    this.listLoading = false;
                });
            },
        },
        mounted() {
            this.list();
            this.getCatagoryList();
            this.getSubCatagoryList();
        }
    }

</script>

<style scoped>

</style>