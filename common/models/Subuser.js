'use strict';
var config = require('../../server/config.json');
var path = require('path');

module.exports = function (Subuser) {

    /**
     * Called after user creation, will send verification email
     *
     */
    Subuser.afterRemote('create', function (context, Subuser, next) {
        console.log('> user.afterRemote triggered');


        var options = {
            host: 'localhost',
            port: 3000,
            //Set host and port for deployment:
            //host: 'frozen-sea.herokuapp.com',
            //port: 80,
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
     * Called on reset password request.
     * Sends email with password reset link
     *
     */
    Subuser.on('resetPasswordRequest', function (info) {

        var app = Subuser.app;
        var options = {};

        options.protocol = 'http';
        options.host = (app && app.get('host')) || 'localhost';
        options.port = (app && app.get('port')) || 3000;

        //Set host and port (maybe protocol) for deployment:
        //options.protocol = 'https';
        //options.host = 'frozen-sea.herokuapp.com';
        //options.port = 80;

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
     *
     * see remoteMethod 'sendEmail'
     *
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

    /**
     * getUsersByRole method for Subuser
     *
     * see remoteMethod 'getUsersByRole'
     *
     */
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

            if (typeof tempMod === "undefined") {
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

                    var counter = 0;
                    for (var i = 0; i < userIds.length; i++) {
                        Subuser.findById(userIds[i], function (err, instance) {
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
                            if ((users.length + counter) === userIds.length) {
                                cb(null, users);
                            }
                        })
                    }
                });
            }
        });
    };


    /**
     * setRole method for Subuser
     *
     * see remoteMethod 'setRole'
     *
     */
    Subuser.setRole = function (id, role, userId, cb) {
        var loopback = require('loopback');
        var Role = loopback.getModel('Role');
        var RoleMapping = loopback.getModel('RoleMapping');

        RoleMapping.findOne({where: {'roleId': role, 'principalId': userId}}, function (err, roleCb) {
            if (roleCb != null) {
                err = 'Role already exists';
                return cb(err);
            }
        });

        Role.findOne({where: {'id': role}}, function (err, roleCb) {
            roleCb.principals.create({
                principalType: RoleMapping.USER,
                principalId: userId
            }, function (err, principal) {
                if (err) return cb(err);
                console.log(principal);

                cb(null, principal);
            });
        });
    };

    /**
     * revokeRole method for Subuser
     *
     * see remoteMethod 'revokeRole'
     *
     */
    Subuser.revokeRole = function (id, role, userId, cb) {
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
     * getVpsByMat method for Subuser
     *
     * see remoteMethod 'getVpsByMat'
     *
     */
    Subuser.getVpsByMat = function (mat, cb) {
        var loopback = require('loopback');
        var Study = loopback.getModel('Study');
        var Participation = loopback.getModel('Participation');
        var Preference = loopback.getModel('Preference');
        var rewardHours = 0;

        Preference.find({where: {matriculationNr: mat}}, function (err, preference) {
            console.log(preference);

            if ((typeof preference[0] === 'undefined')) {
                err = 'Could not find matriculationNr';
                return cb(err);
            }
            else {
                Participation.find({where: {participantId: preference[0].subuserId}}, function (err, userParticipations) {
                    if ((typeof userParticipations[0] === 'undefined')) {
                        cb(null, {matriculationNr: mat, rewardHours: 0});
                    }
                    else {
                        Study.find({}, function (err, study) {
                            if ((typeof study[0] === 'undefined')) {
                                cb(null, {matriculationNr: mat, rewardHours: 0});
                            }
                            else {
                                for (var i = 0; i < study.length; i++) {
                                    for (var j = 0; j < userParticipations.length; j++) {
                                        if (study[i].id.toString().trim() == userParticipations[j].studyId.toString().trim()) {
                                            if (study[i].approved == true) {
                                                if (userParticipations[j].status == 'completed') {
                                                    rewardHours += userParticipations[j].reward_hours;
                                                }
                                            }
                                        }
                                    }
                                }
                                cb(null, {matriculationNr: mat, rewardHours: rewardHours});
                            }
                        })
                    }
                });
            }
        });
    };

    /**
     * getAllVps method for Subuser
     *
     * see remoteMethod 'getAllVps'
     *
     */
    Subuser.getAllVps = function (cb) {
        var loopback = require('loopback');
        var Study = loopback.getModel('Study');
        var Participation = loopback.getModel('Participation');
        var Preference = loopback.getModel('Preference');
        var matNrs = [];
        var allMatVps = [];

        Preference.find({}, function (err, preference) {
            if ((typeof preference[0] === 'undefined')) {
                err = 'No Preferences';
                return cb(err);
            }
            else {
                for (var i = 0; i < preference.length; i++) {
                    if (preference[i].matriculationNr) {
                        matNrs.push(preference[i].matriculationNr);
                    }
                }
                for (var i = 0; i < matNrs.length; i++) {
                    Subuser.getVpsByMat(matNrs[i], function (err, response) {
                        if (err) {
                            return cb(err);
                        }
                        allMatVps.push(response);
                        if (matNrs.length == allMatVps.length) {
                            cb(null, allMatVps);
                        }
                    });
                }
            }
        });
    };

    /**
     * exposes sendEmail method to api: '/:id/sendEmail'
     *
     * @param id            id of current user (for authentification) (String)
     * @param to            Email receiver (String)
     * @param from          Email sender (String)
     * @param subject       Email Subject (String)
     * @param text          Email text (String)
     * @param html          Email html (String)
     * @return Object with Email data
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
     * exposes getUsersByRole method to api: '/:id/byrole/:role'
     *
     * @param id    id of current user (for authentification) (String)
     * @param role  role to get users by (String)
     * @return array with user objects
     *
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

    /**
     * exposes setRole method to api: '/:id/setRole/'
     *
     * @param id        id of current user (for authentification) (String)
     * @param role      role to set user to (String)
     * @param userId    id of the user who's role to set(String)
     * @return return set principal object
     *
     */
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

    /**
     * exposes revokeRole method to api: '/:id/revokeRole/'
     *
     * @param id        id of current user (for authentification) (String)
     * @param role      role to revoke from user to (String)
     * @param userId    id of the user who's role to revoke(String)
     * @return return number of revoked roles
     *
     */
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

    /**
     * exposes getVpsByMat method to api: '/getVpsByMat/:mat'
     * Gets 'versuchspersonenstunden' by matriculation number
     *
     * @param mat       matriculation number (String)
     * @return returns object with matriculation number and vps
     *
     */
    Subuser.remoteMethod('getVpsByMat', {
        accepts: [
            {arg: 'mat', type: 'number', required: true},
        ],
        returns: {arg: 'vps', type: 'object'},
        http: {
            verb: 'get',
            path: '/getVpsByMat/:mat',
            status: 200,
            errorStatus: 500
        }
    });

    /**
     * exposes getAllVps method to api: '/getAllVps/'
     * Gets all 'versuchspersonenstunden' assigned to matriculation numbers
     *
     * @return returns array ob objects with matriculation number and vps
     *
     */
    Subuser.remoteMethod('getAllVps', {
        returns: {arg: 'vps', type: 'array'},
        http: {
            verb: 'get',
            path: '/getAllVps/',
            status: 200,
            errorStatus: 500
        }
    });
};
