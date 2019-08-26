<template>
  <div class="about">
    <h1>{{id? '编辑':'创建'}}文章</h1>
    <el-form @submit.native.prevent="save" >
      <el-form-item label='所属栏目' label-width="100px">
        <el-select v-model='info.categories' placeholder="请选择所属栏目" multiple>
          <el-option
          v-for="item in categories"
          :key="item._id"
          :label='item.name'
          :value='item._id'
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='标题' label-width="100px">
        <el-input v-model='info.title'></el-input>
      </el-form-item>
      <el-form-item label='内容'>
         <vue-editor v-model="info.body"
         useCustomImageHandler
         @imageAdded='handleImageAdded'
         ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  props:{
    id:{},
  },
  components:{
    VueEditor
  },
  data(){
    return{
      categories:[],
      info:{}
    }
  },
  methods:{
    async save(){
      let res;
      if(this.id){
        res= await this.$http.put(`rest/articles/${this.id}`,this.info)
      }else{
       res = await this.$http.post('rest/articles',this.info)
      }
      
      this.$router.push('/articles/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },

    async fetch(){
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.info=res.data
    },

    async fetchCategories(){
      const res = await this.$http.get('rest/categories')
      this.categories=res.data
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
 
      const formData = new FormData();
      formData.append("file", file);

      const res= await this.$http.post('upload',formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },

  created(){
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>

