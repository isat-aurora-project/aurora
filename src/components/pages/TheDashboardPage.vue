<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h1 class="display-2">
          Dashboard
        </h1>
        <p>GitHub API Token: {{ githubAPIToken }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'TheDashboardPage',
    data: () => ({
      githubAPIToken: null
    }),
    mounted () {
      const email = this.$store.state.auth.user.email
      this.$store.dispatch('api/call', {
        method: 'get',
        service: 'auth0/users',
        params: {
          id: this.$store.state.auth.user.email
        }
      }).then(
        function (user) {
          this.githubAPIToken = user.identities.filter(id => id.provider === 'github')[0].access_token
        }.bind(this)
      )
    }
  }
</script>
