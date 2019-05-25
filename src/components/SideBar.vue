<template functional>
  <vs-sidebar
    class="app-sidebar"
    parent="body"
    position-right
    hidden-background
    default-index="1"
    color="primary"
    spacer
    :value="props.value"
  >
    <slot />
  </vs-sidebar>
</template>

<style lang="stylus">
.app-sidebar {
  .vs-sidebar {
    max-width: 600px;
    overflow-y: scroll;
  }
}
</style>

