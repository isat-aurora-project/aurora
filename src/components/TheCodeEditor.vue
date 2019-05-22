<template>
    <v-card>
      <codemirror
        v-model="code"
        :options="cmOptions"
      />
      <v-card-actions>
        <v-btn 
          color="primary"
          @click="save()"
        >
          Save
        </v-btn>
        <v-spacer />
        <v-btn 
          color="primary"
          @click="saveAs()"
        >
          Save As
          </v-btn>
      </v-card-actions> 
    </v-card>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/monokai.css'

  export default {
    name: 'TheCodeEditor',
    components: {
      codemirror
    },
    data: () => ({
      code: 'const a = 10',
      cmOptions: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/javascript',
        lineWrapping: true,
        theme: 'monokai',
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      }
    }),
    methods: {
      save () {
        console.log("hi")
      },
       saveAs () {
        console.log("hello")
      }
    }
  }
</script>
