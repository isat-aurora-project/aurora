<template>
  <div id='editor' class='plot' />
</template>

<script>
  // import the monaco editor package
  import * as monaco from 'monaco-editor'
  const Linter = require('eslint4b/dist/linter')
  const { indent, quotes, semi } = require('eslint4b/dist/core-rules')
  const linter = new Linter()
  linter.defineRule('indent', indent)
  linter.defineRule('quotes', quotes)
  linter.defineRule('semi', semi)
  export default {
    name: 'TheCodeEditor',
    props: {
      code: {
        type: String,
        default: ''
      },
      language: {
        type: String,
        default: 'javascript'
      }
    },
    data: () => ({
      monaco: null
    }),
    mounted () {
      // assign monaco-editor to a local variable
      this.monaco = monaco
      // configure monaco to NOT use default syntax/semantic validation
      this.monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true
      })
      // add in code to make our editor use ESLint (actually eslint4b)

      // create and set this.options to correct values

      // AFTER you've done all of your configuration...
      // create the editor
      this.editor = monaco.editor.create(this.$el, {
        value: this.code,
        language: 'javascript',
        ...this.options
      })
      this.editor.onDidChangeModelContent(() => {
        if (this.$emit) {
          const content = this.editor.getValue()
          this.$emit('input', content)
        }
      })
    }
  }

</script>

<style>
</style>
