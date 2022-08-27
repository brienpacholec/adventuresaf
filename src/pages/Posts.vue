<template>
  <div>
    <v-row>

      <v-col cols="12" sm="3">
        <post-navigation
          :filters="post_filters"
          @filtersUpdated="updateFilters"
        ></post-navigation>
      </v-col>

      <v-col cols="12" sm="9">
        <v-container>
          <v-row>
            <v-col
              cols="10"
            >
              <v-text-field
                solo
                label="Search"
                append-icon="mdi-map-marker"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <div class="d-flex flex-wrap">
          <post-card
            v-for="post in activePosts" v-bind:key="post.node.id"
            :id="post.node.id"
            :title="post.node.title"
            :subtitle="post.node.subtitle"
            :author="post.node.author"
            :date="post.node.date"
            :thumbnail="post.node.thumbnail"
            :tags="post.node.tags"
            class="mx-10"
          ></post-card>
        </div>
      </v-col>
    </v-row>

  </div>
</template>

<page-query>
  query posts{
    allPosts{
      edges {
        node {
          id
          title
          subtitle
          author
          content
          date
          thumbnail
          tags
          location
        }
      }
    }
  }
</page-query>

<script>
import PostCard from '~/components/PostCard.vue'
import tag_map from '~/constants/tag_map'
import PostNavigation from '~/components/PostNavigation.vue'

export default {
  components: {
    PostCard,
    PostNavigation
  },
  data: function() {
    return {
      activePosts: [],
      locations: [],
      post_filters: {}
    }
  },
  created() {
    this.activePosts = this.$page.allPosts.edges
    this.activePosts.map(post => {
      if (!this.locations.includes(post.node.location)) {
        this.locations.push(post.node.location)
      }

      post.node.tags.map(tag => {
        if(this.post_filters[tag]){
          this.post_filters[tag].count++
        } else {
          this.post_filters[tag] = {
            'count': 1,
            'color': tag_map[tag]['color'],
            'icon': tag_map[tag]['icon']
          }
        }
      })

    })
  },

  methods: {
    updateFilters(activeFilters){

      //TODO - REMOVE any active posts without the current filters
      this.activePosts = []

      this.$page.allPosts.edges.map(post => {
        post.node.tags.map(tag => {
          if (activeFilters.includes(tag) && !this.activePosts.includes(post)){
            this.activePosts.push(post)
          }
        })
      })

      // IF no filters are selected - show all posts
      if(this.activePosts.length === 0){
        this.activePosts = this.$page.allPosts.edges
      }
    }
  }
}
</script>

