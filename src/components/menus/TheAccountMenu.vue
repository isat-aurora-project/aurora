<template>
  <v-menu
    bottom
    left
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn
        text
        class="pr-0"
        v-on="on"
      >
        <v-avatar size="38">
          <img :src="$store.getters['auth/avatar']">
        </v-avatar>
        <v-icon>{{ icons.dropdown }}</v-icon>
      </v-btn>
    </template>
    <v-list
      dense
      light
    >
      <v-list-item to="dashboard">
        <v-list-item-action>
          <v-icon>{{ icons.dashboard }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="text-capitalize">
            The Dashboard
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout()">
        <v-list-item-action>
          <v-icon>{{ icons.logout }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="text-capitalize">
            Logout
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import { mdiAccountBox, mdiViewDashboard, mdiExitRun, mdiChevronDown } from '@mdi/js'
  export default {
    name: 'TheAccountMenu',
    data: () => ({
      icons: {
        dashboard: mdiViewDashboard,
        dropdown: mdiChevronDown,
        profile: mdiAccountBox,
        logout: mdiExitRun
      }
    }),
    methods: {
      logout () {
        this.$store.dispatch('auth/logout')
      }
    }
  }
</script>
