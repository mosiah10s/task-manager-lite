<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue'

export default {
  name: 'HomeView',
  components: {
    Dashboard
  }
}
</script>

<style scoped>
/* Optional styling here */
</style>
