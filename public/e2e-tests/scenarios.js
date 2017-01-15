'use strict';
describe('UserStudy Application', function () {
    describe('authentication', function () {
        beforeEach(function() {
            browser.get('/#!/');
        });
        var username = element(by.model('email'));
        var password = element(by.model('password'));
        var EC = protractor.ExpectedConditions;
        it('should login to the application as the user enters a correct username and password', function () {
            username.sendKeys('jorst@test.de');
            password.sendKeys('1337');
            element(by.buttonText('Einloggen')).click();
            expect(browser.getLocationAbsUrl()).toMatch('/home');
        });
        it('should logout from the application', function () {
         element(by.css('[ng-click="openMenu($mdOpenMenu, $event)"]')).click();
         element(by.css('[ng-click="logout()"]')).click();
         expect(browser.getLocationAbsUrl()).toMatch('/');
         });
        it('should fail to login with incorrect user credentials', function () {
         username.sendKeys('jorst');
         password.sendKeys('3789h');
         element(by.buttonText('Einloggen')).click();
         expect(EC.visibilityOf($('.error-message')));
         });
    });
    describe('registration', function() {
        //test registration
    });
});
