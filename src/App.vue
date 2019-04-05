<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :mini-variant="mini"
    >
      <v-list>
        <v-list-tile
          v-for="r in routes.filter(r => r.meta && r.meta.icon)"
          :key="r.path"
          :to="r.path"
        >
          <v-list-tile-action>
            <v-icon>{{ r.meta.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="text-capitalize">
              {{ r.name }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      clipped-left
      class="primary"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <img
        src="@/assets/logo.svg"
        width="38"
        height="38"
        style="border-radius:2px;"
      >
      <v-toolbar-title class="headline text-uppercase">
        Aurora
      </v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer
      app
      inset
    >
      <span class="mx-2">&copy; {{ copy }} Aurora, All Rights Reserved</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    props: {
      dark: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        drawer: true,
        mini: false,
        routes: this.$router.options.routes
      }
    },
    computed: {
      copy: () => {
        const now = new Date().getFullYear()
        return now === 2019 ? now : `2019-${now}`
      }
    }
  }
</script>
