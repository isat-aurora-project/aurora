<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :mini-variant="mini"
    >
      <v-list>
        <v-list-item
          v-for="r in routes.filter(r => r.meta && r.meta.icon)"
          :key="r.path"
          :to="r.path"
        >
          <v-list-item-action>
            <v-icon>{{ r.meta.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              {{ r.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>{{ mini ? icons.right : icons.left }}</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      class="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <img
        src="/img/icons/favicon-32x32.png"
        width="38"
        height="38"
        class="mr-2"
        style="border-radius:2px;"
      >
      <v-toolbar-title class="headline text-uppercase">
        Aurora
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          v-if="!isAuthenticated"
          text
          class="text-uppercase font-weight-black"
          @click="$store.dispatch('auth/login')"
        >
          Login
        </v-btn>
        <the-account-menu v-if="isAuthenticated" />
      </v-toolbar-items>
    </v-app-bar>

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
  import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'
  import TheAccountMenu from '@/components/menus/TheAccountMenu'
  export default {
    name: 'App',
    components: {
      TheAccountMenu
    },
    data () {
      return {
        drawer: true,
        icons: {
          left: mdiChevronLeft,
          right: mdiChevronRight
        },
        routes: this.$router.options.routes
      }
    },
    computed: {
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
