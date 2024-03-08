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

    function getWeekdays() {
        const weekdays = { weekday: [], weekend: [] };

        for (let dayOffset = 0; weekdays.weekday.length < 5; dayOffset++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + dayOffset);
            const dayOfWeek = currentDate.getDay();

            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                const maxTemperature = WeatherResult.list[weekdays.weekday.length].main.temp_max;
                weekdays.weekday.push({
                    date: convertTime(dayOffset),
                    dayRank: (dayOfWeek + 6) % 7 + 1,
                    min_temperature: WeatherResult.list[weekdays.weekday.length].main.temp_min,
                    max_temperature: maxTemperature,
                    temperatureScore: getTemperatureScore(maxTemperature)
                });
            } else {
                weekdays.weekend.push(convertTime(dayOffset));
            }
        }

        // 내림차순으로 정렬
        weekdays.weekday.sort((a, b) => b.temperatureScore - a.temperatureScore);

        // 순위 다시 부여
        for (let i = 0; i < weekdays.weekday.length; i++) {
            weekdays.weekday[i].dayRank = i + 1;
        }

        return weekdays;
    }

    function getTemperatureScore(maxTemperature) {
        if (maxTemperature < 0) {
            return 0;
        }
        return parseFloat((10 - maxTemperature).toFixed(2));
    }

    function ShowDates() {
        var datesAndTempsList = $('#datesAndTemps');
        datesAndTempsList.empty();

        if (WeatherResult && WeatherResult.list) {
            var weekdaysInMonth = getWeekdays();

            for (var i = 0; i < weekdaysInMonth.weekday.length; i++) {
                let listItem = $('<ol>').text(
                    ' (' + weekdaysInMonth.weekday[i].dayRank + '위)' + " " + " " +
                    weekdaysInMonth.weekday[i].date + " " + "어떠세요?" + " " +
                    '점수: ' + weekdaysInMonth.weekday[i].temperatureScore.toFixed(2)  
                );
                datesAndTempsList.append(listItem);

                // 최저 기온과 최고 기온 콘솔에 출력하는 이벤트 추가
                listItem.click(function() {
                   
                    console.log('최저 기온: ' + weekdaysInMonth.weekday[i].min_temperature + '도');
                    console.log('최고 기온: ' + weekdaysInMonth.weekday[i].max_temperature + '도');
                    
                });
        
            }
    }
}

    const findButton = document.getElementById("button");

    findButton.addEventListener("click", ShowDates);

    $.getJSON('https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=6115ebecbd7794ae4c44965975cc2eec&units=metric', function (result) {
        WeatherResult = result;
    });
});


