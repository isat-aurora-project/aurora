<template>
  <v-layout
    fill-height
    row
  >
    <v-card
      width="250"
      style="overflow: scroll; height: 80vh;"
    >
      <the-file-list
        :items="files"
        @file-clicked="openFile"
      />
    </v-card>
    <v-flex>
      <v-card
        v-if="activeTab === null"
      >
        <v-layout
          align-center
          justify-center
          fill-height
        >
          <v-flex>
            There are no open files. Please select one from the left.
          </v-flex>
        </v-layout>
      </v-card>
      <v-card
        v-else
        style="height: 80vh;"
      >
        <v-tabs
          v-model="activeTab"
          height="100"
        >
          <v-tab
            v-for="(f, sha) in openFiles"
            :key="sha"
          >
            {{ f.path }}
            <v-btn
              icon
              :rounded="false"
              @click="close(f.sha)"
            >
              <v-icon>
                {{ icons.close }}
              </v-icon>
            </v-btn>
          </v-tab>
          <v-tab-item
            v-for="(f, sha) in openFiles"
            :key="sha"
            transition="fade-transition"
            reverse-transition="fade-transition"
          >
            <the-editor
              class="the-editor"
              :content="openFiles[sha].content"
              :lang="openFiles[sha].lang"
            />
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mdiClose } from '@mdi/js'
  import TheFileList from '@/components/lists/TheFileList'
  import TheMonacoEditor from '@/components/editor/TheMonacoEditor'
  export default {
    name: 'TheGithubEditor',
    components: {
      TheFileList,
      'the-editor': TheMonacoEditor
    },
    props: {
      user: {
        type: String,
        default: ''
      },
      repo: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      activeTab: null,
      branch: 'master',
      branches: ['master'],
      files: [],
      icons: {
        close: mdiClose
      },
      langMap: {
        css: 'css',
        html: 'html',
        js: 'javascript',
        json: 'json',
        md: 'markdown',
        php: 'php',
        py: 'python',
        r: 'r',
        scss: 'scss',
        yml: 'yaml'
      },
      openFiles: {}
    }),
    async mounted () {
      this.$store.dispatch('github/call', {
        method: 'branch',
        params: {
          user: this.user,
          repo: this.repo,
          branch: 'master'
        }
      }).then(
        function () {
          return this.$store.dispatch('github/call', {
            method: 'getTree',
            params: {
              branch: 'master'
            }
          })
        }.bind(this)
      ).then(
        function (items) {
          this.files = items
        }.bind(this)
      ).catch(
        err => console.log(err)
      )
    },
    methods: {
      close (sha) {
        this.$delete(this.openFiles, sha)
      },
      openFile (file) {
        // if the file is not already open
        if (!this.openFiles[file.sha]) {
          // try to open it
          this.$store.dispatch('github/call', {
            method: 'getContents',
            params: {
              branch: 'master',
              path: file.path
            }
          }).then(
            // add it to the list of open files
            function (f) {
              // see if we can guess which language it is
              let lang = 'ini'
              try {
                const ext = f.name.match(/\.(\w+)$/i)[1]
                lang = this.langMap[ext] || 'ini'
              } catch (err) {}
              // add the new file to the list of open files
              this.$set(this.openFiles, f.sha, { ...f, content: atob(f.content), lang })
              // select the newly created tab
              this.activeTab = Object.keys(this.openFiles).indexOf(f.sha)
            }.bind(this)
          )
        }
      }
    }
  }
</script>

<style lang="sass">
.the-editor
  height: calc(80vh - 48px)
</style>
