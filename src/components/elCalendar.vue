<script setup>
    import monthVue from './elMonth.vue'
    import Calendar from '../obj/Calendar.js'

    import { ref } from 'vue'
    
    function setTool(tool){

        activeTool.value = tool;

    }
    function saveTool(newTool){
        props.tools.push(newTool);
    }

function downloadiCal() {
    var txtICal = props.cal.makeICal();
    const filename = "schoolCalendar.ical";

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtICal));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


    var props = defineProps({
        cal: Calendar,
        tools: []
    });

    
    const activeTool = ref(props.tools[0]);

</script>
<template>
        
        <header>
            <h1>{{ cal.name }}</h1>
            <h3>{{ cal.startDate.toLocaleString('default', { month: 'long' }) }}, {{  cal.startDate.getFullYear() }} - {{ cal.endDate.toLocaleString('default', { month: 'long' }) }}, {{  cal.endDate.getFullYear() }}</h3>
            <div class="summary">
                <div class="dayCount">
                    <h4>Student Days: {{ cal.studentDayCount }} &nbsp;&nbsp; 
                    TeacherDays: {{ cal.teacherDayCount }}</h4>
                </div>
                <div class = "termCount">
                    <h3>Student days by Term: </h3>
                    <ul>
                        <li v-if="cal.termCounts.length == 0">No Terms Defined</li>
                        <li v-else v-for="(term, index) in cal.termCounts">T{{ index + 1 }}: {{ term }}</li>
                    </ul>   
                </div>
            </div>
            <nav>
                <span v-for="atool in tools" class="toolButton" :style = "atool.styleset" @click = "setTool(atool)">{{ atool.title }}</span>
                
            </nav>
            
            
        </header>
        <main>
        
        <div v-for="m in cal.months">
            <monthVue :m = m :tool = activeTool />
        </div>
   
    </main>
</template>
<style scoped>
*{
    print-color-adjust: exact;
}
    header{
        position: sticky;
        top: 20px;
        z-index: 5;
        background-color: lightsteelblue;
        padding: 5px;
    }
    h1{
        border: 1px solid black;
        width: fit-content;
        padding: 2px 5px;
        max-width: 50%;
        overflow-x: hidden;

    }
    h1:hover{
        overflow-x: visible;
    }
  
    .termCount li{
        display: inline-block;
        border-right: 1px solid black;
        padding-right: 3px;
        margin-right: 3px; 
    }
    .summary{
        position: absolute;
        width: 300px;
        right: 0px;
        top: 0px;
        text-align: right;

    }

    nav{
        text-align: center;
    }
    button{
        margin: 2px 5px;
    }
    .toolButton{
        margin: 2px 5px;
        box-sizing: border-box;
        border: 1px solid black;
        padding: 1px;
        display: inline-block;
        
    }
    .toolButton:hover{
        cursor: pointer;

    }
    .toolButton:active{
        transform: scale(0.95);
    }
    .Normal{
        background-color: white;
    }
    .Conferences{
        background-color: tan;
        color: white;
    }
    .Inservice{
        background-color: yellow;
    }
    .Holiday{
        background-color: orange;
        color: black;
    }
    .Non-Contract{
        background-color: darkblue;
        color: white;
    }
    .weekend{
        background-color: lightgray;
    }
    .selected{
        border: 2px solid chartreuse;
    }
    @media print{
        
        button{
            display: none;
        }
    }
</style>