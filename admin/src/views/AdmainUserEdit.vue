<template>
  <div class="about">
    <h1>{{id? '编辑':'创建'}}管理员</h1>
    <el-form @submit.native.prevent="save" >
      <el-form-item label='用户名' label-width="100px">
        <el-input v-model="info.userName"></el-input>
      </el-form-item>
      <el-form-item label='密码' label-width="100px">
        <el-input v-model='info.password' type='password'></el-input>
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
      info:{}
    }
  },
  methods:{
    async save(){
      let res;
      if(this.id){
        res= await this.$http.put(`rest/admain_users/${this.id}`,this.info)
      }else{
       res = await this.$http.post('rest/admain_users',this.info)
      }
      
      this.$router.push('/admain_users/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },

    async fetch(){
      const res = await this.$http.get(`rest/admain_users/${this.id}`)
      this.info=res.data
    },

    // async fetchParents(){
    //   const res = await this.$http.get('rest/admain_users')
    //   this.parents=res.data
    // }
  },

  created(){
    this.id && this.fetch()
  }
}
</script>

