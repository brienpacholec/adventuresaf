<template>
  <div class="post-navigation">
    <v-navigation-drawer
      permanent
      left
    >

      <v-list-item class="no-min-height">
        <v-list-item-content>
          <v-list-item-title class="text-p">
            Filters
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense class="d-flex flex-column">
        <v-list-item
          v-for="filter, key in filters"
          :key="key"
          class="pa-0"

        >
          <post-filter-button
            :name="key"
            :count="filter.count"
            :color="filter.color"
            :icon="filter.icon"
            @buttonClicked="handleButtonClicked"
          ></post-filter-button>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import PostFilterButton from '~/components/PostFilterButton.vue'

export default {
  name: 'PostNavigation',
  components: { PostFilterButton },
  props: {
    filters: {
      type: Object,
      default: null
    },
  },
  data(){
    return {
      activeFilters: []
    }
  },
  methods: {
    handleFilterClicked(key){
      this.$emit('filterClicked', key)
    },
    handleButtonClicked(key, status){
      if(!status){
        this.activeFilters.push(key)
      } else {
        this.activeFilters.splice(this.activeFilters.indexOf(key), 1)
      }
      this.$emit('filtersUpdated', this.activeFilters)
    }
  }
}
</script>

<style>
.post-navigation {
    height: 100%;
    position: -webkit-sticky;
    position: sticky;
        width: -webkit-fill-available;
}

.v-btn__content {
    display: flex !important;
    justify-content: space-between !important;
}

</style>