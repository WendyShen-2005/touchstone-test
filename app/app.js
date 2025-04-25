/// <reference types="angular" />
/// <reference types="angular-route" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        var _this = this;
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
                hasDrivers: null,
                driversType: null,
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
        $scope.allFieldsFilled = true;
        // backend calls
        $scope.submitApp = function () { return __awaiter(_this, void 0, void 0, function () {
            var key, key2, res, myJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // verify that all required fields are filled in
                        for (key in $scope.appInfo) {
                            for (key2 in $scope.appInfo[key]) {
                                console.log(key + " " + key2);
                                if ($scope.appInfo[key][key2] == null) {
                                    console.log(key + "." + key2 + " not filled");
                                    $scope.allFieldsFilled = false;
                                    return [2 /*return*/];
                                }
                            }
                        }
                        return [4 /*yield*/, fetch('http://localhost:8080/newApp', {
                                method: "POST",
                                body: (JSON.stringify($scope.appInfo)),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        console.log("Submission completed :)");
                        return [4 /*yield*/, res.json()];
                    case 2:
                        myJson = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }]);
