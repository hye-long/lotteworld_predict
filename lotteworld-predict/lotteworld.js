$(document).ready(function () {

    var WeatherResult;
    var datesAndTempsList = $('#datesAndTemps');
    var currentRank = 0;

    const dayScores = {
        1: 6, 
        2: 5, 
        3: 4, 
        4: 3, 
        5: 2, 
        6: 1, 
        0: 0  
    };

    function convertTime(dayOffset) {
        var now = new Date();
        now.setDate(now.getDate() + dayOffset);

        var month = now.getMonth() + 1;
        var date = now.getDate();

        return month + '월' + date + '일';
    }



    function getTemperatureScore(maxTemperature) {
        // 최고 기온 중 가장 높은 값을 찾음
        const maxTempRank = WeatherResult.list.reduce((acc, day) => {
            return day.main.temp_max > acc ? day.main.temp_max : acc;
        }, -Infinity);
    
        // 최고 기온이 0 미만인 경우, 날씨 점수를 0으로 설정하고 반환
        if (maxTempRank < 0) {
            return 0;
        }
    
        // 차등 점수 계산
        const rank = Math.max(0, Math.round(100 - (maxTempRank - maxTemperature) * 10));
    
        return rank;
    }
    
    
    
    
    
    
    
    
    
    function getWeekdays() {
        const weekdays = [];

        for (let dayOffset = 0; weekdays.length < 5; dayOffset++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + dayOffset);
            const dayOfWeek = currentDate.getDay();

            const maxTemperature = WeatherResult.list[dayOffset].main.temp_max;

            
            const totalScore = dayScores[dayOfWeek] + getTemperatureScore(maxTemperature);

            weekdays.push({
                date: convertTime(dayOffset),
                totalScore: totalScore,
                dayRank: 0, // Will be assigned later
                min_temperature: WeatherResult.list[dayOffset].main.temp_min,
                max_temperature: maxTemperature,
            });
        }

        weekdays.sort((a, b) => b.totalScore - a.totalScore);

        for (let i = 0; i < weekdays.length; i++) {
            weekdays[i].dayRank = i + 1;
        }

        return weekdays;
    }

    function ShowDates() {
        if (currentRank >= 5 || !WeatherResult || !WeatherResult.list) {
            // Check if all 5 days are displayed
            if (currentRank === 5) {
                datesAndTempsList.text('5일간의 숫자를 다 확인했어요옹');
            }
            return;
        }

        var weekdaysInMonth = getWeekdays();

        if (currentRank < weekdaysInMonth.length) {
            // Clear existing content before appending new content
            datesAndTempsList.empty();

            var listItem = $('<ol>').text(
                weekdaysInMonth[currentRank].date + " " + "어떠세요?" + " " +
                '총점: ' + weekdaysInMonth[currentRank].totalScore.toFixed(2)
            );
            datesAndTempsList.append(listItem);

            var subList = $('<ul>');

            var dateScoreItem = $('<li>').text('날짜 점수: ' + dayScores[weekdaysInMonth[currentRank].dayRank]);
            var temperatureScoreItem = $('<li>').text('날씨 점수: ' + getTemperatureScore(weekdaysInMonth[currentRank].max_temperature));
            var minTempItem = $('<li>').text('최저 기온: ' + weekdaysInMonth[currentRank].min_temperature + '도');
            var maxTempItem = $('<li>').text('최고 기온: ' + weekdaysInMonth[currentRank].max_temperature + '도');

            subList.append(minTempItem);
            subList.append(maxTempItem);
            subList.append(dateScoreItem);
            subList.append(temperatureScoreItem);

            listItem.click(function () {
                if (!$(this).find('ul').length) {
                    $(this).append(subList);
                } else {
                    subList.remove();
                }
            });

            datesAndTempsList.append(listItem);

            currentRank++;
        }
    }

    const findButton = document.getElementById("button");

    findButton.addEventListener("click", ShowDates);

    $.getJSON('https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=6115ebecbd7794ae4c44965975cc2eec&units=metric', function (result) {
        WeatherResult = result;
    });
});
