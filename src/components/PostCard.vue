<template>
  <div class="post-card">
    <v-container>
      <v-row
        class="fill-height"
        align-content="center"
      >
        <template>
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="250"
              :src="thumbnail"
            ></v-img>

            <v-card-title>
              {{title}}
            </v-card-title>

            <v-card-text>
              <div class="mt-n5 d-flex flex-column">
                <span>{{subtitle}}</span>
                <span>Written by: {{author}}</span>
              </div>
            </v-card-text>
            <v-card-actions class="mt-n5">
              <v-btn
                color="primary"
                text
              >
                Read more
              </v-btn>
            </v-card-actions>

            <v-divider class="mx-4"></v-divider>

            <v-chip
              v-for="tag, index in mapped_tags"
              v-bind:key="index"
              class="ma-2"
              :color="tag['color']"
              text-color="white"
            >
              <v-avatar left>
                <v-icon>{{tag['icon']}}</v-icon>
              </v-avatar>
              {{tag['name']}}
            </v-chip>

          </v-card>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import tag_map from '~/constants/tag_map'

export default {
  name: 'PostCard',
  props: {
    author: {
      type: String,
      default: null
    },
    date: {
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
    mapped_tags(){
      var mapped_tags = []
      this.tags.map(tag => {
        mapped_tags.push({
          'name': tag,
          'color': tag_map[tag]['color'],
          'icon': tag_map[tag]['icon']
        })
      })
      return mapped_tags
    },
    loading (){
      //TODO
      return false
    }
  }
}
</script>
