<template>
  <div class="leftNav">
    <!-- class="el-icon-s-operation" -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#2B374D"
      text-color="#fff"
      active-text-color="#4491F3"
      style="border-right:0;overflow:hidden"
    >
      <router-link to="/index/home">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>资金管理</span>
        </template>
        <router-link to="/index/fund">
          <el-menu-item index="2-1">资金流水</el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-check"></i>
          <span>信息管理</span>
        </template>
        <router-link to="/index/person">
          <el-menu-item index="3-1">个人信息</el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>

    <!-- class='el-icon-s-check' -->

<style lang="scss" scoped>
.leftNav {
  width: 180px;
  height: 100%;
  background-color: #2b374d;
}
</style>

<script>
export default {
  name: "leftNav"
};
</script>
