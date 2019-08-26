<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <div class="icon-logo"></div>
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="text-white ml-2 ">攻略站</span>
      </div>
      <router-link tag='div' to='/' class="text-white">更多英雄 &gt;</router-link>
    </div>
    <div class="body-content" :style="{'background-image':`url(${model.banner})`}">
      <div class="hero_info text-white p-3 d-flex flex-column jc-end h-100">
        <div class="pb-2">{{model.title}}</div>
        <div class="fs-xl" style="font-weight:bold">{{model.name}}</div>
        <div class="py-1">{{model.categories.map(item=>item.name).join('/')}}</div>
        <div class="d-flex jc-between" >
          <div class="scores" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.attack}}</span>

            <span>技能</span>
            <span class="badge bg-info">{{model.scores.difficult}}</span>

            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.skills}}</span>

            <span>生存</span>
            <span class="badge bg-dark-1">{{model.scores.survive}}</span>
          </div>
          <router-link tag='div' to='/'>皮肤：2 &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div>
      <div class="px-2 bg-white">
        <div class="nav d-flex pt-3 pb-2 jc-around border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex jc-around">
                <router-link tag='button' to='/' class="btn btn-lg flex-1">
                  <i class="iconfont icon-cc-menu-circle"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag='button' to='/' class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-cc-menu-circle"></i>
                  一图识别英雄
                </router-link>
              </div>

              <!-- skills -->
              <div class="skills bg-white">
                <div class="d-flex jc-around py-3">
                  <img :src="item.icon"
                  v-for="(item,i) in model.skills"
                  :key="i"
                  width="60"
                  height="60"
                  class="icon "
                  :class="{active:currentSkillIndex===i}"
                  @click="currentSkillIndex=i"
                  >
                </div>
                <div v-if="currentSkill">
                  <h3>{{currentSkill.name}}</h3>
                  <p class="border-bottom pb-3 text-dark-1">{{currentSkill.description}}</p>
                  <p class="text-grey-1">小提示：{{currentSkill.tips}}</p>
                </div>
              </div>
              <!-- end of skills -->
            </div>
            <m-card icon='icon-cc-menu-circle' title='出装推荐'>
                <p>顺风出装</p>
                <div class="nav-info d-flex jc-around text-center">
                  <div v-for="(item,i) in model.items1" :key="i">
                    <img :src="item.icon" class="icon">
                    <div>{{item.name}}</div>
                  </div>
                </div>
                <p></p>
                <p>逆风出装</p>
                <div class="nav-info d-flex jc-around text-center">
                  <div v-for="(item,i) in model.items2" :key="i">
                    <img :src="item.icon" class="icon">
                    <div>{{item.name}}</div>
                  </div>
                </div>
            </m-card>
            <m-card icon='icon-cc-menu-circle' title='使用技巧'>
              <p>{{model.usageTips}}</p>
            </m-card>
            <m-card icon='icon-cc-menu-circle' title='对抗技巧'>
              <p>{{model.battleTips}}</p>
            </m-card>
            <m-card icon='icon-cc-menu-circle' title='团战思路'>
              <p>{{model.teamTips}}</p>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
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
      currentSkillIndex:0,
    }
  },

  computed:{
    currentSkill(){
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods:{
    async fetch(){
      const res=await this.$http.get(`heroes/${this.id}`);
      this.model=res.data;
    }
  },

  created(){
    this.fetch()
  }
  
}
</script>

<style lang='scss'>
// @import '../style.scss';

.body-content{
  height: 25vh;
  background: #fff no-repeat top center;
  background-size:100%;
  .hero_info{
    background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
    .scores{
      .badge{
        margin: 0 0.3rem;
        display:inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border:1px solid rgba(255,255,255,0.3);
      }
    }
  }
}

.skills{
  img.icon{
    width: 70px;
    height: 70px;
    border: 3px solid #fff;
    border-radius: 50%;
    &.active{
      border-color:#db9e3f;
    }
  }
}

.nav-info{
  img.icon{
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}
</style>
