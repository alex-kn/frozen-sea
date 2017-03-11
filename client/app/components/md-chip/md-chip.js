/**
 * Created by maath on 01.03.2017.
 */
angular.module('userStudy').directive('mdChips', function () {
    return {
        restrict: 'E',
        require: 'mdChips', // Extends the original mdChips directive
        link: function (scope, element, attributes, mdChipsCtrl) {
            mdChipsCtrl.onInputBlur = function () {
                this.inputHasFocus = false;

                // ADDED CODE
                var chipBuffer = this.getChipBuffer();
                if (chipBuffer != "") { // REQUIRED, OTHERWISE YOU'D GET A BLANK CHIP
                    this.appendChip(chipBuffer);
                    this.resetChipBuffer();
                }
                // - EOF - ADDED CODE
            };
        }
    }
});