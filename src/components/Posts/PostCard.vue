<template>
  <v-card
    :loading="loading"
    :class="{'ma-3': $vuetify.breakpoint.smAndDown, 'ma-2': $vuetify.breakpoint.mdAndUp, }"
    :max-width="350"
    elevation="3"

  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      class="white--text align-end"
      height="300"
      :src="thumbnail"
    >
      <v-card-title class="justify-center pa-1 grey-transparent-bg"><b>{{title}}</b></v-card-title>
    </v-img>

    <v-card-text>
      <div class="d-flex flex-column">
        <h3>{{subtitle}}</h3>
        <span>By {{author}}, {{daysAgo}}</span>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-spacer></v-spacer>
    <v-card-actions class="d-flex justify-space-between card-actions">
      <v-btn
        color="primary darken-2"
        text
        :to="postUrl"
      >
        Read more
      </v-btn>
      <v-btn
        color="primary"
        icon
      >
        <v-icon>mdi-export-variant</v-icon>
      </v-btn>
    </v-card-actions>

    <!-- <v-chip
              v-for="tag, index in mappedTags"
              v-bind:key="index"
              class="ma-2"
              small
              :color="tag['color']"
              text-color="white"
            >
              <v-icon>{{tag['icon']}}</v-icon>
            </v-chip> -->

  </v-card>
</template>

<script>

import tag_map from '~/constants/tag_map'

export default {
  name: 'PostCard',
  props: {
    id: {
      type: String,
      default: null
    },
    author: {
      type: String,
      default: null
    },
    date: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    tags: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    thumbnail: {
      type: String,
      default: null
    },
  },
  computed: {
    mappedTags(){
      var mappedTags = []
      this.tags.map(tag => {
        mappedTags.push({
          'name': tag,
          'color': tag_map[tag]['color'],
          'icon': tag_map[tag]['icon']
        })
      })
      return mappedTags
    },
    daysAgo() {
      var days = Math.ceil(Math.abs(new Date() - Date.parse(this.date)) / (1000 * 60 * 60 * 24))
      if(days > 1){
        return days + ' days ago.'
      } else {
        return days + ' day ago.'
      }
    },
    postUrl(){
      return `/posts/${this.id}`
    },
    loading (){
      //TODO
      return false
    }
  }
}
</script>

<style lang="scss">

</style>
