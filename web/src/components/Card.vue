<template>
    <div class="card p-3 bg-white  mt-3">
      <div class="card-header d-flex ai-center pb-3">
          <i class="iconfont"  :class="`${icon}`"></i>
          <div class="fs-xl flex-1 px-2">{{title}}</div>
          <i class="iconfont icon-menu"></i>
      </div>
      <div class="card-body pt-3">
          <slot></slot>
      </div>
   </div>
</template>

<script>
export default {
   props:{
      title:{type:String,required:true},
      icon:{type:String,required:true},
   }
}
</script>

<style lang='scss'>
.card{
   border-bottom: 1px solid #d4d9de;
   .card-header{
      border-bottom: 1px solid #d4d9de;
   }
}
</style>