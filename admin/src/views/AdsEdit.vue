<template>
  <div class="about">
    <h1>{{id? '编辑':'创建'}}广告</h1>
    <el-form @submit.native.prevent="save" >
      <el-form-item label='名称' label-width="100px">
        <el-input v-model='info.name'></el-input>
      </el-form-item>
      <el-form-item label='广告' label-width="100px">
        <el-button type='primary' size='small' @click="info.items.push({})"><i class="el-icon-plus
"></i> 添加广告</el-button>
      </el-form-item>
      <el-row type='flex' style='flex-wrap:wrap'> 
        <el-col :md='24' v-for="(item,i) in info.items" :key='item.i'>
          <el-form-item label='广告标题'>
            <el-input v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item label='广告链接'>
            <el-input v-model="item.URL"></el-input>
          </el-form-item>
          <el-form-item label='广告图' >
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="(res)=>$set(item,'image',res.url)">
              <img v-if="item.image" :src="item.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-button type='danger' @click="info.items.splice(i,1)">删除</el-button>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" native-type='submit' style="margin-top:2rem;">保存</el-button>
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
        name:'',
        items:[],
      }
    }
  },
  methods:{
    async save(){
      let res
      if(this.id){
        res= await this.$http.put(`rest/ads/${this.id}`,this.info)
      }else{
       res = await this.$http.post('rest/ads',this.info)
      }
      
      this.$router.push('/ads/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },

    async fetch(){
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.info=Object.assign({},this.info,res.data)
    },

  },

  created(){
    this.id && this.fetch()
  }
}
</script>

<style >

</style>

