<template>
  <v-app>
    <navbar></navbar>
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

import Navbar from '~/layouts/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
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
        transition: opacity 1s ease-in-out;
    }

    .fade-enter,
    .fade-leave {
        opacity: 0;
    }

</style>