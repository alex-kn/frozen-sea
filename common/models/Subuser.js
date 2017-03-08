'use strict';

module.exports = function(Subuser) {

        Subuser.sendEmail = function(id, to, from, subject, text, html, cb) {
            Subuser.app.models.Email.send({
                to: to,
                from: from,
                subject: subject,
                text: text,
                html: html
            }, function(err, mail) {
                if (err){
                    return cb(err);
                }
                cb(null, mail);
            });

        };

    Subuser.remoteMethod('sendEmail', {
        http: {path: '/:id/sendEmail', verb: 'post', status: 200, errorStatus: 500},
        accepts: [
            {arg: 'id', type: 'string', required: true},
            {arg: 'to', type: 'string', required: true},
            {arg: 'from', type: 'string', required: true},
            {arg: 'subject', type: 'string', required: true},
            {arg: 'text', type: 'string', required: true},
            {arg: 'html', type: 'string'}
        ],
        returns:   {arg: 'mail', type: 'object'}
    });
    };
