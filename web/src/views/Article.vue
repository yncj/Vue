<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
        <i class="iconfont icon-back"></i>
        <strong class="flex-1 text-blue fs-xs pr-2">{{model.title}}</strong>
        <div class="text-grey fs-xs">
          2019-06-18
        </div>
    </div>
    <div v-html="model.body" class="px-3 article-body"></div>
    <div class="p-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu"></i>
        <strong class="text-blue ml-2 fs-lg">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link 
        class="py-2 "
        :to='`/article/${item._id}`'
        tag='div'
         v-for="(item,i) in model.related" :key='i'>
         {{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    id:{required:true}
  },
  data(){
    return{
      model:null,
    }
  },

  //监听ID变化后重新执行fetch方法，重新渲染文章页面
  watch:{
    id(){
      this.fetch()
    }
  },

  methods:{
    async fetch(){
      const res=await this.$http(`articles/${this.id}`)
      this.model=res.data
    }
  },

  created(){
    this.fetch()
  }
}
</script>>

<style lang='scss'>
.page-article{
  .article-body{
    img{
      max-width: 100%;
      height: auto;
    }
    iframe{
      width: 100%;
      height: auto;
    }
  }
}
</style>
