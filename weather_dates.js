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
                weekdays.weekday.push({
                    date: convertTime(dayOffset),
                    dayRank: (dayOfWeek + 6) % 7 + 1,  // 오름차순으로 순위 매기기
                    min_temperature: WeatherResult.list[weekdays.weekday.length].main.temp_min,
                    max_temperature: WeatherResult.list[weekdays.weekday.length].main.temp_max
                });
            } else {
                weekdays.weekend.push(convertTime(dayOffset));
            }
        }

        return weekdays;
    }

    function ShowDates() {
        var datesAndTempsList = $('#datesAndTemps');
        datesAndTempsList.empty();

        if (WeatherResult && WeatherResult.list) {
            var weekdaysInMonth = getWeekdays();

            // 순위에 따라 정렬
            weekdaysInMonth.weekday.sort((a, b) => a.dayRank - b.dayRank);

            for (var i = 0; i < weekdaysInMonth.weekday.length; i++) {
                var listItem = $('<ol>').text(
                    ' (' + weekdaysInMonth.weekday[i].dayRank + '위) ' +
                    weekdaysInMonth.weekday[i].date +
                    ' 최저 기온은: ' + weekdaysInMonth.weekday[i].min_temperature + '도, ' +
                    ' 최고 기온은: ' + weekdaysInMonth.weekday[i].max_temperature + '도'
                );
                datesAndTempsList.append(listItem);
            }
        }
    }

    const findButton = document.getElementById("button");

    findButton.addEventListener("click", ShowDates);

    $.getJSON('https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=6115ebecbd7794ae4c44965975cc2eec&units=metric', function (result) {
        WeatherResult = result;
    });
});
