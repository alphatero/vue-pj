<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <router-view/>
  </div>
</template>

<style lang="sass">
@import "./assets/all"
</style>

<script>
import Navbar from '@/components/navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>
