<template>
  <v-treeview
    v-model="files"
    activatable
    :items="items"
    item-key="sha"
    item-text="path"
    :open="open"
    open-on-click
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="item.type === 'tree'">
        {{ open ? icons.open : icons.closed }}
      </v-icon>
      <v-icon v-else>
        {{ getFileIcon(item.path) }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
  export default {
    name: 'TheFileList',
    props: {
      items: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
      files: [],
      icons: {
        closed: 'mdi-folder',
        css: 'mdi-language-css3',
        html: 'mdi-language-html5',
        js: 'mdi-language-javascript',
        json: 'mdi-json',
        md: 'mdi-markdown',
        open: 'mdi-folder-open',
        php: 'mdi-language-php',
        py: 'mdi-language-python',
        r: 'mdi-language-r',
        sass: 'mdi-sass',
        scss: 'mdi-sass',
        text: 'mdi-file-document-outline'
      },
      open: []
    }),
    methods: {
      /**
       * Takes a filename, extracts its extension and tries to
       * match it with an icon from the Material Design Icons.
       * Returns generic "text" document icon if there's no match.
       *
       * @param   {String} name The name of the file
       * @returns {String}      The name of the icon to use
       */
      getFileIcon (name) {
        try {
          const ext = name.match(/\.(\w+)$/i)[1]
          return this.icons[ext] || this.icons.text
        } catch (e) {
          return this.icons.text
        }
      }
    }
  }
</script>
