import CalDate from './CalDate.js'
export default class CalWeek{
    //holds up to seven days
    days = [null, null, null, null, null, null, null];
    startDate;
    endDate;
    
    static FromJson(objWeek){
        const newWeek = new CalWeek();
        newWeek.startDate = new Date(objWeek.startDate);
        newWeek.endDate = new Date(objWeek.endDate);
        //loop through the days and 'FromJson' them
        for (var i = 0; i < newWeek.days.length; i++){
            const d = objWeek.days[i];
            if (d != null){
                newWeek.days[i] = CalDate.FromJson(d);
            }
        }
        return newWeek;
    }

    static Generate(startDate){
        const newWeek = new CalWeek();
        var thisMonth = startDate.getMonth();
        newWeek.startDate = startDate;
        var currDate = startDate;
        while(true){
            newWeek.days[currDate.getDay()] = CalDate.Generate(new Date(currDate), 0, "");
            newWeek.endDate = new Date(currDate);
            //check for end of week;
            if (currDate.getDay() == 6){
                break;
            }
            //now check for end of month: we don't want to do more
            currDate = new Date(currDate.setDate(currDate.getDate() + 1));
            if (currDate.getMonth() != thisMonth){
                break;
            }
        }
        return newWeek;
    }
    constructor(){
        
    }
    get studentCount(){
        var studentDays = 0;
        for (var i = 0; i < this.days.length; i++){
            const day = this.days[i];
            if (day == null){
                continue;
                
            }
            studentDays += day.dayType.studentDay; 
            
        }
        return studentDays;
    }
    get teacherCount(){
        var teacherDays = 0;
        for (var i = 0; i < this.days.length; i++){
            const aday = this.days[i];
            if (aday == null){
                continue;
            }
            teacherDays += aday.dayType.teacherDay; 
        }
        return teacherDays;
    }


}
