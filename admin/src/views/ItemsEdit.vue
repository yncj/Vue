<template>
  <div class="about">
    <h1>{{id? '编辑':'创建'}}物品</h1>
    <el-form @submit.native.prevent="save" >
      <el-form-item label='名称' label-width="100px">
        <el-input v-model='info.name'></el-input>
      </el-form-item>
      <el-form-item label='图标' label-width="100px">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers='getAuthHeaders()'
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="info.icon" :src="info.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    id:{},
  },
  data(){
    return{
      info:{
        icon:'',
      }
    }
  },
  methods:{
    async save(){
      let res
      if(this.id){
        res= await this.$http.put(`rest/items/${this.id}`,this.info)
      }else{
       res = await this.$http.post('rest/items',this.info)
      }
      
      this.$router.push('/items/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },

    async fetch(){
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.info=res.data
    },

    afterUpload(res){
      this.info.icon=res.url
    }

  },

  created(){
    this.id && this.fetch()
  }
}
</script>
