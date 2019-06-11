<template>
    <div 
      class="led"
      :style="{color}"
    ></div>
</template>

<script>
export default {
  name: 'AnLed',
  props:{
    color:{
      type: String, 
      default: 'black'
    }
  }
}
</script>

<style>
.led {
  width: 10px;
  height: 10px;
  display: inline-block;
}
</style>

