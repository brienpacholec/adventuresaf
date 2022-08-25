<template>
  <div>
    <v-row>

      <v-col cols="3">
        <v-navigation-drawer
          permanent
          left
        >
          <template v-slot:prepend>
            <v-list-item two-line>
              <v-list-item-avatar>
                <g-image src="~/assets/imgs/logo.png"></g-image>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Adventrues AF</v-list-item-title>
                <v-list-item-subtitle>Posts</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-divider></v-divider>

          <!-- {{Object(post_filters.keys())}} -->
          <!-- <div >
            {{key}}
            {{filter}}

          </div> -->

          <v-list dense>
            <v-list-item
              v-for="filter, key in post_filters"
              :key="key"
              class="d-flex justify-space-between"
            >
              <v-list-item-icon>
                <v-icon :color="filter.color">{{ filter.icon }}</v-icon> {{key}}
              </v-list-item-icon>

              <v-chip
                small
              >
                {{filter.count}}
              </v-chip>

            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="9 d-flex flex-wrap">
        <post-card
          v-for="post in this.$page.allPosts.edges" v-bind:key="post.node.id"
          :id="post.node.id"
          :title="post.node.title"
          :subtitle="post.node.subtitle"
          :author="post.node.author"
          :date="post.node.date"
          :thumbnail="post.node.thumbnail"
          :tags="post.node.tags"
          class="mx-10"
        ></post-card>
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
        }
      }
    }
  }
</page-query>

<script>
import PostCard from '~/components/PostCard.vue'
import tag_map from '~/constants/tag_map'

export default {
  components: {
    PostCard
  },
  computed: {
    post_filters(){
      var found_filters = {}
      this.$page.allPosts.edges.map(post => {
        post.node.tags.map(tag => {
          if(found_filters[tag]){
            found_filters[tag].count++
          } else {
            found_filters[tag] = {
              'count': 1,
              'color': tag_map[tag]['color'],
              'icon': tag_map[tag]['icon']
            }
          }
        })
      })
      return found_filters
    }
  }
}
</script>

