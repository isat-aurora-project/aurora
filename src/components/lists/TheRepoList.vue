<template>
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
</template>

<script>
  export default {
    name: 'TheRepoList',
    props: {
      repos: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
