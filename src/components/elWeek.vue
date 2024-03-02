<script setup>
    
    import CalWeek from '../obj/CalWeek.js'
    import elDate from './elDate.vue'
    import DayType from '../obj/DayType.js'
    const props = defineProps({
        week: CalWeek,
        tool: DayType,
        required: false
    });
</script>
<template>

    <tr>
        <elDate v-for="aday in week.days" :calDate= aday :tool = tool />  
        
        <td class="days dayCount">
            {{ week.studentCount }}
        </td>
        <td class="days teacherCount">
            {{ week.teacherCount }}
        </td>
    </tr>
</template>
<style scoped>
    td.days{
        border: 1px solid black;
        text-align: center;
        width: 50px;
    }
</style>