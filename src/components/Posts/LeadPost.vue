<template>
  <v-responsive
    max-width="800"
    class="mx-auto"
  >
    <v-row dense>
      <v-col md="8" sm="6" cols="12" class="d-flex align-center">
        <v-card
          class="fill-height"
        >
          <v-img
            :src="thumbnail"
            class="white--text align-end fill-height"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            max-height="400"
          >
          </v-img>
        </v-card>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <v-card
          color="#385F73"
          dark
          class="fill-height d-flex justify-space-around flex-column"
        >
          <div>
            <v-card-title class="text-h5 mb-2">
              {{title}}
            </v-card-title>
            <v-card-subtitle  v-if="textContent">{{textContent}}...</v-card-subtitle>
          </div>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn text>
              Read More
            </v-btn>
            <v-btn
              icon
            >
              <v-icon>mdi-export-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>
  </v-responsive>
</template>

<script>

// import { convert } from 'html-to-text'
// import convert from 'html-to-text'

export default {
  name: 'LeadPost',
  props: {
    author: {
      type: String,
      default: null
    },
    content: {
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
    textContent(){
    //   return JSDOM.fragment(this.content).textContent
      var stringContent = this.content.replace(/<[^>]*>?/gm, '')
      var maxLength = 225
      var trimmedContent = stringContent.substring(0, maxLength)
      return trimmedContent.substr(0, Math.min(trimmedContent.length, trimmedContent.lastIndexOf(' ')))
    }
  }
}
</script>