/**
 * Created by Mathis on 19.01.2017.
 */

angular.module('userStudy').filter('filterStudies', function() {

    return function(input, userPreferences, optional2) {
        var out = [];

        function _calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() - new Date(birthday).getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }


        angular.forEach(input, function (study) {


            var isMatch = (typeof study.minimum_age == 'undefined'
                    || typeof userPreferences.birthDate == 'undefined'
                    || userPreferences.birthDate == '1970-01-01T00:00:00.000Z' //workaround.
                    || study.minimum_age < _calculateAge(userPreferences.birthDate)) //old enough


                && (typeof study.minimum_height == 'undefined'
                    ||typeof userPreferences.height == 'undefined'
                    || study.minimum_height < userPreferences.height) //tall enough


                && (typeof study.operatingSystem_required == 'undefined'
                || typeof userPreferences.operatingSystem == 'undefined'
                    || (study.operatingSystem_required.ios && userPreferences.operatingSystem.ios)
                    || !study.operatingSystem_required.ios) //knows ios (undefined defaults to false)


                && (typeof study.operatingSystem_required == 'undefined'
                || typeof userPreferences.operatingSystem == 'undefined'
                || (study.operatingSystem_required.android && userPreferences.operatingSystem.android)
                || !study.operatingSystem_required.android) //knows android (undefined defaults to false)


                && (typeof study.operatingSystem_required == 'undefined'
                || typeof userPreferences.operatingSystem == 'undefined'
                || (study.operatingSystem_required.windows && userPreferences.operatingSystem.windows)
                || !study.operatingSystem_required.windows) //knows android (undefined defaults to false)


                && (typeof study.visualAid_required == 'undefined'
                || typeof userPreferences.visualAid == 'undefined'
                || (study.visualAid_required.glasses && userPreferences.visualAid.glasses)
                || !study.visualAid_required.glasses)


                && (typeof study.visualAid_required == 'undefined'
                || typeof userPreferences.visualAid == 'undefined'
                || (study.visualAid_required.contactLenses && userPreferences.visualAid.contactLenses)
                || !study.visualAid_required.contactLenses)


                && (typeof study.visualAid_required == 'undefined'
                || typeof userPreferences.visualAid == 'undefined'
                || (study.visualAid_required.none && userPreferences.visualAid.none)
                || !study.visualAid_required.none)


                && (typeof study.language_required == 'undefined'
                || typeof userPreferences.language == 'undefined'
                || (study.language_required.english && userPreferences.language.english)
                || !study.language_required.english)


                && (typeof study.language_required == 'undefined'
                || typeof userPreferences.language == 'undefined'
                || (study.language_required.german && userPreferences.language.german)
                || !study.language_required.german)


                && ((study.required_handedness == 'lefty' && (userPreferences.handedness == 'lefty' || userPreferences.handedness == 'both'))
                || !(study.required_handedness == 'lefty'))


                && ((study.required_handedness == 'righty' && (userPreferences.handedness == 'righty'|| userPreferences.handedness == 'both'))
                || !(study.required_handedness == 'righty'))


                && (typeof study.required_study_programs_array == 'undefined'
                || (study.required_study_programs_array.length > 0 && userPreferences.student)
                || !(study.required_study_programs_array.length > 0))


                && (typeof study.required_study_programs_array == 'undefined'
                || (typeof study.course == 'undefined'
                || study.required_study_programs_array.indexOf(userPreferences.course)>-1))


                && (typeof userPreferences.gender == 'undefined'
                || typeof study.required_gender == 'undefined'
                || (study.required_gender.male && userPreferences.gender == 'male')
                || !study.required_gender.male)


                && (typeof userPreferences.gender == 'undefined'
                || typeof study.required_gender == 'undefined'
                ||(study.required_gender.female && userPreferences.gender == 'female')
                || !study.required_gender.female);



            //Unapproved studies should not be shown
            if(!study.approved ) {
                isMatch = false;
            }

            //The owner should always see his own studies
            if(study.ownerId == userPreferences.subuserId) {
                isMatch = true;
            }


            //The owner should always see his own studies //TODO
            if(study.ownerId == userPreferences.subuserId) {
            }

            //Advisors should see all studies //TODO
            if(study.ownerId == userPreferences.subuserId) {
            }



            if (isMatch) {
                out.push(study)
            }
        });

        return out;
    }
});
