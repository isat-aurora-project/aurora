<template>
  <div id='editor' class='plot' />
</template>

<script>
  // import the monaco editor package
  import * as monaco from 'monaco-editor'
  const Linter = require('eslint4b/dist/linter')
  const { indent, quotes, semi } = require('eslint4b/dist/core-rules')
  

//    try {
//    const markers = linter.verify(
//      code,
//      { /* ESLint config */ }
//    ).map(err => ({
//      startLineNumber: err.line,
//      endLineNumber: err.line,
//      startColumn: err.column,
//      endColumn: err.column,
//      message: `${err.message} (${err.ruleId})`,
//      severity: 3,
//      source: this.code,
//    }));

//    self.postMessage({ markers, version });
//  } catch (e) {
    /* Ignore error */
//  }
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
      monaco: null,
      linter: null
    }),
    mounted () {
      const linter = new Linter()
        linter.defineRule('indent', indent)
        linter.defineRule('quotes', quotes)
        linter.defineRule('semi', semi)
        self.addEventListener('code', event => {
          const { code, version } = event.data;
        })
      // assign monaco-editor to a local variable
      this.monaco = monaco
      // configure monaco to NOT use default syntax/semantic validation
      this.monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true
      })
      this.monaco.editor.setModelMarkers
      // add in code to make our editor use ESLint (actually eslint4b)

      this.editor = monaco.editor.create(this.$el, {
        value: this.code,
        language: 'javascript',
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
