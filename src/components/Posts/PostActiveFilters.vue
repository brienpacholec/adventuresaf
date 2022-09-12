<template>
  <div>
    <v-chip
      outlined
      :ripple="false"
      v-for="filter in activeFilters['tags']"
      v-bind:key="filter"
      close
      @click:close="chipDismissed(filter, 'tags')"
      :color="getMappedTag(filter, 'color')"
      class="ma-1"
    >
      <v-avatar left>
        <v-icon>{{getMappedTag(filter, 'icon')}}</v-icon>
      </v-avatar>
      {{filter}}
    </v-chip>

    <v-chip
      outlined
      :ripple="false"
      v-for="filter in activeFilters['locations']"
      v-bind:key="filter"
      close
      @click:close="chipDismissed(filter, 'locations')"
    >
      <v-avatar left>
        <v-icon>mdi-map-marker</v-icon>
      </v-avatar>
      {{filter}}
    </v-chip>
  </div>
</template>

<script>

import tag_map from '~/constants/tag_map'

export default {
  name: 'PostActiveFilters',
  props: {
    activeFilters: {
      type: Object,
      default: null
    }
  },
  methods: {
    chipDismissed(filter, type){
      var currentFilters = this.activeFilters
      currentFilters[type].splice(currentFilters[type].indexOf(filter), 1)
      this.$emit('activeChipFilterDismissed', currentFilters)
    },
    getMappedTag(name, field){
      return tag_map[name][field]
    }
  }
}
</script>