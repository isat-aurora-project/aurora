<template>
  <div
    class="led"
    :style="{backgroundColor: color}"
  />
</template>

<script>
  export default {
    name: 'AnLed',
    props: {
      color: {
        type: String,
        default: 'black'
      }
    }
  }
</script>

<style>
.led {
  width: 8px;
  height: 8px;
  display: inline-block;
}
</style>
