<template>
<v-container fluid>
    <v-layout column>
        <v-flex xs12>
        <div class="resultContainer">
          <v-layout v-bind="layoutAttributes">
            <div>
                <monaco-editor class="editor" v-model="code" language="javascript">
                </monaco-editor>
    <v-card>
            <v-card-actions>
        <v-btn 
          color="primary"
          @click="save()"
        >
          Save
        </v-btn>
        <v-btn 
          color="primary"
          @click="saveAs()"
        >
          Save As
          </v-btn>
          <v-spacer />
          <v-btn 
          color="primary"
          @click="test()"
        >
          Test
          </v-btn>
      </v-card-actions> 
    </v-card>
            </div>
            <v-spacer/>
            <div>
                <v-sheet
          class="pa-5"
          color="grey lighten-3"
        >
          <v-sheet
            :elevation="elevation"
            class="mx-auto"
            height="800"
            width="600"
          ></v-sheet>
        </v-sheet>
            </div>
          </v-layout>
        </div>
        </v-flex>
  
    </v-layout>>
</v-container>
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
  },
   methods: {
      save () {
        console.log("hi")
      },
       saveAs () {
        console.log("hello")
      },
        test () {
        console.log("hey there")
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
