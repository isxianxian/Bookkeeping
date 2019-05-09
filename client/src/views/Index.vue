<template>
    <div class="index">
        <div class="top">
            <HeaderNav></HeaderNav>
        </div>
        <div class="main">
            <LeftNav></LeftNav>
            <div class="box">
                <router-view>这是主要界面</router-view>
            </div>
        </div>
        <div class="mesBox">

        </div>
    </div>
</template>

<style lang="scss" scoped>
    .index{
        width: 100%;
        height: 100%;
        background-color: #fff;
        // 最小宽度
        .top{
            width: 100%;
            height: 70px;
            
        }

        .main{
            width: 100%;
            height: calc(100% - 70px);
            // 需要有一个最小高度
            .leftNav{
                float: left;
                width: 180px;
                height: 100%;
            }
            .box{
                float: left;
                width:calc(100% - 180px);
                height: 100%;
                // min-width: 500px;
                // .box需要有一个最小宽度
            }
        }
        // .mesBox{
        //     width: 100%;
        //     height: 100%;
        //     background-color: purple;
        //     position: fixed;
        // }
    }
</style>

<script>
    import HeaderNav from '../components/Header.vue';
    import LeftNav from '../components/LeftNav.vue';

    export default {
        name:'index',
        components:{
            HeaderNav,
            LeftNav
        }
    }
</script>
