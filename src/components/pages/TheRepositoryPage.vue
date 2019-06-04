<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h2>Repo: {{ repo.name }}</h2>
        <the-file-list :items="items" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import TheFileList from '@/components/lists/TheFileList'
  export default {
    name: 'TheRepositoryPage',
    components: {
      TheFileList
    },
    data: () => ({
      repo: {
        name: ''
      },
      items: []
    }),
    async mounted () {
      this.repo = await this.$store.dispatch('github/call', {
        method: 'branch',
        params: {
          user: this.$route.params.username,
          repo: this.$route.params.reponame,
          branch: 'master'
        }
      })
      // console.log(this.repo)
      this.items = await this.$store.dispatch('github/call', {
        method: 'getTree',
        params: {
          repo: 'master'
        }
      })
      // console.log(this.items)
    }
  }
</script>
