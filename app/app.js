/// <reference types="angular" />
/// <reference types="angular-route" />
var touchstoneTest = angular.module('touchstoneTest', [
    'ngRoute',
    'ngMaterial'
]).directive('myInput', function () {
    return {
        restrict: 'E',
        scope: {
            label: '@',
            model: '=',
            type: '@',
            checkVal: '&?'
        },
        template: "<md-input-container>\n                    <label>{{label}}</label>\n                    <input ng-change=\"checkVal({val:model})\" ng-attr-type=\"{{type}}\" ng-model=\"model\" required=\"\">\n                </md-input-container>"
    };
}).directive('mySelect', function () {
    return {
        restrict: 'E',
        scope: {
            label: '@',
            model: '=',
            options: '=',
            checkVal: '&?'
        },
        template: "<md-input-container>\n                        <label>{{label}}</label>\n                        <md-select ng-model=\"model\" ng-change=\"checkVal({val:model})\">\n                            <md-option ng-repeat=\"opt in options\" value=\"{{opt}}\">\n                                {{opt}}\n                            </md-option>\n                        </md-select>\n                    </md-input-container>"
    };
});
//stuff that run before this is loaded/running
touchstoneTest.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/application', {
            templateUrl: "views/application.html",
            controller: 'touchstoneTestController'
        }).when('/reviewer', {
            templateUrl: "views/reviewer.html"
        }).otherwise({
            redirectTo: '/application'
        });
    }]);
touchstoneTest.run(function () {
});
//controls app data
// square brackets + dependencies protects furing minification
touchstoneTest.controller('touchstoneTestController', ['$scope', function ($scope) {
        //defines a var called message
        //when message is called in view, will show hey y'all
        //as long as message is called within the element scope
        $scope.checkVal = function (val) {
            // check that data is updated correctly
            console.log(val);
            console.log($scope.appInfo);
        };
        $scope.appInfo = {
            personalInfo: {
                flags: [],
                firstName: null,
                lastName: null,
                email: null,
                birthday: null,
            },
            legalStat: {
                flags: [],
                legalStatus: null,
                drivers: {
                    hasDrivers: null,
                    driversType: null,
                },
                numPracticeHours: null,
                prevPRAAttempts: [],
            },
            //written TDM, result, is current?
            medicalEd: {
                flags: [],
                school: null,
                medDegreeName: null,
                gradYr: null,
                edLang: null,
            },
            engProficiency: {
                flags: [],
                test: null,
                score: null,
                expired: null,
                exceeded: null,
                activeUse: null
            },
            exams: {
                flags: [],
                NACDate: null,
                MCCQE2Date: null,
                MCCQE1Date: null,
            },
            postGradTraining: {
                flags: [],
                monthsPostGrad: null,
                monthsIndependent: null,
                completed2Yr: null
            },
            rotations: {
                flags: [],
                completed7: null,
                impairment: null
            }
        };
        $scope.addPrevPRA = function () {
            $scope.checkVal(1);
            console.log("Added PRA");
            $scope.appInfo.legalStat.prevPRAAttempts.push({
                written: null,
                passed: null,
                current: null
            });
        };
        $scope.delPrevPRA = function (i) {
            $scope.checkVal(1);
            console.log("Deleted PRA");
            $scope.appInfo.legalStat.prevPRAAttempts.splice(i, 1);
        };
        $scope.engProficiency = [
            "0 - No experience",
            "1 - Beginner",
            "2 - Conversational",
            "3 - Professional Working Proficiency",
            "4 - Fluent"
        ];
        $scope.immgStat = [
            "Canadian Citizen / Permeaneant Resident",
            "Neither"
        ];
        $scope.trueFalse = [true, false];
        $scope.driversType = [
            "Canadian",
            "International"
        ];
        $scope.engTest = [
            "IELTS", "OET", "CELPIP", "Recent practice in English speaking country"
        ];
    }]);
