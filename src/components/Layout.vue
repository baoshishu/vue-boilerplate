<template>
  <div class="flex flex-col layout">
    <header class="flex header">
      <div class="aside" style="background: #3388ff;">
        <slot name="logo" />
      </div>
      <div style="background: #5ca1ff;" class="flex-grow">
        <slot name="header-nav" />
      </div>
    </header>
    <div class="flex flex-grow">
      <el-aside class="aside">
        <slot name="side-nav" />
      </el-aside>
      <slot name="main" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.aside {
  width: 220px !important;
}
.header {
  height: 55px;
}
.layout {
  min-height: 100vh;
}
</style>
