/// <reference types="angular" />
/// <reference types="angular-route" />

var touchstoneTest = angular.module('touchstoneTest', [
    'ngRoute',
    'ngMaterial'
]);


//stuff that run before this is loaded/running
touchstoneTest.config( ['$routeProvider', function($routeProvider: { when: (arg0: string, arg1: { templateUrl: string; }) => { (): any; new(): any; when: { (arg0: string, arg1: { templateUrl: string; }): { (): any; new(): any; otherwise: { (arg0: { redirectTo: string; }): void; new(): any; }; }; new(): any; }; }; }){

    $routeProvider
        .when('/application', {
            templateUrl: "views/application.html",
            controller:'touchstoneTestController'
        }).when('/reviewer', {
            templateUrl: "views/reviewer.html"
        }).otherwise({
            redirectTo:'/application'
        });

}]);

touchstoneTest.run(function(){

});

//controls app data
// square brackets + dependencies protects furing minification
touchstoneTest.controller('touchstoneTestController', ['$scope', function($scope){
    //defines a var called message
    //when message is called in view, will show hey y'all
    //as long as message is called within the element scope
    $scope.ninjas = [
        {
            name: "yoshi",
            belt:"green",
            rate: 50,
            available:true
        },{
            name: "crystal",
            belt:"green",
            rate: 30,
            available:true

        },{
            name: "shaun",
            belt:"green",
            rate: 10,
            available:false
        },{
            name: "jennie",
            belt:"green",
            rate: 30,
            available:false
        },{
            name: "lima",
            belt:"green",
            rate:1000,
            available:true
        },
    ]
    $scope.engProficiency = [
        "0 - No experience",
        "1 - Beginner",
        "2 - Conversational",
        "3 - Professional Working Proficiency",
        "4 - Fluent"
    ]
    $scope.immgStat = [
        "Canadian Citizen / Permeaneant Resident",
        "Neither"
    ]

}]);