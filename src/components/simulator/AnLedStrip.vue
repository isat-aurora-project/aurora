<template>
  <div class="strip">
    <an-led
      v-for="(led, i) in leds"
      :key="i"
      :color="led.color"
    />
  </div>
</template>

<script>
  import AnLed from '@/components/simulator/AnLed.vue'
  export default {
    name: 'AnLedStrip',
    components: {
      AnLed
    },
    props: {
      leds: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
