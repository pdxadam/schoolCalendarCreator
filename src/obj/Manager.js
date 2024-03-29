import Calendar from './Calendar.js'
import DayType from './DayType.js'
export default class Manager{
    calendars = [];
    activeCalendar;
    saveName = "8sdjf3298j9823";
    constructor(){
        this.loadCalendars();
    }
    tools = [   
        new DayType("Term Start", 1, 1, "aliceblue", "black", 1, true),
        new DayType("Normal", 1, 1, "White", "Black", 0, false),
        new DayType("Conferences", 0, 1, "tan", "white", 0, true ),
        new DayType("Inservice", 0, 1, "yellow", "black", 0, true),
        new DayType("Holiday", 0, 1, "green", "white", 0, true),
        new DayType("Non-Contract", 0, 0, "blue", "white", 0, true)
    ]
    loadCalendars(){
        const jCal = localStorage.getItem(this.saveName);
        
        if (jCal == null || jCal == ""){
            this.calendars = [];
            //TODO: change this so it has a clear option for creating a new calendar and displays a 'no calendars'

            this.activeCalendar = Calendar.Generate(new Date("August 1, 2024"), new Date("June 30, 2025"), "Sample Calendar01");
            this.calendars.push(this.activeCalendar);
            
        }
        else{
            var tCal = JSON.parse(jCal);
            
            for(var i = 0; i < tCal.calendars.length; i++){
                this.calendars.push(Calendar.fromJson(tCal.calendars[i]));
                
            }
            this.tools = [];
            for (var i = 0; i < tCal.tools.length; i++){
                const t = tCal.tools[i];
                this.tools.push(new DayType(t.title, t.studentDay, t.teacherDay, t.backColor, t.fontColor, t.isTermStart, t.shouldExport));
         
            }
            this.activeCalendar = this.calendars[0];
           
        }
    }
    saveCalendars(){
        
        const jCal = JSON.stringify(this);
        localStorage.setItem(this.saveName, jCal);
        
    }
    getBackup(){
        //should only backup the active calendar
        const jCal = JSON.stringify(this.activeCalendar);
        return jCal;
    }
    deleteActiveCalendar(){
        for(var i = 0; i < this.calendars.length;i++){
            if (this.calendars[i] == this.activeCalendar){
                this.calendars.splice(i, 1);
                this.activeCalendar = this.calendars[0];
                return;
            }
        }
    }
    makeNewCalendar(title, startDate, endDate){
        //check for duplicate title?
        var count = 1;
        var shouldContinue = true;
        while (shouldContinue){
            shouldContinue = false;
            for (var i = 0; i < this.calendars.length; i++){
                if (this.calendars[i].title == title){
                    //change the title
                    title = title + "_" + count;
                    count++;
                    shouldContinue = true;
                }
            }
        }
        
        const newCal = Calendar.Generate(new Date(startDate), new Date(endDate), title);
        this.calendars.push(newCal);
        this.activeCalendar = newCal;
        this.saveCalendars();

    }

}