$(document).ready(function () {

    var WeatherResult;
    var datesAndTempsList = $('#datesAndTemps');
    var currentRank = 0;

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

                // list 배열에는 3시간 간격으로 예보된 날씨 데이터가 저장되어 있습니다. 
            } else {
                weekdays.weekend.push(convertTime(dayOffset));
            }
        }

        weekdays.weekday.sort((a, b) => b.temperatureScore - a.temperatureScore);

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
        if (currentRank >= 5 || !WeatherResult || !WeatherResult.list) {
            return;
        }

        var weekdaysInMonth = getWeekdays();

        if (currentRank < weekdaysInMonth.weekday.length) {
            var listItem = $('<ol>').text(
                ' (' + weekdaysInMonth.weekday[currentRank].dayRank + '위)' + "  " +
                weekdaysInMonth.weekday[currentRank].date + " " + "어떠세요?" + " " +
                '점수: ' + weekdaysInMonth.weekday[currentRank].temperatureScore.toFixed(2) 
            );
            datesAndTempsList.append(listItem);

            var subList = $('<ul>');
            var minTempItem = $('<li>').text('최저 기온: ' + weekdaysInMonth.weekday[currentRank].min_temperature + '도');
            var maxTempItem = $('<li>').text('최고 기온: ' + weekdaysInMonth.weekday[currentRank].max_temperature + '도');
            subList.append(minTempItem);
            subList.append(maxTempItem);

            listItem.click(function () {
                if (!$(this).find('ul').length) {
                    $(this).append(subList);
                } else {
                    subList.remove();
                }
            });

            currentRank++;

            if (currentRank === 5) {
                // 5일까지 출력되면 버튼 비활성화... 근데 이것보다는 그냥 아무것도 안 담게 해야겠다. 
                currentRank = " ";
                //findButton.disabled = true;
                // 이건 버튼을 비활성화 하는 방법! 근데 나는 
                // 그냥 버튼을 아예 못 누르게 하지 않고 버튼을 눌러도 아무일도 없게 만들었다. 
                


            }
        }
    }

    const findButton = document.getElementById("button");

    findButton.addEventListener("click", ShowDates);

    $.getJSON('https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=6115ebecbd7794ae4c44965975cc2eec&units=metric', function (result) {
        WeatherResult = result;
    });
});
