
import CalMonth from './CalMonth.js'
import DayType from './DayType.js'
export default class Calendar{
    name;
    startDate;
    endDate;
    months = [];
    //TODO:move tools to Manager level
    //TODO: DayType eye dropper

    static fromJson(jCal){ // the calendar object pulled from json
          
        const newCal = new Calendar();
        newCal.name = jCal.name;
        newCal.startDate = new Date(jCal.startDate);
        newCal.endDate = new Date(jCal.endDate);
        //instantiate a calendar
        //loop through tools and generate a full DayType object for each
        // newCal.tools = [];
        // for (var i = 0; i < jCal.tools.length; i++){
        //     const t = jCal.tools[i];
        //     newCal.tools.push(new DayType(t.title, t.studentDay, t.teacherDay, t.backColor, t.fontColor, t.isTermStart, t.shouldExport));
        // }
        //TODO: finish moving tools to the manager level
        //loop through each month and generate a full Month object for each (maybe do a fromJson constructor for each)
        for (var i = 0; i < jCal.months.length; i++){
            const m = jCal.months[i];
            const newMonth = CalMonth.FromJson(m);
            newCal.months.push(newMonth);
        }
        //loop through each week and generate a full week object for each (fromJson constructor for Wekk.js)
                //loop through each day and generate a full day object for each (fromJson constructor for week.js)

        return newCal;
    }
    static Generate(start, end, name){ //dates
        const newCal = new Calendar();
        if (start > end){
            t = start;
            start = end;
            end = t;
        }
        
        newCal.startDate = start;
        newCal.endDate = end;
        newCal.name = name;
        var currDate = start;
        var thisMonth = -1;
        while (currDate <= end){

            if (currDate.getMonth() != thisMonth){
                const newMonth = CalMonth.Generate(currDate);                
                newCal.months.push(newMonth);
                currDate = newMonth.endDate;
                currDate = new Date(currDate.setDate(currDate.getDate() + 1));
                
            }
        }
        return newCal;
    }
    constructor(){ //dates
        
    }
    get teacherDayCount(){
        var teacherCount = 0;
        for (var i = 0; i < this.months.length; i++){
            teacherCount += this.months[i].teacherDayCount;
        }
        return teacherCount;
    }
    get studentDayCount(){
        var studentCount = 0;
        for (var i = 0; i < this.months.length; i++){
            studentCount += this.months[i].studentDayCount;
        }
        return studentCount;
    }
    get termCounts(){
        var terms = [];
        var termIndex = -1;
        //walk through all the months and then all the weeks, then all the days.
        for (var i = 0; i < this.months.length; i++){
            const m = this.months[i];
            for (var wi = 0; wi < m.weeks.length; wi++){
                const w = m.weeks[wi];
                for (var di = 0; di < w.days.length; di++){
                    const d = w.days[di];
                    if (d != null){
                        
                        if (d.dayType.isTermStart == 1){
                            //push a new entry to terms
                            //advance the index
                            terms.push(0);
                            termIndex++;
                        }
                        if (termIndex >= 0){
                            terms[termIndex] += d.dayType.studentDay;
                        }
                    }
                }
            }
        }
        //if there's a term start then you finish the previous term and move forward from there. 

        //what if there aren't any term starts?  Then we say none have been defined
        return terms;
    }
    makeICal(){
        //creates an ical file structure from this calendar in memory and returns it
        
        var dtstamp = this.getDateString(new Date());
        var file = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//mclainonline.com/schoolCal/${this.name}
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${this.name}
X-WR-CALDESK:${this.startDate.toLocaleDateString()} - ${this.endDate.toLocaleDateString()}\n`;

        for (var i = 0; i < this.months.length; i++){
            const m = this.months[i];

            for (var w = 0; w < m.weeks.length; w++){
                const week = m.weeks[w];
                for (var d =0; d < week.days.length; d++){
                    const day = week.days[d];
                    if (day != null && day.dayType.shouldExport != false){
                        const dtString = this.getDateString(day.thisDate);

                        const dayString = `BEGIN:VEVENT
UID:${Date.now()}${dtString}calendarmakerzz@mclainonline.com
DTSTAMP:${dtstamp}
CREATED:${dtstamp}
LAST-MODIFIED:${dtstamp}
DTSTART;VALUE=DATE:${dtString}
DTEND;VALUE=DATE:${dtString}
SUMMARY:${day.dayType.title}(s:${day.dayType.studentDay})(t:${day.dayType.teacherDay})
TRANSP:TRANSPARENT
CATEGORIES:${day.dayType.title}
CLASS:PUBLIC
END:VEVENT\n`;
                        file = file + dayString;
                    }
                }
            }
        }
        file = file + `END:VCALENDAR`;
        file = this.replaceNewlinesWithCRLF(file);
        return file;
    }
    replaceNewlinesWithCRLF(inputString) {
  // Replace all occurrences of newline characters with CRLF
  return inputString.replace(/\n/g, "\r\n");
}
    getDateString(date){
        var y = date.getFullYear().toString();
        var m = (date.getMonth() + 1).toString();
        if (m < 10){
            m = "0" + m;
        }
        var d = date.getDate().toString();
        if (d < 10){
            d = "0" + d;
        }
        // var outstring = "" + y + "" + m + "" + d + "T070000Z";
        var outstring = y.concat('',m);
        outstring = outstring.concat('',d);
        outstring = outstring.concat('',"T070000Z");
        return (outstring);
    }
}