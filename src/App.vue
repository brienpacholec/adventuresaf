<template>
  <v-app>
    <g-link class="nav__link" to="/">Home</g-link>
    <g-link class="nav__link" to="/about/">About</g-link>
    <g-link class="nav__link" to="/posts/">Posts</g-link>
    <transition name="fade">
      <router-view />
    </transition>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$static.metadata.siteDescription
        }
      ]
    }
  }
}
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease-in-out;
    }

    .fade-enter,
    .fade-leave {
        opacity: 0;
    }

</style>