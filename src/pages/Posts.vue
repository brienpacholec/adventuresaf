<template>
  <v-container
    fluid
    class="posts"
  >
    <v-row class="mb-6">
      <v-col cols="12" class="mt-4 py-0 px-4">
        <lead-post
          :author="leadPost.node.author"
          :content="leadPost.node.content"
          :date="leadPost.node.date"
          :location="leadPost.node.location"
          :subtitle="leadPost.node.subtitle"
          :tags="leadPost.node.tags"
          :title="leadPost.node.title"
          :thumbnail="leadPost.node.thumbnail"
        ></lead-post>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">

        <v-row class="justify-center text-center">
          <v-col cols="12" md="6" sm="8">
            <h3>Older Posts</h3>
            <post-search-bar
              :tags="tags"
              :locations="locations"
              :activeFilters="activeFilters"
              @searchUpdated="updateSearchFilters"
            ></post-search-bar>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center mt-0">
          <v-col cols="12" md="6" sm="8">
            <post-active-filters
              :activeFilters="activeFilters"
              @activeChipFilterDismissed="updateFilters"
            >
            </post-active-filters>
          </v-col>
        </v-row>
        <v-responsive content-class="d-inline-flex justify-center flex-wrap">
          <post-card
            v-for="post in activePosts" v-bind:key="post.node.id"
            :id="post.node.id"
            :author="post.node.author"
            :date="post.node.date"
            :location="post.node.location"
            :subtitle="post.node.subtitle"
            :tags="post.node.tags"
            :title="post.node.title"
            :thumbnail="post.node.thumbnail"
          ></post-card>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>

</template>

<page-query>
  query posts{
    allPosts(sortBy: "date", order: DESC){
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
import LeadPost from '~/components/Posts/LeadPost.vue'
import PostActiveFilters from '~/components/Posts/PostActiveFilters.vue'
import PostCard from '~/components/Posts/PostCard.vue'
import PostSearchBar from '~/components/Posts/PostSearchBar.vue'
import tag_map from '~/constants/tag_map'

export default {
  components: {
    LeadPost,
    PostActiveFilters,
    PostCard,
    PostSearchBar
  },
  data: function() {
    return {
      leadPost: null,
      allPosts: null,
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
    this.leadPost = this.$page.allPosts.edges[0]
    this.allPosts = this.$page.allPosts.edges.slice(1)
    this.allPosts.map(post => {
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
    this.activePosts = this.allPosts //init to show all

  },

  methods: {
    async updateFilters(activeFilters){

      this.activeFilters = activeFilters

      this.activePosts = []

      this.allPosts.map(post => {
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

      if(this.activePosts.length === 0){
        this.activePosts = this.allPosts
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
<style lang="scss">
  #posts {
    height: 100%;
  }
</style>

