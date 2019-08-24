<template>
  <section class="layout_header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">Posts</el-menu-item>
      <el-menu-item index="2">Users</el-menu-item>
    </el-menu>

    <section class="logout_warp" @click="logout">
      <i class="el-icon-switch-button" title="logout" />
    </section>
  </section>
</template>

<script>
import { logout } from '@models/user'
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      let config = {
        1: 'posts',
        2: 'users'
      }
      console.log('key', key)
      this.$router.push({
        name: config[key]
      })
    },
    logout () {
      logout().then(({ retCode, retData, retMsg }) => {
        if (retCode !== this.$api_code.SUCCESS) {
          this.$message.success(retMsg)
          return false
        }
        this.$message.success(retMsg)
        this.$router.push({
          name: 'login'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout_header {
   position: relative;
  .logout_warp {
      position: absolute;
      top:0px;
      right: 0;

    padding: 20px;
    padding-bottom: 0;
    font-size: 22px;
  }
}
</style>
