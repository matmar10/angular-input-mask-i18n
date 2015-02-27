var StringMask = require('../bower_components/string-mask/src/string-mask.js');

describe('ui.utils.masks.number', function () {
    beforeEach(function () {
        browser.get('/demo');
    });

    it('should load the demo page', function () {
        expect(browser.getTitle()).toEqual('Angular Mask Demo');
    });

    describe('ui-phone-number:', function () {
        it('should apply a phone number mask while the user is typing for country br', function () {
            var BS = protractor.Key.BACK_SPACE;

            var tests = [
                {key: '1', viewValue: '(1', modelValue: '1'},
                {key: '2', viewValue: '(12', modelValue: '12'},
                {key: '3', viewValue: '(12) 3', modelValue: '123'},
                {key: '4', viewValue: '(12) 34', modelValue: '1234'},
                {key: '5', viewValue: '(12) 345', modelValue: '12345'},
                {key: '6', viewValue: '(12) 3456', modelValue: '123456'},
                {key: '7', viewValue: '(12) 34567', modelValue: '1234567'},
                {key: '8', viewValue: '(12) 34567-8', modelValue: '12345678'},
                {key: '9', viewValue: '(12) 34567-89', modelValue: '123456789'},
                {key: '0', viewValue: '(12) 34567-890', modelValue: '1234567890'},
                {key: '1', viewValue: '(12) 34567-8901', modelValue: '12345678901'},
                {key: '2', viewValue: '(12) 34567-8901', modelValue: '12345678901'},
                {key: BS, viewValue: '(12) 34567-890', modelValue: '1234567890'},
                {key: BS, viewValue: '(12) 34567-89', modelValue: '123456789'},
                {key: BS, viewValue: '(12) 34567-8', modelValue: '12345678'},
                {key: BS, viewValue: '(12) 34567', modelValue: '1234567'},
                {key: BS, viewValue: '(12) 3456', modelValue: '123456'},
                {key: BS, viewValue: '(12) 345', modelValue: '12345'},
                {key: BS, viewValue: '(12) 34', modelValue: '1234'},
                {key: BS, viewValue: '(12) 3', modelValue: '123'},
                {key: BS, viewValue: '(12', modelValue: '12'},
                {key: BS, viewValue: '(1', modelValue: '1'},
                {key: BS, viewValue: '', modelValue: ''}
            ];

            var input = element(by.model('phoneNumber')),
                value = element(by.binding('phoneNumber'));

            for (var i = 0; i < tests.length; i++) {
                input.sendKeys(tests[i].key);
                expect(input.getAttribute('value')).toEqual(tests[i].viewValue);
                expect(value.getText()).toEqual(tests[i].modelValue);
            }
        });

        it('should apply a phone number mask while the user is typing for country us', function () {
            var BS = protractor.Key.BACK_SPACE;

            var tests = [
                {key: '1', viewValue: '(1', modelValue: '1'},
                {key: '2', viewValue: '(12', modelValue: '12'},
                {key: '3', viewValue: '(123', modelValue: '123'},
                {key: '4', viewValue: '(123) 4', modelValue: '1234'},
                {key: '5', viewValue: '(123) 45', modelValue: '12345'},
                {key: '6', viewValue: '(123) 456', modelValue: '123456'},
                {key: '7', viewValue: '(123) 456-7', modelValue: '1234567'},
                {key: '8', viewValue: '(123) 456-78', modelValue: '12345678'},
                {key: '9', viewValue: '(123) 456-789', modelValue: '123456789'},
                {key: '0', viewValue: '(123) 456-7890', modelValue: '1234567890'},
                {key: '1', viewValue: '(123) 456-7890', modelValue: '1234567890'},
                {key: '2', viewValue: '(123) 456-7890', modelValue: '1234567890'},
                {key: BS, viewValue: '(123) 456-789', modelValue: '123456789'},
                {key: BS, viewValue: '(123) 456-78', modelValue: '12345678'},
                {key: BS, viewValue: '(123) 456-7', modelValue: '1234567'},
                {key: BS, viewValue: '(123) 456', modelValue: '123456'},
                {key: BS, viewValue: '(123) 45', modelValue: '12345'},
                {key: BS, viewValue: '(123) 4', modelValue: '1234'},
                {key: BS, viewValue: '(123', modelValue: '123'},
                {key: BS, viewValue: '(12', modelValue: '12'},
                {key: BS, viewValue: '(1', modelValue: '1'},
                {key: BS, viewValue: '', modelValue: ''}
            ];

            var input = element(by.model('phoneNumber2')),
                value = element(by.binding('phoneNumber2'));

            for (var i = 0; i < tests.length; i++) {
                input.sendKeys(tests[i].key);
                expect(input.getAttribute('value')).toEqual(tests[i].viewValue);
                expect(value.getText()).toEqual(tests[i].modelValue);
            }
        });

        it('should apply a phone number mask in a model with default value:', function () {
            var BS = protractor.Key.BACK_SPACE;

            var tests = [
                {key: '1', viewValue: '(1', modelValue: '1'},
                {key: '2', viewValue: '(12', modelValue: '12'},
                {key: '3', viewValue: '(12) 3', modelValue: '123'},
                {key: '4', viewValue: '(12) 34', modelValue: '1234'},
                {key: '5', viewValue: '(12) 345', modelValue: '12345'},
                {key: '6', viewValue: '(12) 3456', modelValue: '123456'},
                {key: '7', viewValue: '(12) 34567', modelValue: '1234567'},
                {key: '8', viewValue: '(12) 34567-8', modelValue: '12345678'},
                {key: BS, viewValue: '(12) 34567', modelValue: '1234567'},
                {key: BS, viewValue: '(12) 3456', modelValue: '123456'},
                {key: BS, viewValue: '(12) 345', modelValue: '12345'},
                {key: BS, viewValue: '(12) 34', modelValue: '1234'},
                {key: BS, viewValue: '(12) 3', modelValue: '123'},
                {key: BS, viewValue: '(12', modelValue: '12'},
                {key: BS, viewValue: '(1', modelValue: '1'},
                {key: BS, viewValue: '', modelValue: ''}
            ];

            var input = element(by.model('initializedPhoneNumber')),
                value = element(by.binding('initializedPhoneNumber'));

            expect(input.getAttribute('value')).toEqual('(31) 33536-767');
            input.clear();

            for (var i = 0; i < tests.length; i++) {
                input.sendKeys(tests[i].key);
                expect(input.getAttribute('value')).toEqual(tests[i].viewValue);
                expect(value.getText()).toEqual(tests[i].modelValue);
            }
        });

        // it('should validate a phone number:', function () {

            // expect(element(by.css('input[ng-valid-us-phone-number]')).isElementPresent()).toBe(true);

            // var input = element(by.model('phoneNumber2'));
            // input.sendKeys('4155551212');
            // expect(element(by.css('input[ng-valid-us-phone-number]')).isElementPresent()).toBe(true);
            // expect(element(by.css('input[name="phoneNumber2"]')).isPresent()).toBe(true);

            /*
             var tests = {
             // phone, valid
             '4156014879': true
             };

             var input = element(by.model('phoneNumber2'));

             var phone;
             for (phone in tests) {
             if (!tests.hasOwnProperty(phone)) {
             continue;
             }
             input.sendKeys(phone);
             console.log('ATTRIBUTE IS: ' + input.hasOwnProperty('ng-valid-us-phone-number'));
             expect(input.hasOwnProperty(phone)).toEqual(tests[phone]);
             }
             */
        // });
    });
});
