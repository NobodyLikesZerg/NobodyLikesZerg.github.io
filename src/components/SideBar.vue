<template>
  <vs-sidebar
    class="app-sidebar"
    parent="body"
    position-right
    hidden-background
    default-index="1"
    color="primary"
    spacer
    v-model="active"
  >
    <slot />
  </vs-sidebar>
</template>

<script>
export default {
  data() {
    return {
      active: true
    };
  }
};
</script>

<style lang="stylus">
.app-sidebar {
  .vs-sidebar {
    max-width: 600px;
  }
}
</style>

