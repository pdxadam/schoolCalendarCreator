<script setup>
    import { ref, watch } from 'vue';
    import Manager from '../obj/Manager.js'
    import elCalendar from './elCalendar.vue'
    import ToolEditor from './elToolEditor.vue'
    const calMan = ref(new Manager());
    const newCalTitle = ref("");
    const newCalStartDate = ref();
    const newCalEndDate = ref();
    const formState = ref("");
    const toolDisplay = ref("hidden");
    const startYear = ref(new Date().getFullYear());
    const startMonth = ref(7); //August default
    const endYear = ref(new Date().getFullYear() + 1);
    const endMonth = ref(5); // June default
    var count = 0;  
    watch(calMan.value, calChange, { deep: true } );
    
    function calChange(){
        count++;
        calMan.value.saveCalendars();
    }

    function createCalendar(){
        //check that there's a title
        if (newCalTitle.value == ""){
            return;
        }
        if (newCalEndDate.value == ""){
            return;
        }
        if (newCalStartDate.value == ""){
            return;
        }
        newCalStartDate.value = new Date(startYear.value, startMonth.value);
        //for end date, the value returns the first day of the next month
        // so I'm subtracting one day to get the full month they chose.
        const endDate = new Date(endYear.value, endMonth.value);
        endDate.setDate(endDate.getDate() - 1);
        newCalEndDate.value = new Date(endDate);
        
        calMan.value.makeNewCalendar(newCalTitle.value, newCalStartDate.value, newCalEndDate.value);
        formState.value = "";
        //refresh the list and go to the new calendar

        //check that the dates make sense
        //create the calendar
        //then we get to work on the switching
    }
    function toggleSidebar(){
        toolDisplay.value = toolDisplay.value==hidden?'':'hidden';

    }
    function saveNewTool(newTool){
        
        calMan.tools.push(newTool);
    }
    function downloadiCal() {
        var txtICal = calMan.value.activeCalendar.makeICal();
        const filename = "schoolCalendar.ical";
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtICal));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
}

    
</script>
<template>
    <nav id="calNav">
        <select v-model = "calMan.activeCalendar">
            <option v-for= "calendar in calMan.calendars" :value = "calendar">{{ calendar.name }}</option>
        </select>    
        <span>
            <button @click="formState = 'shown';">New Calendar</button>
            <button @click = "toolDisplay='';">Edit Tools</button>
            <button @click = downloadiCal()>Get iCal</button>
        </span>
    </nav>
    <div id="sidebar" :class = "toolDisplay">
        <div>
            <button @click="toolDisplay='hidden';">&nbsp;X&nbsp; </button>
            <ToolEditor @returnTool = "console.log(newTool)" :tools = calMan.tools /> 
        </div>
    </div>
    <main>        
        <elCalendar :cal = calMan.activeCalendar :tools = calMan.tools />
    </main>
    
    <div id="frmNewCalendar" :class=formState>
        
        <div>
            <button @click="formState = '';">X</button>
            <h1>Create New Calendar</h1>
            <div>
                <input type="text" id="txtNewCalendarTitle" placeholder="Title" v-model = "newCalTitle">
            </div>
            <div>
                <label for = "optStartMonth">Starting </label>
                <select id="optStartMonth" v-model="startMonth">
                    <option value = 0>January</option>
                    <option value = 1>February</option>
                    <option value = 2>March</option>
                    <option value = 3>April</option>
                    <option value = 4>May</option>
                    <option value = 5>June</option>
                    <option value = 6>July</option>
                    <option value = 7>August</option>
                    <option value = 8>September</option>
                    <option value = 9>October</option>
                    <option value = 10>November</option>
                    <option value = 11 >December</option>
                </select>
                <input type="number" placeholder="Start Year" v-model="startYear">
            </div>
            <div>
                <label for = "optEndMonth">Ending:</label>
                <select id="optEndMonth" v-model="endMonth">
                    <option value = 1>January</option>
                    <option value = 2>February</option>
                    <option value = 3>March</option>
                    <option value = 4>April</option>
                    <option value = 5>May</option>
                    <option value = 6>June</option>
                    <option value = 7>July</option>
                    <option value = 8>August</option>
                    <option value = 9>September</option>
                    <option value = 10>October</option>
                    <option value = 11>November</option>
                    <option value = 12>December</option>
                </select>
                <input id = "txtEndYear" placeholder="End Year" type="number" v-model="endYear">
            </div>
            
            <div>
                <button @click = "createCalendar();">Create</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
*{
    print-color-adjust: exact;
}

nav{
    position: sticky;
    top: 0px;
    z-index: 10;
    background-color: white;
    
}
nav *{
    margin: 2px 5px;
}
nav span{
    position: absolute;
    right: 0px;
}
nav select{
    background-color: grey; 
    color: white;
    font-size: 1.2rem;

}
#sidebar{
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    border: 2px solid grey;
    overflow: hidden;
    overflow-y: scroll;
    width: 100vw;
    background: radial-gradient(lightgrey, lightsteelblue);
    transition: all 0.3s;
    z-index: 30;
    pointer-events: all;

}
#sidebar.hidden{
    width: 0px !important;
}
#sidebar div{
    position: relative;
    width: 600px;
    background-color: white;
    margin: 50px auto;
    padding: 10px;
    border-radius: 25px;

}
#sidebar > div > button{
    position: absolute;
    top: -2px;
    right: -2px;
    background: radial-gradient(grey, black);
    color: white;
    border-radius: 30px;
    height: 30px;
    border: 1px solid black;


}
#sidebar > div > button:hover{
    color: yellow;
    border: 1px solid yellow;
}
#sidebar > div > button:active{
    transform: scale(0.95);
}

    #frmNewCalendar{
        position: fixed;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        opacity: 0;
        pointer-events: none;
        display: flex;
        justify-content: middle;
        align-items:center;
        background-color: rgba(0,0,0,0.8);
        z-index: 25;
        transition: all 0.4s;
    }
    #frmNewCalendar > div > button{
        position: absolute;
        top: -2px;
        right: -2px;
        border-radius: 30px;
        text-align: center;
        font-size: 1.2rem;
        padding: 0px 5px;
    }
    #frmNewCalendar > div{
        margin: 0px auto;
        background-color: white;
        border-radius: 25px;
        position: relative;
        text-align: center;
        width: 500px;
        height: 300px;
        padding: 25px 10px;
    }
    #frmNewCalendar > div div{
        margin: 5px;
    }
    #frmNewCalendar input[type='text']{
        font-size: 1.5em;
    }
    #frmNewCalendar *{
        margin: 2px 5px;
    }
    #frmNewCalendar.shown{
        opacity: 1;
        pointer-events: all;
    }
    #frmNewCalendar label{
        width: 45px;
        display: inline-block;
    }
    #frmNewCalendar button{
        font-size: 1.5em;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    @media print{
        nav{
            display: none;
            
        }
        button{
            display: none;
        }
    }
</style>