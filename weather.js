$(document).ready(function () {

    var WeatherResult; 
    var datesAndTempsList = $('#datesAndTemps'); 

    function convertTime(dayOffset) {
        var now = new Date();
        now.setDate(now.getDate() + dayOffset);

        var month = now.getMonth() + 1;
        var date = now.getDate();


        return month + '월' + date + '일';
    }

  
    function ShowDates() {
        var datesAndTempsList = $('#datesAndTemps');
        datesAndTempsList.empty(); 

        if (WeatherResult && WeatherResult.list) {
            // 5일간의 날짜와 온도를 출력
            for (var i = 0; i < 5; i++) {
                var nextDay = convertTime(i);


                const min_temperature = WeatherResult.list[i].main.temp_min;
                const max_temperature = WeatherResult.list[i].main.temp_max;
               // const clouds = WeatherResult.list[i].clouds; (이거 강수량을 출력하려고 했는데 데이터를 내가 못 읽는건지 강수량 출력이 안돼서 일단 주석 처리 해놨음 )

                
                var listItem = $('<li>').text(nextDay + ' ' + '최저 기온은:' + min_temperature + '도, 최고 기온은:' + max_temperature + '도');
                    datesAndTempsList.append(listItem);


                //if (clouds === undefined) {
                //    var listItem = $('<li>').text(nextDay + ' ' + '최저 기온은:' + min_temperature + '도, 최고 기온은:' + max_temperature + '도');
                //    datesAndTempsList.append(listItem);

                //} else {
                //    var listItem = $('<li>').text(nextDay + ' ' + '최저 기온은:' + min_temperature + '도, 최고 기온은:' + max_temperature + '도, 강수량은:' + clouds);
                //    datesAndTempsList.append(listItem);

//                }
    
                
               // datesAndTempsList.append(listItem);

               // 여기 주석도 만약에 강수량이 없으면 강수량 없이 최저/ 최고 기온만 출력하고
               // 비가 오면 강수량도 함께 출력하라고 할랬는데 이것도 clouds가 아닝가.. 암튼 그래서 일단 빼놨음 
            }
        } 
        
    }

    var findButton = document.getElementById("button");

    findButton.addEventListener("click", ShowDates);

    $.getJSON('https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=6115ebecbd7794ae4c44965975cc2eec&units=metric', function (result) {
        WeatherResult = result; 
    });
});

// ------


// 온도 -5˚C 이하 풍속 15m/s이상, 5mm/h 이상의 비가 내리는 경우 운휴  
// 공휴일 
// 1/1 , 2/9,2/10, 2/11, 2/12 , 3/1, 4/10, 5/1,5/5, 5/6, 5/15, 6/6, 8/15, 
// 9/16,9/17, 9/18
// 10/3 10/9, 12/24, 12/25