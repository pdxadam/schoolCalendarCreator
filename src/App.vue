<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import elCalendar from './components/elCalendar.vue'
  import elToolEditor from './components/elToolEditor.vue'
  // import elDate from './components/elDate.vue'

</script>

<template>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/calendar">Calendar</RouterLink>
        <RouterLink to="/manager">Manager</RouterLink>
      </nav>
<main>

  <RouterView />
</main>
</template>

<style scoped>
    nav{
      display: none;
      position: fixed;
      bottom: 0px;
      left: 0px;
      right: 0px;
      height: 25px;

    }
    main{
      margin-bottom: 30px;
    }
</style>
