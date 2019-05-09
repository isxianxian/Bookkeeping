<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  // overflow-x: hidden;
}
</style>

<script>
    import jwt_decode from 'jwt-decode';

export default {
    

  name: "app",
  created() {
    // 当eletoken不存在时，当前页面不变，只是跳转到下一个页面时改变。
    let eleToken = localStorage.getItem('eleToken');
    if(!eleToken) return;
    let mes = jwt_decode(eleToken);
    this.isEmpty(mes)? mes=null:null;
    this.$store.dispatch("isAct", Boolean(mes));
    this.$store.dispatch("mesAct", mes);
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

