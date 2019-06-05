<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h2>Repo: {{ $route.params.reponame }}</h2>
        <!-- <the-file-list
          :items="items"
          @file-clicked="handleClick"
        /> -->
        <the-github-editor
          :user="$route.params.username"
          :repo="$route.params.reponame"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import TheGithubEditor from '@/components/editor/TheGithubEditor'
  // import TheFileList from '@/components/lists/TheFileList'
  export default {
    name: 'TheRepositoryPage',
    components: {
      // TheFileList,
      'the-github-editor': TheGithubEditor
    },
    data: () => ({
      repo: {
        name: ''
      },
      items: []
    }),
    methods: {
      handleClick (item) {
        console.log(item)
      }
    }
  }
</script>
