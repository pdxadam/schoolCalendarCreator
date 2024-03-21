<script setup>

    import CalDate from '../obj/CalDate.js'
    import DayType from '../obj/DayType.js'
    const props = defineProps({
        calDate: CalDate,
        tool: DayType,
    });
    const emit = defineEmits([{'eyeDropper': DayType}]);
    
    function nextType(){
        props.calDate.incrementType();
    }
    function setType(){        
            props.calDate.setType(props.tool);
    }
    function sampleType(ev){
        ev.preventDefault();
        emit('eyeDropper', props.calDate.dayType);
    }

    function selectNotes(){
        console.log("got it");
        //this is here to give me something to run on click.stop
    }
</script>
<template>
    
    <td v-if="calDate == null" class="none"> </td>  
    <td v-else :style="calDate.dayType.styleset" @click = "setType()" v-on:click.right="sampleType">        
        <p class="date"> 
            {{ calDate.thisDate.getDate() }}
            <span class="termStart" v-if="calDate.dayType.isTermStart == 1">*</span>
        
        </p>
        <p class = type> {{ calDate.dayType.title }}</p>
        <input @click.stop = "selectNotes()" type="text" class="dayNotes" v-model="calDate.notes">
        <p class = "studentCount" tooltip="Student days">{{ calDate.dayType.studentDay }}</p>
        <p class = "teacherCount" tooltip="Teacher days">{{ calDate.dayType.teacherDay }}</p>
        
    </td>

</template>
<style scoped>
*{
    print-color-adjust: exact;
}
    td{
        position: relative;
        height: 60px;
        border: 1px solid black;
        
    }
    .dayNotes{
        background: transparent;
        border: none;
        text-align: center;
        color: inherit;
        border-bottom: 1px dashed grey;
        /* width: 90%;
        display: block;
        margin-left: auto;
        margin-right: auto; */
    }
    .termStart{
        color: black;
        text-shadow: 1px 1px white,
            -1px -1px white, 
            1px -1px white,
            -1px 1px white;
        border-radius: 10px;
        width: 10px;
        font-weight: bold;
        font-size: 0.8rem;
        position: relative;
        top: -5px;
    }
    
    .termStart:hover::after{
        cursor: help;
        content: "New Term";
        color: black;
        background-color: white;
    }
    td p.date{
        position: absolute;
        left: 2px;
        right: 0px;
        top: 0px;
        max-height: 50px;
        overflow-y: scroll;
        font-weight: bold;
    }
    .weekend{
        background-color: lightgray;
    }
    .none{
        /* background: radial-gradient(lightgray, gray); */
        border: none;
    }
    .type{
        font-size: 0.6rem;
        margin-top: 0.1rem;
        text-align: center;
    }
    .teacherCount{
        position: absolute;
        bottom: 2px;
        right: 2px;
        /* border: 1px solid black; */
        line-height: 18px;
        vertical-align: middle;
        background-color: black;
        color: white;
        border-radius: 10px;
        width: 18px;
        height: 18px;
        font-size: 0.6rem;
        text-align: center;
    }
    .studentCount{
        position: absolute;
        bottom: 2px;
        left: 2px;
        border-radius: 10px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        vertical-align: middle;
        font-size: 0.6rem;
        text-align: center;
        background-color: lightGray;
        color: black;
    }
    td:nth-child(1), td:nth-child(7){
        display: none;
    }
    input{
        font-size: 0.8rem;
        width: 100px;
        
    }

</style>