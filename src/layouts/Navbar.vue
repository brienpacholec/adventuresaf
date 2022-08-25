<template>
  <div class="navbar">
    <nav class="raleway">
      <v-toolbar
        color="secondary"
        :elevate-on-scroll="true"
        :hide-on-scroll="false"
        class="d-flex justify-sm-center justify-start align-center"
        :height="100"
      >
        <div
          v-if="showNavigationDrawer"
          class="d-sm-none d-flex"
        >
          <v-app-bar-nav-icon
            color="white"
            @click="toggle"
          ></v-app-bar-nav-icon>
        </div>

        <v-toolbar-items
          class="d-sm-flex shrink"
          :class="{'d-none': showNavigationDrawer}"
        >
          <v-btn
            v-for="item in items"
            :to="item.path"
            v-bind:key="item.title"
            text
            color="white"
          >
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-navigation-drawer
        v-if="showNavigationDrawer"
        absolute
        temporary
        v-model="collapse"
        :mini-variant.sync="mini"
        class="d-sm-none d-flex navigation-drawer"
      >
        <v-list-item>
          <v-list-item-avatar>
            <g-image src="~/assets/imgs/logo.png"></g-image>
          </v-list-item-avatar>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :href="item.path"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  props: {
    hideNavigationDrawer: {
      default: false,
      type: Boolean
    },
  },
  data() {
    return {
      collapse: false,
      items: [
        { title: 'Home', icon: 'fa-home', path: '/' },
        { title: 'Adventures', icon: 'fa-user-astronaut', path: '/adventures' },
        { title: 'Posts', icon: 'fa-newspaper', path: '/posts' },
        { title: 'Photos', icon: 'fa-envelope', path: '/Photos' }
      ],
      mini: false
    }
  },
  computed: {
    showNavigationDrawer(){
      return !this.hideNavigationDrawer
    }
  },
  methods: {
    toggle() {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  left:0;
  right: 0;
  width: 100%;
  z-index: 9999;
  .shrink {
    height: 40px;
  }
}

</style>
