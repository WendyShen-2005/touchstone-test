/// <reference types="angular" />
/// <reference types="angular-route" />
 
var touchstoneTest = angular.module('touchstoneTest', [
    'ngRoute',
    'ngMaterial'
]).directive('myInput', function() {//text, number, date, etc.
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
}).directive('mySelect', function(){//drop down menues
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
}).directive('myAppInfo', function(){//displays small amount of data and what it represents (ex: First name: Wendy)
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
}).directive('redFlags', function(){//displays redFlags and allows reviewerers to do actions about the flag
    return {
        restrict:'E',
        scope:{
            flagData:'=',
            key:'@',
            acknowledgeFunc:'&?',
            overrideFunc:'&?'
        },
        template:`<div class="red-flag" ng-show="flagData.length != 0">
            <h4>Red flags</h4>
            <div>
                <div class="flexWrap" style="justify-content:space-between" ng-repeat="flag in flagData track by $index">
                    <p>! {{flag.msg}}</p>
                    <p>Acknowledged: {{flag.aknowledged}}</p>
                    <md-button ng-click="acknowledgeFunc({key:key, index:$index})">Acknowledged</md-button>
                    <md-button ng-click="overrideFunc({key:key, index:$index})">Dismiss</md-button>
                </div>
            </div>
        </div>`
    }
});

//stuff that run before this is loaded/running
touchstoneTest.config( ['$routeProvider', function($routeProvider: { when: (arg0: string, arg1: { templateUrl: string; }) => { (): any; new(): any; when: { (arg0: string, arg1: { templateUrl: string; }): { (): any; new(): any; otherwise: { (arg0: { redirectTo: string; }): void; new(): any; }; }; new(): any; }; }; }){

    // client routes
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
        }).when('/submitted', {
            templateUrl: "views/submissoinComplete.html",
        }).otherwise({
            redirectTo:'/application'
        });

}]);

// touchstoneTest.run(function(){

// });

//controls app data
// square brackets + dependencies protects furing minification

// application.html's controller
touchstoneTest.controller('touchstoneTestController', ['$scope', function($scope){

    //verify data was update correctly
    $scope.checkVal = (val: string) => {
        console.log(val);
        console.log($scope.appInfo);
      };

    //   applicant data template that gets updated as client fills in info
    $scope.appInfo = {
        personalInfo: {
            redFlags:[],
            firstName:null,
            lastName:null,
            email:null,
            birthday:null,
        },
        legalStat: {
            redFlags:[],
            legalStatus:null,
            hasDrivers:null,
            driversType:false,
            numPracticeHours:null,
        },
        prevPRA: {
            redFlags:[],
            prevPRAAttempts: [],
        },
       //written TDM, result, is current?
       medicalEd: {
        redFlags:[],
        school:null,
        medDegreeName:null,
        gradYr:null,
        edLang:null,
       },
       engProficiency:{
        redFlags:[],
        test:null,
        score:null,
        expired:false,
        activeUse:null
       },
       exams:{
        redFlags:[],
        NACDate:null,
        MCCQE2Date:null,
        MCCQE1Date:null,
       },
       postGradTraining:{
        redFlags:[],
        monthsPostGrad:null,
        monthsIndependent:null,
       },
       rotations:{
        redFlags:[],
        completed7:null,
        impairment:null
       }
    }

    // add PRA
    $scope.addPrevPRA = () => {
        $scope.checkVal(1)
        console.log("Added PRA")
        $scope.appInfo.prevPRA.prevPRAAttempts.push({
            written:null,
            passed:null,
            current:null
        })
    }

    // del PRA
    $scope.delPrevPRA = (i:number) => {
        $scope.checkVal(1)

        console.log("Deleted PRA")
        $scope.appInfo.prevPRA.prevPRAAttempts.splice(i, 1);
    }

    //immigration status
    $scope.immgStat = [
        "Canadian Citizen / Permeaneant Resident",
        "Neither"
    ]

    //true and false 
    $scope.trueFalse = [true, false];

    // drivers license type
    $scope.driversType = [
        "Canadian",
        "International"
    ]

    // english proficiency proof
    $scope.engTest = [
        "IELTS", "OET", "CELPIP", "Recent practice in English speaking country"
    ]

    // for when user submits, this is updated to false when user submits an incomplete form
    $scope.allFieldsFilled = true;


    // backend calls

    // submitting new application
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

        // updating data in db.json
        const res = await fetch('http://localhost:8080/newApp', {
            method:"POST",
            body:(JSON.stringify($scope.appInfo)),
            headers: {
                'Content-Type':'application/json'
            }
        });
        const myJson = await res.json();
        console.log("Submission completed :)");
        window.location.href = window.location.href + "../submitted";
    }

}]);

// reviewer.html's controller
touchstoneTest.controller('reviewerController', ['$scope', '$http', function($scope, $http){
    $scope.apps;

    // get all applicants data
    $http.get('http://localhost:8080/allApps')
        .then(function(res:any) {
            $scope.apps = res.data;
            console.log($scope.apps)
        })

}])

// reviewSpecApp.html's controller
touchstoneTest.controller('reviewAppController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    const userId = $routeParams.id;
    $scope.appData;

    $http.get(`http://localhost:8080/specApp/${userId}`)
        .then(function(res:any) {
            $scope.appData = res.data;

            console.log("Applicant data loaded.", $scope.appData)
        })
    // acknowledge a flag
    $scope.aknowFunc =  (key:string, index:number) => {
        console.log(key + " " + index);
        $scope.appData[key].redFlags[index].aknowledged = true;
        console.log(        $scope.appData[key]
        )
    }
    $scope.overrideFlag =  (key:string, index:number) => {
        console.log(key + " " + index);
        $scope.appData[key].redFlags.splice(index, 1);
    }

}])