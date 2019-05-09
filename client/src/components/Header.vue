<template>
  <div class="headerNav">
    <div class="title">
      <img src="../assets/img/logo.png" alt>
      <h1>在线后台管理系统</h1>
    </div>
    <div class="person">
      <img :src="mesGet.avatar" alt>
      <div class="my">
        <p>欢迎</p>
        <p class="name">{{mesGet.name}}</p>
      </div>
      <div class="down" @mouseenter='show=true' @mouseleave="show=false">
          <i class="el-icon-arrow-down"></i>
          <ul v-if="show">
              <i class="el-icon-caret-top"></i>
              <li @click='go("person")'>个人信息</li>
              <li @click='go("login")'>退出</li>
          </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headerNav {
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: #2b374d;
  padding: 0 50px;
  border-bottom:1px solid #1B2739;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .title {
    img {
      display: inline-block;
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }
    h1 {
      display: inline-block;
      font-size: 20px;
      color: #fff;
      line-height: 70px;
      margin-left: 10px;
    }
  }
  .person {
    img {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .my {
      display: inline-block;
      margin: 0 10px;
      font-size: 14px;
      padding-top: 15px;
      height: 70px;
      box-sizing: border-box;
      vertical-align: middle;
      p {
        height: 25px;
        &.name {
          color: #3d90ff;
        }
      }
    }
    .down{
        position: relative;
        display: inline-block;
        width: 20px;
        height: 70px;
        line-height:70px;
        i{
            color: #fff;
            cursor: pointer;
        }
        ul{
            position: absolute;
            z-index: 10;
            top:72px;
            right: 0;
            width: 100px;
            padding:10px 0;
            background-color: #fff;
            border-radius: 5px;
            color:#555F71;
            font-size: 14px;
            i{
                position: absolute;
                top:-8px;
                right:10px;
            }
            li{
                padding:0 20px;                
                line-height: 35px;
                cursor: pointer;
                user-select: none;
                &:hover{
                    color:#6BA6EF;
                    background-color: #EAF2FE;
                }
            }
        }
    }
  }
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "headerNav",
  data(){
      return{
          show:false,
      }
  },
  methods:{
      go(val){
          if(val == 'login'){
            this.$router.push('/login');
            localStorage.removeItem('eleToken');
          }else{
            this.$router.push(`/index/${val}`);
          }
      }
  },
  computed: {
    ...mapGetters(["mesGet"])
  }
};
</script>
