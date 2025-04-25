/// <reference types="angular" />
/// <reference types="angular-route" />
 
var touchstoneTest = angular.module('touchstoneTest', [
    'ngRoute',
    'ngMaterial'
]).directive('myInput', function() {
    return {
        restrict:'E',
        scope: {
            label:'@',
            model:'=',
            type:'@',
            checkVal: '&?'
        },
        template:`<md-input-container>
                    <label>{{label}}</label>
                    <input ng-change="checkVal({val:model})" ng-attr-type="{{type}}" ng-model="model" required="">
                </md-input-container>`
    };
}).directive('mySelect', function(){
    return {
        restrict:'E',
        scope: {
            label:'@',
            model:'=',
            options:'=',
            checkVal: '&?'
        },
        template: `<md-input-container>
                        <label>{{label}}</label>
                        <md-select ng-model="model" ng-change="checkVal({val:model})">
                            <md-option ng-repeat="opt in options" value="{{opt}}">
                                {{opt}}
                            </md-option>
                        </md-select>
                    </md-input-container>`
    }
}).directive('myAppInfo', function(){
    return {
        restrict:'E',
        scope: {
            label:'@',
            data:'='
        },
        template:`<div style="margin:0 20px">
                        <b>{{label}}</b>
                        <p>{{data}}</p>
                    </div>`
    }
}).directive('redFlags', function(){
    return {
        restrict:'E',
        scope:{
            flagData:'='
        },
        template:`<div ng-show="flagData.length() != 0">
            <h3>Red flags</h3>
            <div>
                <div ng-repeat="flag in flagData">
                    <p>! {{flag.msg}}</p>
                    <md-button>Aknowledge</md-button>
                </div>
            </div>
        </div>`
    }
});

//stuff that run before this is loaded/running
touchstoneTest.config( ['$routeProvider', function($routeProvider: { when: (arg0: string, arg1: { templateUrl: string; }) => { (): any; new(): any; when: { (arg0: string, arg1: { templateUrl: string; }): { (): any; new(): any; otherwise: { (arg0: { redirectTo: string; }): void; new(): any; }; }; new(): any; }; }; }){

    $routeProvider
        .when('/application', {
            templateUrl: "views/application.html",
            controller:'touchstoneTestController'
        }).when('/reviewer', {
            templateUrl: "views/reviewer.html",
            controller:'reviewerController'
        }).when('/review/:id', {
            templateUrl: "views/reviewSpecApp.html",
            controller:'reviewAppController'
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
    $scope.checkVal = (val: string) => {
        // check that data is updated correctly
        console.log(val);
        console.log($scope.appInfo);
      };

    $scope.appInfo = {
        personalInfo: {
            flags:[],
            firstName:null,
            lastName:null,
            email:null,
            birthday:null,
        },
        legalStat: {
            flags:[],
            legalStatus:null,
            hasDrivers:null,
            driversType:null,
            numPracticeHours:null,
            prevPRAAttempts: [],
        },
       //written TDM, result, is current?
       medicalEd: {
        flags:[],
        school:null,
        medDegreeName:null,
        gradYr:null,
        edLang:null,
       },
       engProficiency:{
        flags:[],
        test:null,
        score:null,
        expired:null,
        activeUse:null
       },
       exams:{
        flags:[],
        NACDate:null,
        MCCQE2Date:null,
        MCCQE1Date:null,
       },
       postGradTraining:{
        flags:[],
        monthsPostGrad:null,
        monthsIndependent:null,
       },
       rotations:{
        flags:[],
        completed7:null,
        impairment:null
       }
    }

    $scope.addPrevPRA = () => {
        $scope.checkVal(1)
        console.log("Added PRA")
        $scope.appInfo.legalStat.prevPRAAttempts.push({
            written:null,
            passed:null,
            current:null
        })
    }
    $scope.delPrevPRA = (i:number) => {
        $scope.checkVal(1)

        console.log("Deleted PRA")
        $scope.appInfo.legalStat.prevPRAAttempts.splice(i, 1);
    }

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
    $scope.trueFalse = [true, false];
    $scope.driversType = [
        "Canadian",
        "International"
    ]
    $scope.engTest = [
        "IELTS", "OET", "CELPIP", "Recent practice in English speaking country"
    ]

    $scope.allFieldsFilled = true;


    // backend calls

    $scope.submitApp = async () => {

        // verify that all required fields are filled in
        for(const key in $scope.appInfo) {
            for(const key2 in $scope.appInfo[key]) {
                console.log(key + " " + key2)
                if($scope.appInfo[key][key2] == null) {
                    console.log(key + "." + key2 + " not filled");
                    $scope.allFieldsFilled = false;
                    return;
                }
            }
        }

        const res = await fetch('http://localhost:8080/newApp', {
            method:"POST",
            body:(JSON.stringify($scope.appInfo)),
            headers: {
                'Content-Type':'application/json'
            }
        });
        const myJson = await res.json();
        console.log("Submission completed :)")
    }

    // REVIEWERES CONTROLLER

}]);

touchstoneTest.controller('reviewerController', ['$scope', '$http', function($scope, $http){
    $scope.apps;

    $http.get('http://localhost:8080/allApps')
        .then(function(res:any) {
            $scope.apps = res.data;
            console.log($scope.apps)
        })

}])


touchstoneTest.controller('reviewAppController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    const userId = $routeParams.id;
    $scope.appData;

    $http.get(`http://localhost:8080/specApp/${userId}`)
        .then(function(res:any) {
            $scope.appData = res.data;

            console.log("Applicant data loaded.", $scope.appData)
        })


}])