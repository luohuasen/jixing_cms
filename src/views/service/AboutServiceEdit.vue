<template>
    <div class="edit_container">
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"></quill-editor>
        <button v-on:click="saveHtml">保存</button>
    </div>
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
                content: `<p>hello world</p>`,
                editorOption: quillConfig
            }
        },
        methods: {
            onEditorReady(editor) { // 准备编辑器
            },
            saveHtml:function(event){
                let para = {
                    id: 6,
                    type: "about",
                    key: "content",
                    value: this.content,
                    description: new Date()
                };
                updateConfig(para).then((res)=>{
                    console.log(res.data.data)
                });
            }
        },
        mounted() {
            let para = { id: 6 };
            findConfig(para).then((res) =>{
                var data = res.data.data;
                this.content = data.value;
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