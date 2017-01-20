'use strict';

angular.module('userStudy.version', [
  'userStudy.version.interpolate-filter',
  'userStudy.version.version-directive'
])

.value('version', '0.1');
