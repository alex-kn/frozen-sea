/**
 * Created by Mathis on 19.01.2017.
 */

angular.module('userStudy').filter('filterStudies', function() {

    return function(input, userPreferences, optional2) {
        var out = [];

        angular.forEach(input, function (study) {

            //console.log(typeof study.age_requirement_min_years == 'undefined' || (study.age_requirement_min_years < userPreferences.age)); //old enough
            //console.log(typeof study.age_requirement_max_years == 'undefined' ||(study.age_requirement_max_years < userPreferences.age)); //not too old
            //console.log(typeof study.height_requirement_min_cm == 'undefined' ||(study.height_requirement_min_cm < userPreferences.height)); //tall enough
            //console.log(typeof study.height_requirement_max_cm == 'undefined' ||(study.height_requirement_max_cm < userPreferences.age)); //not too tall
            //console.log((study.requires_ios_experience || userPreferences.ios) || !study.requires_ios_experience); //knows ios
            //console.log((study.requires_excellent_vision || !userPreferences.glasses) || !study.requires_excellent_vision);
            //console.log((study.requires_glasses || userPreferences.glasses) || !study.requires_glasses);
            //console.log((study.requires_glasses || userPreferences.glasses) || !study.requires_glasses);
            //console.log((study.requires_english_skills || userPreferences.english) || !study.requires_english_skills);
            //console.log((study.requires_german_skills || userPreferences.german) || !study.requires_german_skills);
            //console.log((study.requires_lefty || userPreferences.lefty) || !study.requires_lefty);
            //console.log((study.requires_righty || userPreferences.righty) || !study.requires_righty);
            //console.log((study.requires_student || userPreferences.student) || !study.requires_student);
            //console.log((study.requires_non_student || !userPreferences.student) || !study.requires_non_student);

            //console.log((typeof study.requires_study_programme_comma_seperated == 'undefined'
            //    || study.requires_study_programme_comma_seperated.split(',').contains(userPreferences.study_program)));

            //console.log((study.requires_only_male_participants || !userPreferences.gender === "male") || !study.requires_only_male_participants);
            //console.log((study.requires_only_female_participants || !userPreferences.gender === "female") || !study.requires_only_female_participants);


            var isMatch = (typeof study.age_requirement_min_years == 'undefined' || study.age_requirement_min_years < userPreferences.age) //old enough
                && (typeof study.age_requirement_max_years == 'undefined' || study.age_requirement_max_years < userPreferences.age) //not too old
                && (typeof study.height_requirement_min_cm == 'undefined' || study.height_requirement_min_cm < userPreferences.height) //tall enough
                && (typeof study.height_requirement_max_cm == 'undefined' || study.height_requirement_max_cm < userPreferences.age) //not too tall
                && ((study.requires_ios_experience && userPreferences.ios) || !study.requires_ios_experience) //knows ios
                && ((study.requires_excellent_vision && !userPreferences.glasses) || !study.requires_excellent_vision)
                && ((study.requires_glasses && userPreferences.glasses) || !study.requires_glasses)
                && ((study.requires_glasses && userPreferences.glasses) || !study.requires_glasses)
                && ((study.requires_english_skills && userPreferences.english) || !study.requires_english_skills)
                && ((study.requires_german_skills && userPreferences.german) || !study.requires_german_skills)
                && ((study.requires_lefty && userPreferences.lefty) || !study.requires_lefty)
                && ((study.requires_righty && userPreferences.righty) || !study.requires_righty)
                && ((study.requires_student && userPreferences.student) || !study.requires_student)
                && ((study.requires_non_student && !userPreferences.student) || !study.requires_non_student)
                && ((typeof study.requires_study_programme_comma_seperated == 'undefined'
                || study.requires_study_programme_comma_seperated.split(',').contains(userPreferences.study_program)))
                && (typeof userPreferences.gender == 'undefined' ||(study.requires_only_male_participants && userPreferences.gender.male) || !study.requires_only_male_participants)
                && (typeof userPreferences.gender == 'undefined' ||(study.requires_only_female_participants && userPreferences.gender.female) || !study.requires_only_female_participants);


            if (isMatch) {
                out.push(study)
            }
        });

        return out;
    }
})
