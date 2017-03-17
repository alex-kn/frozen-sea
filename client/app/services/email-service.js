angular
    .module('EmailService', [])
    .factory('EmailService', ['Subuser', '$http', 'LoopBackAuth', '$filter','ToastService', function (Subuser, $http, LoopBackAuth, $filter,ToastService) {

        /**
         * Sends Email
         * @param to            Email receiver (String)
         * @param from          Email sender (String)
         * @param subject       Email Subject (String)
         * @param text          Email text (String)
         * @param html          Email html (String)
         * @param displayToast  display toast or not(Boolean)
         * @return Object with Success data or Error data
         */
        function sendEmail(to, from, subject, text, html, displayToast) {
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
                if (displayToast){
                    ToastService.setToastText($filter('translate')('EMAIL_SERVICE.EMAIL_SENT'));
                    ToastService.displayToast();
                }
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
