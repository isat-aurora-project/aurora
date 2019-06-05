<template>
  <v-card class="editor-container">
    <monaco-editor
      v-model="code"
      class="editor"
      :language="lang"
      :theme="theme"
      @change="edited"
    />
  </v-card>
</template>

<script>
  import MonacoEditor from 'vue-monaco'
  export default {
    name: 'TheMonacoEditor',
    components: {
      MonacoEditor
    },
    props: {
      content: {
        type: String,
        default: ''
      },
      lang: {
        type: String,
        default: 'javascript'
      },
      theme: {
        type: String,
        default: 'vs-dark'
      }
    },
    data () {
      return {
        code: this.content,
        language: this.lang
      }
    },
    methods: {
      edited () {
        console.log('edited')
      }
    }
  }
</script>

<style lang="sass">
.editor
  height: calc(80vh - 48px)
</style>
