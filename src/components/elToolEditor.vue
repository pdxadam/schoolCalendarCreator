<script setup>
    import { ref } from 'vue'
    import DayType from '../obj/DayType.js'
    const prop = defineProps({
        tools: Array
    });
    const editMode = ref(false);
    const selectedTool = ref();
    var selectedIndex = -1;
    const emit = defineEmits([{'returnTool': DayType}]);
    const newToolName = ref("");
    const newStudentCount = ref(1);
    const newTeacherCount = ref(1);
    const isTermStart = ref(false);
    const shouldExport = ref(true);
    const backColor = ref("#9be1c1");
    const fontColor = ref("#000000");
    function styleText(){
        return "background-color: " + backColor.value + "; color: " + fontColor.value + ";";
    }
    function returnedTool(){
        //TODO: Find out why the term start ones aren't saving term starts.
        //TODO: set up a way to edit the tool set (change/remove)--how then do we update the calendar to match? \
        //Toughie: might need to change the data model for those. oof.  complicated. Loop trough the ones that matched and set up
        //do we only allow one kind with the same name?


        const newTool = new DayType(newToolName.value, newStudentCount.value, newTeacherCount.value, backColor.value, fontColor.value, isTermStart.value?1:0, shouldExport.value);
        // emit('returnTool', newTool);
       prop.tools.push(newTool);
    }   
    function editTool(selTool, index){
        editMode.value = true;
        selectedIndex = index;
        selectedTool.value = selTool;
    }
    function deleteTool(){
        prop.tools.splice(selectedIndex, 1);

    }
    function setNewMode(){
        editMode.value = false;
    }
</script>
<template>
    <h1>Edit Tools</h1>
    <main>
       
        <div id="toolsList">
            
            <h3>Tools:</h3><button @click="setNewMode()">New</button>
            <div v-for = "(tool, index) in tools" class = "toolButton" :style="tool.styleset" @click="editTool(tool, index);">{{ tool.title }}</div>
        </div>
        <div class="new Form" v-if="editMode == false">
            New
            <input type="text" v-model = "newToolName" placeholder="New Tool Name">        
            <div><input type="number" v-model = "newStudentCount" placeholder = "Student Day Count"></div>
            <div><input type="number" v-model = "newTeacherCount" placeholder = "Teacher Day Count"></div>
            <div><label for='chkTermStart'>Is Term Start</label><input type="checkbox" id="chkTermStart" v-model = "isTermStart"></div>
            <label for='chkShouldExport'>Export to Calendar (not a regular day)</label><input type="checkbox" id="chkShouldExport" v-model = "shouldExport">
            
            <div>
                Background Color: <input type = "color" id = "clrBackColor" v-model = "backColor">
                Font Color: <input type = "color" id = "clrFontColor" v-model = "fontColor">
            </div>
            <div class="toolPreview" :style = styleText()>Preview</div>
            <button @click="returnedTool()">Save</button>
        </div>
        <div class="edit Form" v-else>
            Title: 
            <input type="text" v-model = "selectedTool.title" placeholder="New Tool Name">        
            <div>Student Day: <input type="number" v-model = "selectedTool.studentDay" placeholder = "Student Day Count"></div>
            <div>Teacher Day<input type="number" v-model = "selectedTool.teacherDay" placeholder = "Teacher Day Count"></div>
            <label for='chkTermStart'>Is Term Start</label><input type="checkbox" id="chkTermStart" v-model = "selectedTool.isTermStart">
            <label for='chkShouldExport'>Export to Calendar (not a regular day)</label><input type="checkbox" id="chkShouldExport" v-model = "selectedTool.shouldExport">
            
            <div>Background Color: <input type = "color" id = "clrBackColor" v-model = "selectedTool.backColor"></div>
            <div>Font Color: <input type = "color" id = "clrFontColor" v-model = "selectedTool.fontColor"></div>
            <button @click="deleteTool()">Delete</button>
        </div>        
    </main>
    <footer>Changes do not automatically apply to calendar</footer>
</template>
<style scoped>
    .toolPreview{
        width: 75px;
        height: 75px;
        border: 2px solid black;
    }
    main{
        display: flex;

    }
    .toolButton{
        box-shadow: 2px 2px grey;
        margin: 3px 3px;
        border: 1px solid black;
        padding: 2px;
    }
    .toolButton:hover{
        cursor: pointer;
    }
    .toolButton:active{
        transform: scale(0.95);
    }
    #toolsList{
        width: 100px;
    

    }
    #toolsList + div{
        margin: 10px;
        border: 5px inset black;
        padding: 5px;
    }
    footer{
        font-style: italic;
    }
    .new{
        background-color: white;
    }
    .edit{
        background-color: aliceblue
    }
</style>