/**
 * Created by Alex on 11.01.2017.
 */

describe('ArchiveListController', function () {
    var element, scope;

    beforeEach(module('userStudy'));

    beforeEach(module('templates'));

    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element('<archive-list></archive-list>');

        scope = $rootScope.$new();

        $compile(element)(scope);
        scope.$digest();
    }));

    it('should not be empty',function(){
        expect(element.html()).not.toBe('');
    });
})