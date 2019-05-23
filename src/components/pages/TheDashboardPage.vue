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
  import { api } from '@/services/api.service'
  export default {
    name: 'TheDashboardPage',
    data: () => ({
      api: null,
      githubAPIToken: null
    }),
    mounted () {
      const email = this.$store.state.auth.user.email
      this.api = api(this.$store.state.auth.accessToken)
      this.api.getUser(email).then(
        user => {
          console.log(user.identities[0])
          this.githubAPIToken = user.identities[0].access_token
        }
      )
    }
  }
</script>
