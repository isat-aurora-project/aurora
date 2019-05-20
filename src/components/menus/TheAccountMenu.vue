<template>
  <v-menu
    bottom
    left
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn
        flat
        class="pr-0"
        v-on="on"
      >
        <v-avatar size="38">
          <img :src="avatar">
        </v-avatar>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list
      dense
      light
    >
      <v-list-tile to="dashboard">
        <v-list-tile-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="text-capitalize">
            The Dashboard
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="logout()">
        <v-list-tile-action>
          <v-icon>mdi-exit-run</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="text-capitalize">
            Logout
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'TheAccountMenu',
    props: {
      avatar: {
        type: null,
        required: true,
        default: ''
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('auth/logout')
      }
    }
  }
</script>
