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
        src="/img/icons/favicon-32x32.png"
        width="38"
        height="38"
        style="border-radius:2px;"
      >
      <v-toolbar-title class="headline text-uppercase">
        Aurora
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          v-if="!isAuthenticated"
          flat
          class="text-uppercase font-weight-black"
          @click="$store.dispatch('auth/login')"
        >
          Login
        </v-btn>
        <the-account-menu
          v-if="isAuthenticated"
          :avatar="avatar"
        />
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer
      app
      inset
    >
      <span class="mx-2">&copy; {{ copy }} The Aurora Project, All Rights Reserved</span>
    </v-footer>
  </v-app>
</template>

<script>
  import TheAccountMenu from '@/components/menus/TheAccountMenu'
  export default {
    name: 'App',
    props: {
      dark: {
        type: Boolean,
        default: true
      }
    },
    components: {
      'the-account-menu': TheAccountMenu
    },
    data () {
      return {
        drawer: true,
        routes: this.$router.options.routes
      }
    },
    computed: {
      avatar () {
        return this.$store.getters['auth/avatar']
      },
      copy: () => {
        const now = new Date().getFullYear()
        return now === 2019 ? now : `2019-${now}`
      },
      isAuthenticated () {
        return this.$store.getters['auth/isAuthenticated']
      },
      mini () {
        return this.$store.state.common.navDrawerIsMini
      }
    }
  }
</script>
