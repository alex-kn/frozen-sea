angular
    .module('EmailService', [])
    .factory('EmailService', ['Subuser', '$http', 'LoopBackAuth', function (Subuser, $http, LoopBackAuth) {
        //TODO: Error-Handling, static sender

        /**
         * Sends Email
         * @param to        Email receiver (String)
         * @param from      Email sender (String)
         * @param subject   Email Subject (String)
         * @param text      Email text (String)
         * @param html      Email html (String)
         * @return Object with Success data or Error data
         */
        function sendEmail(to, from, subject, text, html) {
            var data = {
                id: LoopBackAuth.currentUserId,
                to: to,
                from: from,
                subject: subject,
                text: text,
                html: html
            };

            $http.post('/api/Subusers/' + data.id + '/sendEmail', data).then(function (response) {
                console.log(response);
                return response;
            }, function (err) {
                console.log(err);
                return err;
            });
        }

        return {
            sendEmail: sendEmail
        };


    }]);
