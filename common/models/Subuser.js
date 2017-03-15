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
                Subuser.destroyById(Subuser.id);
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

    Subuser.getUsersByRole = function (id, role, cb) {
        var loopback = require('loopback');
        var Role = loopback.getModel('Role');
        var userIds = [];
        var users = [];

        Role.find({include: 'principals', where: {name: role}}, function (err, models) {
            if (err) {
                return cb(err);
            }

            var tempMod;
            for (var i = 0; i < models.length; i++) {
                tempMod = models[i]
            }

            if (typeof tempMod === "undefined"){
                var err = 'Role does not exist';
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
                    console.log(userIds);
                    var counter = 0;
                    for (var i = 0; i < userIds.length; i++) {
                        Subuser.findById(userIds[i], function (err, instance) {
                            console.log(instance);

                            if (instance != null) {
                                users.push({
                                    id: instance.id,
                                    firstName: instance.firstName,
                                    secondName: instance.secondName,
                                    email: instance.email
                                });
                            }
                            else {
                              counter++;
                            }
                                if ((users.length+counter) === userIds.length) {
                                    cb(null, users);
                                    console.log(users);
                                }
                        })
                    }
                });
            }
        });
    };

    Subuser.setRole = function (id, role, userId ,cb) {
        var loopback = require('loopback');
        var Role = loopback.getModel('Role');
        var RoleMapping = loopback.getModel('RoleMapping');

        RoleMapping.findOne({ where: { 'roleId': role, 'principalId': userId}}, function(err, roleCb){
            if(roleCb != null){
                err = 'Role already exists';
                return cb(err);
            }
        });

        Role.findOne({ where: { 'id': role}}, function(err, roleCb){
            roleCb.principals.create({
                principalType: RoleMapping.USER,
                principalId: userId
            }, function(err, principal) {
                if (err) return cb(err);

                cb(null, principal);
            });
        });
    };

    Subuser.revokeRole = function (id, role, userId ,cb) {
        var loopback = require('loopback');
        var Role = loopback.getModel('Role');
        var RoleMapping = loopback.getModel('RoleMapping');

        Role.findOne({where: {'name': role}}, function (err, roleCb) {
            roleCb.principals.destroyAll({
                principalType: RoleMapping.USER,
                principalId: userId
            }, function (err, principal) {
                if (err) {
                    return cb(err);
                }
                console.log(principal);
                cb(null, principal);
            });
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

    /**
     * exposes getUsersByRole method to api
     */
    Subuser.remoteMethod('getUsersByRole', {
        accepts: [
            {arg: 'id', type: 'string', required: true},
            {arg: 'role', type: 'string', required: true}
        ],
        returns: {arg: 'users', type: 'array'},
        http: {
            verb: 'get',
            path: '/:id/byrole/:role',
            status: 200,
            errorStatus: 500
        }
    });

    Subuser.remoteMethod('setRole', {
        accepts: [
            {arg: 'id', type: 'string', required: true},
            {arg: 'role', type: 'string', required: true},
            {arg: 'userId', type: 'string', required: true}
        ],
        returns: {arg: 'principal', type: 'object'},
        http: {
            verb: 'post',
            path: '/:id/setRole/',
            status: 200,
            errorStatus: 500
        }
    });

    Subuser.remoteMethod('revokeRole', {
        accepts: [
            {arg: 'id', type: 'string', required: true},
            {arg: 'role', type: 'string', required: true},
            {arg: 'userId', type: 'string', required: true}
        ],
        returns: {arg: 'principal', type: 'object'},
        http: {
            verb: 'post',
            path: '/:id/revokeRole/',
            status: 200,
            errorStatus: 500
        }
    });
};
