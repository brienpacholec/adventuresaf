<template>
  <Layout>

    <div v-for="post in this.$page.allPosts.edges" v-bind:key="post.node.id">
      <post-card
        :id="post.node.id"
        :title="post.node.title"
        :subtitle="post.node.subtitle"
        :author="post.node.author"
        :date="post.node.date"
        :thumbnail="post.node.thumbnail"
        :tags="post.node.tags"
      ></post-card>
    </div>

  </Layout>
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
export default {
  components: {
    PostCard
  },
  created(){
    console.log()
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
