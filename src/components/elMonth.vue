<script setup>
    import CalMonth from '../obj/CalMonth.js'
    import elWeek from './elWeek.vue'
    import DayType from '../obj/DayType.js'
    const props = defineProps({
        m: CalMonth,
        tool: DayType,
        required: true,
    });
    
</script>
<template>
    <hr>
    <h3>{{  m.monthName }}</h3>
    <p>Students: {{ m.studentDayCount }} Teachers: {{ m.teacherDayCount }}</p>
    <table>
        <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th class="studentCount">Student Days</th>
            <th class="teachercount">Teacher Days</th>
        </tr>
        <elWeek  v-for="week in m.weeks" :week = week :tool = tool /> 
    </table>
</template>
<style scoped>
    h3{
        background: radial-gradient(lightgrey, lightsteelblue);
        margin: 5px;
        text-align: center;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-size: 1.2rem;
    }
    table{
        border: 2px solid blue;
        border-collapse: collapse;
        margin: 5px auto;
    }
   
    th{
        font-weight: bold;
        font-size: 0.8em;
        border: 1px solid black;
        
    }
    th:nth-child(1), th:nth-child(7){
        display: none  !important;
    }
    th.teachercount{
        background: black;
        color: white;
    }
    th.studentCount{
        background: lightgray;
        color: black;
    }

</style>