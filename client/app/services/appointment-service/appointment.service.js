/**
 * Created by jan on 10.03.17.
 */

angular
    .module('AppointmentService', [])
    .factory('AppointmentService', ['$q', '$http', function($q, $http) {

        /**
         * Add the appointment duration time to the previous appointment time
         *
         * @param appointmentTime {string}
         * @param duration {int}
         * @param buffer {int}
         * @returns {string}
         */
        function addDurationToAppointmentTime(appointmentTime, duration, buffer) {

            var time = appointmentTime.split(':');
            var hours = parseInt(time[0]);
            var minutes = parseInt(time[1]);
            var totalDuration = minutes + duration + buffer;

            if (totalDuration >= 60) {
                hours += Math.floor(totalDuration / 60);
                minutes = totalDuration % 60;
            } else {
                minutes = totalDuration;
            }

            if (hours > 23) hours = 0;
            if (hours < 10) hours = '0' + hours;
            if (minutes < 10) minutes = '0' + minutes;

            return hours + ':' + minutes;
        }

        function getDates(appointments) {
            appointments.sort(function(a, b) { return b.date - a.date });

            return {
                startDate: appointments.slice(-1)[0].date,
                endDate: appointments[0].date
            }
        }

        /*
        function groupDatesByDay(appointments) {

            var datesGroupedByDay = [];
            var days = [];
            var day;
            var lastDay;

            appointments.$promise.then(function (response) {

                response.sort(function (a, b) {
                    return a.startDate - b.startDate;

                });
                $q.all(response.map(function (date) {
                    day = $filter('date')(date.startDate, "shortDate");
                    if (lastDay == undefined) {
                        lastDay = day;
                    }
                    if (day != lastDay) {
                        datesGroupedByDay.push(days);
                        days = [];
                        days.push(date);
                        lastDay = day;
                    } else {
                        days.push(date);
                    }
                }));
                datesGroupedByDay.push(days);
                datesGroupedByDay[0].show = true;
            });

            return datesGroupedByDay;
        }
        */

        return {
            getDates: getDates,
            addDurationToAppointmentTime: addDurationToAppointmentTime
            //groupDatesByDay: groupDatesByDay
        }

    }]);