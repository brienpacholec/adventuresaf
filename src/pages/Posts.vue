<template>
  <Layout>

    <div v-for="post in this.$page.allPosts.edges" v-bind:key="post.node.id">
      <p>{{post.node.title}}</p>
      <p>{{post.node.subtitle}}</p>
      <p>{{post.node.author}}</p>
      <p>{{post.node.date}}</p>
      <g-image alt="Example image" :src="post.node.thumbnail"  />
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
        }
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
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
