<template>
  <v-treeview
    activatable
    :active.sync="active"
    :items="items"
    item-key="sha"
    item-text="path"
    :open="open"
    open-on-click
    return-object
    transition
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
  import {
    mdiFolder,
    mdiLanguageCss3,
    mdiLanguageHtml5,
    mdiLanguageJavascript,
    mdiJson,
    mdiMarkdown,
    mdiFolderOpen,
    mdiLanguagePhp,
    mdiLanguagePython,
    mdiLanguageR,
    mdiSass,
    mdiFileDocumentOutline
  } from '@mdi/js'
  export default {
    name: 'TheFileList',
    props: {
      items: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
      active: [],
      icons: {
        closed: mdiFolder,
        css: mdiLanguageCss3,
        html: mdiLanguageHtml5,
        js: mdiLanguageJavascript,
        json: mdiJson,
        md: mdiMarkdown,
        open: mdiFolderOpen,
        php: mdiLanguagePhp,
        py: mdiLanguagePython,
        r: mdiLanguageR,
        sass: mdiSass,
        scss: mdiSass,
        text: mdiFileDocumentOutline
      },
      open: []
    }),
    watch: {
      active: function () {
        if (this.active.length && this.active[0].type !== 'tree') {
          this.$emit('file-clicked', this.active[0])
        }
      }
    },
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
