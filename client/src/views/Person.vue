<template>
    <div class="person">
        <div class="pic">
            <img :src="mesGet.avatar" alt="">
        </div>
        <div class="mes">
            <div>
                <p><i class="el-icon-s-check"></i>{{mesGet.name}}</p>
                <p><i class="el-icon-s-tools"></i>{{mesGet.identity=="manage"?'管理员':'员工'}}</p>
            </div>
            
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .person{
        height: 100%;
        display: flex;
        .mes,.pic{
            display: flex;
            align-items: center;
        }

        .pic{
            flex:1;
            height: 100%;
            justify-content: flex-end;
            padding-right:20px;
            img{
                display: block;
                width: 150px;
                height: 150px;
                border-radius: 50%;
            }
        }
        .mes{
            flex:2;
            height: 100%;
            justify-content: flex-start;
            padding-left:20px;
            color:#2D2D2D;
            font-size: 26px;
            background-color: #EBEBEB;
        }
    }
</style>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "person",
  computed:{
      ...mapGetters(["mesGet"])
  }
};
</script>