<template>
  <Layout>
    <template slot="logo">
      <div class="logo flex items-center justify-center h-full">
        Admin
      </div>
    </template>
    <template slot="header-nav">
      <template v-for="mod in modules">
        <router-link
          class="mx-2"
          active-class="active-module"
          :key="mod.path"
          :to="mod.path"
          >{{ mod.title }}</router-link
        >
      </template>
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
import routes from '@/router/routes'
console.log({ routes })
// export const MENU_MODULES = routes[0].children[0].children
export default {
  name: 'Home',
  components: { Layout, Menu },
  data() {
    return {}
  },
  computed: {
    modules() {
      return routes[0].children
    },
    menus() {
      const activeModule = routes[0].children.find(mod =>
        this.$route.path.startsWith(mod.path)
      )
      return {
        children: activeModule.children,
        module: activeModule,
      }
    },
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
.active-module {
  text-decoration: underline;
}
</style>
