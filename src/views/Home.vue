<template>
  <Layout>
    <template slot="logo">
      <div class="logo flex items-center justify-center h-full">
        Admin
      </div>
    </template>
    <template slot="header-nav">
      <div class="flex items-center h-full justify-end px-8">
        <el-button type="text" class="text-white" @click="logout" size="normal"
          >logout</el-button
        >
      </div>
    </template>
    <template slot="side-nav">
      <Menu :menus="menus" />
    </template>
    <template slot="main">
      <el-main class="bg-gray-main">
        <router-view />
      </el-main>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout'
import Menu from '@/components/Menu'
import { MENU_MODULES } from '@/router'
export default {
  name: 'Home',
  components: { Layout, Menu },
  data() {
    return {
      menus: MENU_MODULES,
    }
  },
  computed: {
    userName() {
      return this.$store.state.profile?.name
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 18px;
  font-weight: bold;
  color: white;
}
.text-white {
  color: white !important;
  :hover {
    opacity: 0.8;
  }
}
</style>
