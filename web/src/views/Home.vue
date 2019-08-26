<template>
  <div class="home">
   <swiper :options="swiperOption" >
      <swiper-slide>
        <img src="../assets/images/d0d82f2c7b4e0d6e4006187a87af2601.jpeg" alt="" class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/d0d82f2c7b4e0d6e4006187a87af2601.jpeg" alt="" class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/d0d82f2c7b4e0d6e4006187a87af2601.jpeg" alt="" class="w-100">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
   </swiper>
   <!-- end of swiper -->

   <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey" >
     <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
   </div>
   <!-- end of nav-icon -->

   <m-list-card icon='icon-cc-menu-circle' title='新闻资讯' :categories='newsCats'>
     <template #items="{category}">
       <router-link 
       tag='div'
       :to="`/article/${item._id}`"
       class="py-2 fs-lg d-flex" 
       v-for="(item,i) in category.newsList" :key='i'>
          <span class="text-info">[{{item.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{item.title}}</span>
          <span class="text-grey-1 fs-sm">{{item.createdAt |date}}</span>
       </router-link>
     </template>
   </m-list-card>
    <!-- end of news -->

   <m-list-card icon='icon-big-hero' title='英雄列表' :categories='heroesCats'>
     <template #items="{category}">
       <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link tag='div' class="p-2 text-center "
          :to='`/heroes/${item._id}`'
          style="width:20%"
           v-for=" (item,i) in category.heroList" :key="i">
            <img class="w-100" :src="item.avator" alt="">
            <div class="">{{item.name}}</div>
          </router-link>
       </div>
     </template>
   </m-list-card>
    <!--end of heroes-->

    <m-list-card icon='icon-cc-menu-circle' title='新闻资讯' :categories='newsCats'>
     <template #items="{category}">
       <div class="py-2 fs-lg d-flex" v-for="(item,i) in category.newsList" :key='i'>
          <span class="text-info">[{{item.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{item.title}}</span>
          <span class="text-grey-1 fs-sm">{{item.createdAt |date}}</span>
       </div>
     </template>
   </m-list-card>
          
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data(){
    return{
       swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
        },
        icon:"",
        title:'',
        newsCats:[],
        heroesCats:[]
    }
  },
  methods:{
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats=res.data;
    },

    async fetchHeroesCats(){
      const res = await this.$http.get('heroes/list')
      this.heroesCats=res.data;
    }
  },

  created(){
    this.fetchNewsCats()
    this.fetchHeroesCats()
  },
}
</script>

<style lang='scss'>
.pagination-home{
  .swiper-pagination-bullet{
    opacity: 1;
    background: #fff;
    border-radius: 0.2308rem;
    &.swiper-pagination-bullet-active{
      background: #4b67af; 
    }
  }
}
.nav-icons{
  border-top: 1px solid  #d4d9de;
  border-bottom: 1px solid  #d4d9de;
  .nav-item{
    width: 25%;
    border-right: 1px solid #d4d9de;
    &:nth-child(4n){
      border-right: none;
    }
  }
}
</style>
