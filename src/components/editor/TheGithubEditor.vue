<template>
  <div>
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
          ref="editors"
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
            {{ f.path }}
            <!-- <the-editor
              v-model="openFiles[sha].content"
            /> -->
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
  import { mdiClose } from '@mdi/js'
  import TheFileList from '@/components/lists/TheFileList'
  export default {
    name: 'TheGithubEditor',
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
    components: {
      TheFileList
    },
    data: () => ({
      activeTab: null,
      branch: 'master',
      branches: ['master'],
      files: [],
      icons: {
        close: mdiClose
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
              // add the new file to the list of open files
              this.$set(this.openFiles, f.sha, { ...f, content: atob(f.content) })
              // select the newly created tab
              this.activeTab = Object.keys(this.openFiles).length - 1
            }.bind(this)
          )
        }
      }
    }
  }
</script>
