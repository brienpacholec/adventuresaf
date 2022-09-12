<template>
  <div class="post-navigation">
    <v-navigation-drawer
      left
      permanent
      expand-on-hover
      app
      class="sticky-from-top"
      color="primary"
    >

      <v-list dense>
        <post-navigation-filter
          class="no-min-height"
          v-for="tag, key in tags"
          :key="key"
          :name="key"
          :count="tag.count"
          :color="tag.color"
          :icon="tag.icon"
          :type="'tags'"
          :active="isActive(key) ? true : false"
          @filterClicked="handleFilterClicked"
        ></post-navigation-filter>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <post-navigation-filter
          class="no-min-height"
          v-for="location, key in locations"
          :key="key"
          :name="key"
          :count="location.count"
          :type="'locations'"
          :active="isActive(key) ? true : false"
          @filterClicked="handleFilterClicked"
        ></post-navigation-filter>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import PostNavigationFilter from './PostNavigationFilter.vue'
export default {
  name: 'PostNavigation',
  components: {
    PostNavigationFilter
  },
  props: {
    tags: {
      type: Object,
      default: null
    },
    locations: {
      type: Object,
      default: null
    },
    currentActiveFilters: {
      type: Object,
      default: null
    }
  },
  data(){
    return {
      activeFilters: {
        tags: [],
        locations: []
      }
    }
  },
  methods: {
    handleFilterClicked(key, type, status){
      if(!status){
        this.activeFilters[type].push(key)
      } else {
        this.activeFilters[type].splice(this.activeFilters[type].indexOf(key), 1)
      }
      this.$emit('filtersUpdated', this.activeFilters)
    },
    isActive(key){
      return this.activeFilters.tags.indexOf(key) !== -1 || this.activeFilters.locations.indexOf(key) !== -1
    }
  }
}
</script>

<style lang="scss">
.post-navigation {
    height: 100%;
    position: -webkit-sticky;
    position: sticky;
    width: -webkit-fill-available;
    z-index: 10000;

    .sticky-from-top {
      position: fixed;
      top: 100px !important;
      height: 100%;
    }

    .v-btn__content {
      display: flex !important;
      justify-content: space-between !important;
    }
}

</style>