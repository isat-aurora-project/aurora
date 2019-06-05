<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h2 class="display-2">
          Repositories
        </h2>
        <the-repo-list :repos="repos" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import TheRepoList from '@/components/lists/TheRepoList'
  export default {
    name: 'TheRepositoriesPage',
    components: {
      TheRepoList
    },
    data: () => ({
      repos: []
    }),
    async mounted () {
      this.repos = await this.$store.dispatch('github/call', {
        method: 'repos'
      })
    }
  }
</script>
