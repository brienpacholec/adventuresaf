<template>
  <v-list-item
    link
    @click="handleFilterClicked(name)"
    :ripple="false"
  >
    <v-list-item-icon class="mr-2" >
      <v-icon :color="active && color ? color : null">{{icon}}</v-icon>
    </v-list-item-icon>
    <v-list-item-content class="pa-0 ma-0">
      <div v-text="name" :color="color"></div>
    </v-list-item-content>
    <v-list-item-action class="pa-0 ma-0">
      <v-icon v-if="active">
        mdi-close
      </v-icon>
      <v-chip v-else small>
        {{count}}
      </v-chip>
    </v-list-item-action>
  </v-list-item>
</template>

<script>

export default {
  name: 'PostNavigationFilter',
  props: {
    name: {
      type: String,
      default: null
    },
    count: {
      type: Number,
      default: null
    },
    color: {
      type: String,
      default: 'black'
    },
    icon: {
      type: String,
      default: 'mdi-map-marker'
    },
    type: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleFilterClicked(key){
      this.$emit('filterClicked', key, this.type, this.active)
    }
  }
}
</script>

<style lang="scss">
.v-btn__content {
    display: flex !important;
    justify-content: space-between !important;
}
</style>