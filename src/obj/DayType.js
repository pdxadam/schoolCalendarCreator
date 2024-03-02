export default class DayType{
    title = "Unnamed";
    studentDay = 1;
    teacherDay = 1;
    backColor = "White";
    fontColor = "Black";
    isTermStart = 0;
    //TODO: Get a 'Regular Day' flag to avoid exporting them
    shouldExport = true;
    constructor(title, studentDay, teacherDay, backColor, fontColor, termStart = 0, shouldExport = true){
        this.title = title;
        this.studentDay = studentDay;
        this.teacherDay = teacherDay;
        this.backColor = backColor;
        this.fontColor = fontColor;
        this.isTermStart = termStart;
        this.shouldExport = shouldExport;
       
    }
    get styleset(){
        return  "background-color:" + this.backColor + "; color: " + this.fontColor + ";";
        
    }

}