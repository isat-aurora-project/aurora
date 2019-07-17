<template>
<v-container>
  <div id="editor" class="plot"></div>



</v-container>
</template>

<script>
  // import the monaco editor package
  import * as monaco from 'monaco-editor'
  const Linter = require("eslint4b/dist/linter")
  const { indent, quotes, semi } = require("eslint4b/dist/core-rules")
const linter = new Linter()
linter.defineRule("indent", indent)
linter.defineRule("quotes", quotes)
linter.defineRule("semi", semi)
  let text = `// DO NOT REMOVE COMMENTS!!
setup () {
  strip.map((p, i) => {
    p.color = i === 0 ? 'black': 'red'
    return p
  })
}/***END SETUP***/

loop () {
  // find out the currently "unlit" pixel in our strip
  const unlit = strip.findIndex(led => led.color === 'black')
  // turn "on" the currently unlit pixel
  strip[unlit].color = 'red'
  // figure out the next pixel
  const next = unlit + 1 === strip.length ? 0 : unlit + 1
  // turn it "off"
  strip[next].color = 'black'
}/***END LOOP***/
`
  export default {
    name: "TheCodeEditor",
    props: {
      language: {
        type: String,
        default: 'javascript'
      }
    },
    //value(newVal, ) {
    // if (newVal !== this.editor.getValue()) {
    //  this.editor.setValue(newVal)
    //  }
    //},
    data: () => ({
      monaco: null
    }),
    mounted () {
      // assign monaco-editor to a local variable
      this.monaco = monaco
      // configure monaco to NOT use default syntax/semantic validation
      this.monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      })
      // add in code to make our editor use ESLint (actually eslint4b)

      // create and set this.options to correct values

      // AFTER you've done all of your configuration...
      // create the editor
      this.editor = monaco.editor.create(this.$el, {
        value: text,
        language: "javascript",
        font: "Arial",
        readOnly: this.readOnly,
        ... this.options
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
