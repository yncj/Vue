<template>
  <div class="about">
    <h1>{{id? '编辑':'创建'}}分类</h1>
    <el-form @submit.native.prevent="save" >
      <el-form-item label='上级栏目' label-width="100px">
        <el-select v-model='info.parent' placeholder="请选择父级栏目">
          <el-option
          v-for="item in parents"
          :key="item._id"
          :label='item.name'
          :value='item._id'
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='栏目' label-width="100px">
        <el-input v-model='info.name'></el-input>
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
      parents:[],
      info:{}
    }
  },
  methods:{
    async save(){
      let res;
      if(this.id){
        res= await this.$http.put(`rest/categories/${this.id}`,this.info)
      }else{
       res = await this.$http.post('rest/categories',this.info)
      }
      
      this.$router.push('/categories/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },

    async fetch(){
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.info=res.data
    },

    async fetchParents(){
      const res = await this.$http.get('rest/categories')
      this.parents=res.data
    }
  },

  created(){
    this.fetchParents()
    this.id && this.fetch()
  }
}
</script>

