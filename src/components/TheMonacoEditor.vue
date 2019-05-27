<template>
  <v-card>
    <monaco-editor
      ref="editor"
      v-model="code"
      language="javascript"
      class="editor"
      :theme="theme"
    />
    <v-card-actions>
      <v-select
        v-model="theme"
        :items="themeList"
        label="Select a Theme"
        @change="setTheme()"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
  import MonacoEditor from 'vue-monaco'
  import { parseTmTheme } from 'monaco-themes'
  import themelist from 'monaco-themes/themes/themelist.json'
  export default {
    name: 'TheMonacoEditor',
    components: {
      'monaco-editor': MonacoEditor
    },
    data: () => ({
      code: 'const x = 17',
      editor: null,
      theme: 'Monokai',
      themeList: []
    }),
    mounted () {
      this.editor = this.$refs.editor.getMonaco()
      Object.keys(themelist).forEach(function(k) {
        this.themeList.push(themelist[k])
      }.bind(this))
    },
    methods: {
      setTheme () {
        import(`monaco-themes/themes/${this.theme}.json`).then(
          function(data) {
            window.monaco.editor.defineTheme('thetheme', data)
            window.monaco.editor.setTheme('thetheme')
          }
        )
      }
    }
  }
</script>

<style>
.editor {
  height: 100%;
}
</style>
