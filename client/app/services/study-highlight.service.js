/**
 * Created by Mathis on 15.03.2017.
 */
angular
    .module('StudyHighlightService', [])
    .factory('StudyHighlightService', ['Participation', 'LoopBackAuth', function (Participation, $http, LoopBackAuth) {

        function highlightStudy(studies, userId) {

            return new Promise(function(resolve, reject) {

                //highlight studies of special interest
                studies.forEach(function (study) {
                    study.isThisMyOwnStudy = study.ownerId === userId;
                    study.isFinished = new Date(study.endDate) < new Date();
                    study.isApproved = study.approved;

                    study.isThisAStudyISupervise = false; //TODO
                    study.isThisAStudyISuperviseAndNeedsApproval = false; //TODO


                    Participation.find({filter: {
                        where: {
                            participantId: userId,
                            studyId: study.id
                        }
                    }}, function (response) {
                        if(response != undefined) {
                            response.forEach(function (participation) {
                                if (participation.status == "pending") {
                                    study.isThisAStudyIParticipateInAndIAmNotApproved = true;
                                }
                                if (participation.status == "confirmed") {
                                    study.isThisAStudyIParticipateInAndIAmApproved = true;
                                }
                                if (participation.status == "absent") {
                                    study.isThisAStudyIParticipateInAndIDIDNTFinishedIt = true;
                                }
                                if (participation.status == "completed") {
                                    study.isThisAStudyIParticipateInAndIFinishedIt = true;
                                }
                            });
                        }
                        return studies
                    });


                });


            });

        }

        return {
            highlightStudy: highlightStudy
        };


    }]);