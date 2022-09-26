<template>
  <div>
    <!-- <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs> -->
    <v-container>
      <v-responsive>
        <v-card
          max-width="500"
        >
          <v-img
            :src="this.$page.post.thumbnail"
            class="white--text align-end fill-height"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            max-height="600"
          >
          </v-img>
        </v-card>
        <h1>{{this.$page.post.title}}</h1>
        <p>Written by {{this.$page.post.author}}</p>
        <p>{{dateCreated}}</p>
        <div v-html="this.$page.post.content"></div>
      </v-responsive>
    </v-container>
  </div>
</template>

<page-query>
    query Post ($postId: ID!){
      post: posts(id: $postId){
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
</page-query>

<script>
export default {
  name: 'PostTemplate',
  computed: {
    breadcrumbs(){
      return [
        {
          text: 'Posts',
          disabled: false,
          href: '/posts'
        },
        {
          text: this.$page.post.title,
          disabled: true,
          href: null
        }
      ]
    },
    dateCreated(){
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      var date = new Date(this.$page.post.date)
      return date.toLocaleDateString('en-US', options)
    }
  },
  created(){
    console.log(this.$page)
  }
}
</script>