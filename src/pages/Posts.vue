<template>
  <v-row>

    <v-col cols="1">
      <post-navigation
        :tags="tags"
        :locations="locations"
        :currentActiveFilters="activeFilters"
        @filtersUpdated="updateFilters"
      ></post-navigation>
    </v-col>

    <v-col cols="10">
      <v-row class="d-flex justify-center mt-3">
        <v-col cols="8">
          <post-search-bar
            :tags="tags"
            :locations="locations"
            :activeFilters="activeFilters"
            @searchUpdated="updateSearchFilters"
          ></post-search-bar>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center mt-0">
        <v-col cols="8">
          <post-active-filters
            :activeFilters="activeFilters"
            @activeChipFilterDismissed="updateFilters"
          >
          </post-active-filters>
        </v-col>
      </v-row>

      <div class="d-flex flex-wrap">
        <post-card
          v-for="post in activePosts" v-bind:key="post.node.id"
          :author="post.node.author"
          :date="post.node.date"
          :location="post.node.location"
          :subtitle="post.node.subtitle"
          :tags="post.node.tags"
          :title="post.node.title"
          :thumbnail="post.node.thumbnail"
        ></post-card>
      </div>
    </v-col>
  </v-row>

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
import tag_map from '~/constants/tag_map'
import PostActiveFilters from '~/components/Posts/PostActiveFilters.vue'
import PostCard from '~/components/Posts/PostCard.vue'
import PostNavigation from '~/components/Posts/PostNavigation.vue'
import PostSearchBar from '~/components/Posts/PostSearchBar.vue'

export default {
  components: {
    PostActiveFilters,
    PostCard,
    PostNavigation,
    PostSearchBar
  },
  data: function() {
    return {
      activePosts: [],
      activeFilters: {
        'tags': [],
        'locations': []
      },
      tags: {},
      locations: {},
      newActiveFilters: null
    }
  },
  created() {
    this.activePosts = this.$page.allPosts.edges
    this.activePosts.map(post => {
      if (this.locations[post.node.location]){
        this.locations[post.node.location].count++
      } else {
        this.locations[post.node.location] = {
          'count': 1
        }
      }
      post.node.tags.map(tag => {
        if(this.tags[tag]){
          this.tags[tag].count++
        } else {
          this.tags[tag] = {
            'count': 1,
            'color': tag_map[tag]['color'],
            'icon': tag_map[tag]['icon']
          }
        }
      })
    })
  },

  methods: {
    async updateFilters(activeFilters){

      this.activeFilters = activeFilters

      //TODO - REMOVE any active posts without the current tags
      this.activePosts = []

      this.$page.allPosts.edges.map(post => {
        // CHECK to see if the location is being filtered - if not then check tags
        if (this.activeFilters.locations.includes(post.node.location)) {
          this.activePosts.push(post)
        } else {
          post.node.tags.map(tag => {
            if (this.activeFilters.tags.includes(tag) && !this.activePosts.includes(post)){
              this.activePosts.push(post)
            }
          })
        }
      })

      // IF no tags are selected - show all posts
      if(this.activePosts.length === 0){
        this.activePosts = this.$page.allPosts.edges
      }

    },
    async updateSearchFilters(e) {
      this.activeFilters['tags'] = []
      this.activeFilters['locations'] = []
      e.map(search_item => {
        this.activeFilters[search_item['type']].push(search_item['value'])
      })
      this.updateFilters(this.activeFilters)
    }
  }
}
</script>

