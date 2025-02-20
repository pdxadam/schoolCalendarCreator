import DayType from './DayType.js'
export default class CalDate{
    thisDate; //a date object representing the date
    dayType = new DayType("Normal", 1, 1, "white", "black", 0, false); // an integer indicating the type: 0 = normal, 1 = non-contract, 2 = holiday, 3 = inservice (staff only), 4 = conferences
    termEvent = 0; //an integer indicating major events: 1 = start of term, 2 = end of term
    notes = ""; // a string with notes
    teacherDayCount = 1;
    studentDayCount = 1;

    static FromJson(objDay){
        const newDay = new CalDate();
        newDay.thisDate = new Date(objDay.thisDate);
        const dt = objDay.dayType;
        newDay.dayType = new DayType(dt.title, dt.studentDay, dt.teacherDay, dt.backColor, dt.fontColor, dt.isTermStart, dt.shouldExport);
        newDay.termEvent = dt.termEvent;
        newDay.notes = objDay.notes;
        newDay.teacherDayCount = dt.teacherDayCount;
        newDay.studentDayCount = dt.studentDayCount;
        newDay.countStudentDays();
        newDay.countTeacherDays();
        return newDay;
    }

    static Generate(objDate, intType, strNotes){
        const newDay = new CalDate();
        newDay.thisDate = objDate;
        newDay.notes = strNotes;
        if (newDay.thisDate.getDay() == 0 || newDay.thisDate.getDay() == 6){
            newDay.dayType = new DayType("Weekend", 0, 0, "white", "black", 0, false);
        }
        newDay.countTeacherDays();
        newDay.countStudentDays();
        return newDay;

    }
    constructor(){

    }
    addNote(newNote){
        this.notes.push(newNote);
    }
    countStudentDays(){
        //TODO: this is not correctly figuring out if it is a student day or not. It should be getting from the daytype
        //or am I just not using it?
        return this.dayType.studentDay;
    }
    countTeacherDays(){
       return this.dayType.teacherDay;
    }
    setType(newType){
        
        this.dayType = newType;
        
        this.countTeacherDays();
        this.countStudentDays();
    }


}