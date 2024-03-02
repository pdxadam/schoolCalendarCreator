<script setup>
 import DayType from '../obj/DayType.js'
    const props = defineProps({
        tools: [DayType],
        required: true,
    })
</script>
<template>
    <nav>
        <span v-for="tool in tools" >{{ tool.title }}</span>
    </nav>
</template>
