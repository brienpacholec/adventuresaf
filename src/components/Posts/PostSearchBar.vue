<template>
  <div>
    <multi-select
      :options="searchable"
      :selected-options="items"
      hide-selected-options
      placeholder="Search Posts"
      @select="onSelect">
    </multi-select>
  </div>
</template>

<script>
import { MultiSelect } from 'vue-search-select'

export default {
  name: 'PostSearchBar',
  components: {
    MultiSelect
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
    activeFilters: {
      type: Object,
      default: null
    }
  },
  computed: {
    searchable() {
      var options = []
      Object.keys(this.tags).forEach(tag => {
        options.push({
          value: tag,
          text: tag,
          type: 'tags'
        })
      })
      Object.keys(this.locations).forEach(location => {
        options.push({
          value: location,
          text: location,
          type: 'locations'
        })
      })
      return options
    }
  },
  data () {
    return {
      searchText: '', // If value is falsy, reset searchText & searchItem
      items: [],
      lastSelectItem: {}
    }
  },
  watch: {
    activeFilters: {
      immediate: true,
      handler(newVal){
        var to_remove = []
        this.items.map(currentlySelected => {
          var foundInCurrentTags = newVal['tags'].includes(currentlySelected.text)
          var foundInCurrentLocations = newVal['locations'].includes(currentlySelected.text)
          if(!foundInCurrentTags && !foundInCurrentLocations){
            to_remove.push(currentlySelected)
          }
        })
        to_remove.map(remove => {
          this.items.splice(this.items.indexOf(remove), 1)
        })
      },
      deep: true
    }
  },
  methods: {
    onSelect (items, lastSelectItem) {
      this.items = items
      this.lastSelectItem = lastSelectItem
      this.$emit('searchUpdated', this.items)
    },
    // deselect option
    reset () {
      this.items = [] // reset
    },
    // select option from parent component
    selectFromParentComponent () {
      this.items = _.unionWith(this.items, [this.options[0]], _.isEqual)
    }
  },

}
</script>

<style lang="scss">
</style>