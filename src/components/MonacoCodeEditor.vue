<template>
<v-container fluid>
    <v-layout column>
      <v-flex xs12>
        <div class="resultContainer">
          <v-layout v-bind="layoutAttributes">
            <div class="item elevation-5">
                 <monaco-editor class="editor" v-model="code" language="javascript">
                     </monaco-editor>
            </div>
            
            <div class="item elevation-5"></div>
          </v-layout>
        </div>
      </v-flex>
    
 
  
</template>

<script>
import MonacoEditor from 'vue-monaco'

export default {
  components: {
    MonacoEditor
  },

  data() {
    return {
      code: 'const noop = () => {}'
    }
  }
}
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>
