// function findDays(){
//     console.log("hi");
// }




// function getWeekday(sDate) {

//     var yy = parseInt(sDate.substr(0, 4), 10);
//     var mm = parseInt(sDate.substr(5, 2), 10);
//     var dd = parseInt(sDate.substr(8), 10);

//     var d = new Date(yy,mm - 1, dd);
//     var weekday=new Array(7);
//     weekday[0]="일";
//     weekday[1]="월";
//     weekday[2]="화";
//     weekday[3]="수";
//     weekday[4]="목";
//     weekday[5]="금";
//     weekday[6]="토";

//     return weekday[d.getDay()];
// }

// console.log(getWeekday("2023-03-07"))

// var today = new Date();

// console.log(today);

const findButton = document.getElementById("button")
const recommendDates = document.getElementById("dates")


function getWeekdays(year, month) {
    const weekdays = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        const dayOfWeek = currentDate.getDay(); // 0 (일요일) ~ 6 (토요일)
        
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 일요일(0)과 토요일(6) 제외
            weekdays.push(currentDate.toLocaleDateString());
        }
    }
    
    return weekdays;
}

// 특정 연도(year)와 월(month)을 지정하여 호출

// const month = 12;
// const weekdaysInMonth = getWeekdays(year, month);
// console.log(weekdaysInMonth);

function findDays() {
    const year = 2024;
    const selectedMonth = document.getElementById("whenSelect").selectedIndex
    const month = selectedMonth
    const weekdaysInMonth = getWeekdays(year, month);
    console.log("완료");
    recommendDates.innerText = ""
    for (let i of weekdaysInMonth){
        const day = document.createElement("li")
        day.append(i)
        recommendDates.append(day)
    }
    
}



findButton.addEventListener("click", findDays)

