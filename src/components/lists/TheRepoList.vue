<template>
  <v-list two-line>
    <template v-for="repo in repos">
      <v-list-item
        :key="repo.id"
        :to="`/repositories/${repo.owner.login}/${repo.name}`"
      >
        <v-list-item-content>
          <v-list-item-title v-html="repo.name" />
          <v-list-item-sub-title v-html="repo.description" />
        </v-list-item-content>
      </v-list-item>
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
