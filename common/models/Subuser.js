'use strict';
var config = require('../../server/config.json');
var path = require('path');

module.exports = function (Subuser) {

    /**
     * Called after user creation, will send verification email
     */
    Subuser.afterRemote('create', function (context, Subuser, next) {
        console.log('> user.afterRemote triggered');

        var options = {
            type: 'email',
            to: Subuser.email,
            from: 'frzn.sea@gmail.com',
            subject: 'Thanks for registering.',
            //template: path.resolve(__dirname, '../../server/views/verify.ejs'),
            redirectTo: '/',
            user: Subuser
        };


        Subuser.verify(options, function (err, response) {
            if (err) {
                Subuser.deleteById(Subuser.id);
                next(err);
                return;
            }

            console.log('> verification email sent:', response);
            next();
        });
    });

    /**
     *  Workaround for a bug in loopbacks user.verify function.
     *  (options.redirectTo with other route than '/' will mess up the /confirm API call)
     *
     *  Will execute redirect "manually" after /confirm call.
     */
    Subuser.afterRemote('confirm', function (context, Subuser, next) {
        var res = context.res;
        res.redirect('/#!/login/verified');
    });


    /**
     * Handles reset password request.
     * Sends email with password reset link
     */
    Subuser.on('resetPasswordRequest', function (info) {

        //Get Path parameters
        var app = Subuser.app;
        var options = {};

        options.protocol = 'http';
        //options.protocol = 'https';
        options.host = (app && app.get('host')) || 'localhost';
        options.port = (app && app.get('port')) || 3000;
        options.restApiRoot = (app && app.get('restApiRoot')) || '/api';

        var displayPort = (
            (options.protocol === 'http' && options.port == '80') ||
            (options.protocol === 'https' && options.port == '443')
        ) ? '' : ':' + options.port;

        Subuser.app.models.Email.send({
            to: info.email,
            from: 'frzn.sea@gmail,com',
            subject: 'Reset Password',
            text: 'Click on the following link to reset your password: ' + options.protocol + '://' + options.host + displayPort + '/#!/reset-password/' + info.accessToken.id + '/' + info.user.id,
            html: 'Click on the following link to reset your password: ' + options.protocol + '://' + options.host + displayPort + '/#!/reset-password/' + info.accessToken.id + '/' + info.user.id
        }, function (err, mail) {
            if (err) {
                return err;
            }
            return mail;
        });

    });

    /**
     * sendEmail method for Subuser
     */
    Subuser.sendEmail = function (id, to, from, subject, text, html, cb) {
        Subuser.app.models.Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text,
            html: html
        }, function (err, mail) {
            if (err) {
                return cb(err);
            }
            cb(null, mail);
        });

    };

    Subuser.getUsersByRole = function (role, cb) {
        var loopback = require('loopback');
        var Role = loopback.getModel('Role');
        var allRoles = [];
        var userIds = [];
        Role.find({}, function (err, models) {
            for (var i = 0; i < models.length; i++) {
                allRoles.push(models[i].name);
            }
        });

        var isRole = function include(allRoles, role) {
            for(var i=0; i<allRoles.length; i++) {
                if (allRoles[i] == role)
                    return true;
            }
        };
        if (isRole == true){
            var err = 'Role does not exist';
            return cb(err);
        }

        Role.find({include: 'principals', where: {name: role}}, function (err, models) {
            if (err) {
                return cb(err);
            }

            var tempMod;
            for (var i = 0; i < models.length; i++) {
                tempMod = models[i]
            }

            if(tempMod == 'undefined'){
                err = 'Role does not exist';
                return cb(err);
            }
            else {
                tempMod.principals(function (err, principals) {
                    if (err) {
                        return cb(err);
                    }

                    for (var i = 0; i < principals.length; i++) {
                        userIds.push(principals[i].principalId);
                    }
                });

                cb(null, userIds);
            }
        });
    };

    /**
     * exposes sendEmail method to api
     */
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
        returns: {arg: 'mail', type: 'object'}
    });

    Subuser.remoteMethod('getUsersByRole', {
        accepts: [
            {arg: 'role', type: 'string', required: true}
        ],
        returns: {arg: 'users', type: 'array'},
        http: {
            verb: 'get',
            path: '/byrole/:role',
            status: 200,
            errorStatus: 500
        }
    });
};
