<template>
  <div class="post-navigation">
    <v-btn
      text
      :color="color"
      width="100%"
      @click="handleButtonClicked(name)"
    >
      <div>
        <v-icon left dark v-if="icon">
          {{icon}}
        </v-icon>
        {{name}}
      </div>

      <v-icon v-if="active">
        mdi-close
      </v-icon>
      <v-chip v-else small>
        {{count}}
      </v-chip>
    </v-btn>

  </div>
</template>

<script>

export default {
  name: 'PostFilterButton',
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
      default: null
    },
    type: {
      type: String,
      default: null
    },
  },
  data(){
    return {
      active: false
    }
  },
  methods: {
    handleButtonClicked(key){
      this.$emit('buttonClicked', key, this.type, this.active)
      this.active = ! this.active
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