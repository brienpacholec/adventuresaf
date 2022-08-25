<template>
  <v-container fill-height class="d-flex">
    <slot />
  </v-container>
</template>

<script>

export default {
  computed: {
    isHome() {
      return this.$route.path === '/'
    },
  },
}
</script>

<style></style>
