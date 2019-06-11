<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
          <an-led :color="color"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//import { setInterval } from 'timers';
import AnLed from '@/components/simulator/AnLed.vue'
export default {
  components: {
    AnLed
  },
  data: () => ({
    color: 'black'
  }),
  mounted () {
    setInterval(function () {
      this.color = this.color === 'black' ? 'red' : 'black'
    }.bind(this), 1000)
  }
}
</script>

<style>

</style>
