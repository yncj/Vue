<template>
  <div class="about">
    <h1>{{id? '编辑':'创建'}}英雄</h1>
    <el-form @submit.native.prevent="save" >
      <el-tabs value='basic' type='border-card'>
        <el-tab-pane label='基本信息' name='basic'>
          <el-form-item label='名称' >
            <el-input v-model='info.name'></el-input>
          </el-form-item>
          <el-form-item label='称号' >
            <el-input v-model='info.title'></el-input>
          </el-form-item>
          <el-form-item label='类型'>
            <el-select v-model='info.categories' multiple>
              <el-option
              v-for="item in categories" :key='item._id'
              :label='item.name' :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='头像' >
            <el-upload
              class="avator-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="info.avator" :src="info.avator" class="avator">
              <i v-else class="el-icon-plus avator-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label='背景图片' style="min-width=3rem">
                <el-upload
                class="avator-uploader"
                :action="uploadUrl"
                :header='getAuthHeaders'
                :show-file-list='false'
                :on-success="res => $set(info,'banner',res.url)"
                >
                <img :src="info.banner" v-if='info.banner' class="avator">
                <i v-else class="el-icon-plus avator-uploader-icon"></i>
                </el-upload>
          </el-form-item>
          <el-form-item label='难度' >
            <el-rate :max=10 show-score style='margin-top="20px"' v-model='info.scores.difficult'></el-rate>
          </el-form-item>
          <el-form-item label='技能' >
            <el-rate :max=10 show-score style='margin-top="20px"' v-model='info.scores.skills'></el-rate>
          </el-form-item>
          <el-form-item label='攻击' >
            <el-rate :max=10 show-score style='margin-top="20px"' v-model='info.scores.attack'></el-rate>
          </el-form-item>
          <el-form-item label='生存' >
            <el-rate :max=10 show-score style='margin-top="20px"' v-model='info.scores.survive'></el-rate>
          </el-form-item>
          <el-form-item label='顺风出装'>
            <el-select v-model='info.items1' multiple>
              <el-option
              v-for="item in items" :key='item._id'
              :label='item.name' :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='逆风出装'>
            <el-select v-model='info.items2' multiple>
              <el-option
              v-for="item in items" :key='item._id'
              :label='item.name' :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='使用技巧'>
            <el-input type='textarea' v-model="info.usageTips"></el-input>
          </el-form-item>
          <el-form-item label='对抗技巧'>
            <el-input type='textarea' v-model="info.battleTips"></el-input>
          </el-form-item>
          <el-form-item label='团战思路'>
            <el-input type='textarea' v-model="info.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label='技能' name='skills'>
          <el-button @click='info.skills.push({})'><i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type='flex' style="flex-wrap:wrap">
            <el-col :md='12' v-for="(item,i) in info.skills" :key='item.i'>
              <el-form-item label='名称'>
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label='图标' style="min-width=3rem">
                <el-upload
                class="avator-uploader"
                :action="uploadUrl"
                :header='getAuthHeaders'
                :show-file-list='false'
                :on-success="res => $set(item,'icon',res.url)"
                >
                <img :src="item.icon" v-if='item.icon' class="avator">
                <i v-else class="el-icon-plus avator-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              
              <el-form-item label='技能描述'>
                <el-input type='textarea' v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label='小提示'>
                <el-input type='textarea' v-model="item.tips"></el-input>
              </el-form-item>
              <el-button type="danger" size="small" @click='info.skills.splice(i,1)'>删除</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem;">
        <el-button type="primary" native-type='submit' style="margin-left:2rem">保存</el-button>
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
      categories:'',
      items:[],
      info:{
        avator:'',
        banner:"",
        items1:[],
        items2:[],
        title:'',
        scores:{
          difficult:0,
        },
        skills:[{
          name:'',
          icon:'',
          description:"",
          tips:""
        }],
      }
    }
  },
  methods:{
    async save(){
      let res
      if(this.id){
        res= await this.$http.put(`rest/heroes/${this.id}`,this.info)
      }else{
       res = await this.$http.post('rest/heroes',this.info)
      }
      
      this.$router.push('/heroes/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },

    async fetch(){
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      this.info=Object.assign({},this.info,res.data)
    },

    async fetchCategories(){
      const res = await this.$http.get(`rest/categories`)
      this.categories=res.data
    },

    async fetchItems(){
      const res = await this.$http.get(`rest/items`)
      this.items=res.data
    },

    afterUpload(res){
      this.info.avator=res.url
    },

  },

  created(){
    this.fetchItems()
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>

<style >
 .avator-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avator-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avator-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avator {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>

