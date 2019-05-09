<template>
  <div class="home">
      <div class="box">
            <h2>活到老，花到老，记到老</h2>
        </div>
  </div>
</template>

<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100%;
        background: url('../assets/img/showcase.png') no-repeat center center;
        background-size: 100% 100%;
        .box{
            height: 100%;
            background-color:#000 ;
            opacity: .5;
            position: relative;
            h2{
                font-size: 30px;
                color:#fff;
                position:absolute;
                top:50%;
                left:50%;
                transform: translate(-50%,-50%);
            }
        }
    }
</style>

<script>
export default {
  name: "home"
};
</script>
