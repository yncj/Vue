<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="text-align:center;display:inherit">用户登录</span>
      </div>
      <el-form @submit.native.prevent='login'>
        <el-form-item label='用户名'>
          <el-input v-model="info.userName"></el-input>
        </el-form-item>
        <el-form-item label='密码'>
          <el-input v-model="info.password" type='password'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" native-type='submit'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>>

<script>
export default {
  data(){
    return{
      info:{
        userName:'',
        password:'',
      }
    }
  },

  methods:{
    async login(){
     const res=await this.$http.post('login',this.info)
     localStorage.token=res.data.token
     this.$router.push('/')
     this.$message({
       type:'success',
       message:"登录成功"
     })
    }
  }
}
</script>


<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin: 5rem auto;
  }
</style>