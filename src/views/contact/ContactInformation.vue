<template>
    <section>
        <el-form :model="editForm" label-width="80px" ref="editForm">
            <el-form-item label="手机" prop="phone">
                <el-input v-model="editForm.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="editForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="editForm.address" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
    </section>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'
    import quillConfig from '../quill-config.js'
    import {quillRedefine} from 'vue-quill-editor-upload'
    import util from '../../common/js/util'
    import {findConfig,updateConfig } from '../../api/api';
    export default {
        name: 'App',
        data(){
            return {
                editLoading: false,
                editForm: {
                    phone: '',
                    email: '',
                    address: '',
                }
            }
        },
        methods: {
            onEditorReady(editor) { // 准备编辑器
            },
            editSubmit:function(event){
                let value = JSON.stringify(this.editForm);
                let para = {
                    id: 7,
                    value: value,
                    description: new Date()
                };
                updateConfig(para).then((res)=>{
                    console.log(res.data.data)
                });
            }
        },
        mounted() {
            let para = { id: 7 };
            findConfig(para).then((res) =>{
                var data = res.data.data;
                let parse = JSON.parse(data.value);
                this.editForm = parse;
            }).catch(()=>{});
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>