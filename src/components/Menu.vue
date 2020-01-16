<template>
  <el-menu unique-opened class="h-full" router :default-active="activeRoute">
    <el-submenu :index="String(i)" :key="i" v-for="(item, i) in convertedMenus">
      <template slot="title">
        <!-- <Icon class="mr-2" :name="item.icon" size="20" color="#5ba0ff" /> -->
        <span slot="title">
          {{ item.title }}
        </span>
      </template>
      <el-menu-item
        :route="module.fullPath"
        :key="module.fullPath"
        :index="module.fullPath"
        v-for="module in item.children"
        :class="[{ 'active-menu': activeRoute === module.fullPath }]"
      >
        <span>{{ module.title }}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
// import Icon from './Icon'
export default {
  props: ['menus'],
  components: {
    // Icon,
  },

  computed: {
    activeRoute() {
      var matchPath, exactPath
      for (let menu of this.convertedMenus.flatMap(item => item.children)) {
        if (this.$route.path === menu.fullPath) {
          exactPath = menu.fullPath
        } else if (this.$route.path.startsWith(menu.fullPath)) {
          matchPath = menu.fullPath
        }
      }
      if (exactPath) {
        return exactPath
      }
      if (matchPath) {
        return matchPath
      }

      return null
    },
    convertedMenus() {
      return this.menus.map(item => ({
        ...item,
        children: item.children
          .filter(module => module.title)
          .map(module => {
            var path
            if (!module.path) {
              path = ''
            } else if (module.path[0] == '/') {
              path = module.path
            } else {
              path = `/${module.path}`
            }

            return {
              ...module,
              fullPath: item.path + path,
            }
          }),
      }))
    },
  },
}
</script>

<style lang="scss" scoped>
.active-menu {
  background-color: #ebf5ff;
  @apply border-blue-600 border-r-4;
}
</style>
