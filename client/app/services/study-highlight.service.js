/**
 * Created by Mathis on 15.03.2017.
 */
angular
    .module('StudyHighlightService', [])
    .factory('StudyHighlightService', ['Participation', 'LoopBackAuth', function (Participation, $http, LoopBackAuth) {

        function highlightStudy(studies, userId) {

        //highlight studies of special interest
            studies.forEach(function (study) {
                study.isThisMyOwnStudy = study.ownerId === userId;
                study.isFinished = new Date(study.endDate) < new Date();
                study.isApproved = study.approved;

                study.isThisAStudyISupervise = false; //TODO
                study.isThisAStudyISuperviseAndNeedsApproval = false; //TODO

                Participation.count({
                    where: {
                        participantId: userId,
                        studyId: study.id,
                        status: "pending"
                    }
                }, function (response) {
                    study.isThisAStudyIParticipateInAndIAmNotApproved = response.count > 0;
                });

                Participation.count({
                    where: {
                        participantId: userId,
                        studyId: study.id,
                        status: "confirmed"
                    }
                }, function (response) {
                    study.isThisAStudyIParticipateInAndIAmApproved = response.count > 0
                });

                Participation.count({
                    where: {
                        participantId: userId,
                        studyId: study.id,
                        status: "absent"
                    }
                }, function (response) {
                    study.isThisAStudyIParticipateInAndIDIDNTFinishedIt = response.count > 0;
                });

                Participation.count({
                    where: {
                        participantId: userId,
                        studyId: study.id,
                        status: "completed"
                    }
                }, function (response) {
                    study.isThisAStudyIParticipateInAndIFinishedIt = response.count > 0
                });
            });

            return studies;
        }

        return {
            highlightStudy: highlightStudy
        };


    }]);