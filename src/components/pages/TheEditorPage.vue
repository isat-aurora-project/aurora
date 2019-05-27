<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h1 class="display-2">
          Code Editor
        </h1>
        <the-editor class="editor" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import TheMonacoEditor from '@/components/TheMonacoEditor'
  export default {
    name: 'TheEditorPage',
    components: {
      'the-editor': TheMonacoEditor
    }
  }
</script>

<style>
.editor {
  height: 800px;
}
</style>
