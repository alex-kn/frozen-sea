/**
 * Created by jan on 10.03.17.
 */

angular
    .module('AppointmentService', [])
    .factory('AppointmentService', function() {

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
            console.log(time);
            var hours = parseInt(time[0]);
            var minutes = parseInt(time[1]);

            if (minutes + duration + buffer == 60) {

                hours++;
                minutes = minutes + duration + buffer - 60;

            } else {

                minutes = minutes + duration + buffer;

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

        return {
            getDates: getDates,
            addDurationToAppointmentTime: addDurationToAppointmentTime
        }


    });
