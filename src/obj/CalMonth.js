import  CalWeek from './CalWeek.js'
import DayType from './DayType.js'
export default class CalMonth{
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
    weeks = [];
    monthNum;
    startDate;
    endDate;
    
    static FromJson(objMonth){
        const newMonth = new CalMonth();
        newMonth.startDate = objMonth.startDate;
        newMonth.endDate = objMonth.endDate;
        newMonth.monthNum = objMonth.monthNum;
        
        //now loop through the weeks and create new weeks to match
        for (var i = 0; i < objMonth.weeks.length; i++){
            const w = objMonth.weeks[i];
            newMonth.weeks.push(CalWeek.FromJson(w));
        }
        return newMonth;
    }


    //takes a start date, and sets its end date when it's done
    static Generate(startDate){
        const newMonth = new CalMonth();
        newMonth.startDate = startDate;
        var currDate = startDate;
        var shouldContinue = true;
        var count = 0;
        newMonth.monthNum = startDate.getMonth();
        while(shouldContinue){
            count += 1;
            //keep going while the weeks are ending within the month
            const newWeek = CalWeek.Generate(currDate);
            newMonth.weeks.push(newWeek);
            currDate = new Date(newWeek.endDate.setDate(newWeek.endDate.getDate() + 1));//add one day to it to start the next week
            
            const tm = currDate.getMonth();
            if (tm != newMonth.monthNum){
                shouldContinue = false;
            }

        }
        //now we need to subtract one from currDate to get the end Date
        newMonth.endDate = new Date(currDate.setDate(currDate.getDate() - 1));
        return newMonth;

    }
    constructor(){
        
    }
    get monthName(){
        return this.months[this.monthNum];
    }
    get studentDayCount(){
        var studentCount = 0;
        for (var i = 0; i < this.weeks.length; i++){
            studentCount = studentCount + this.weeks[i].studentCount;
        }
        return studentCount;
    }
    get teacherDayCount(){
        var teacherCount = 0; 
        for (var i = 0; i < this.weeks.length; i++){
            teacherCount += this.weeks[i].teacherCount;
        }
        return teacherCount;
    }

}