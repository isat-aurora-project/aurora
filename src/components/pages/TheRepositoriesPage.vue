<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h2 class="display-2">
          Repositories
        </h2>
        <v-list two-line>
          <template v-for="repo in repos">
            <v-list-tile
              :key="repo.id"
              :to="`/repositories/${repo.owner.login}/${repo.name}`"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="repo.name" />
                <v-list-tile-sub-title v-html="repo.description" />
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="repo.name" />
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'TheRepositoriesPage',
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
