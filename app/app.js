var myNinjaApp = angular.module('myNinjaApp', []);

//stuff that run before this is loaded/running
myNinjaApp.config(function(){

});

myNinjaApp.run(function(){

});

//controls app data
// square brackets + dependencies protects furing minification
myNinjaApp.controller('NinjaController', ['$scope', function($scope){
    //defines a var called message
    //when message is called in view, will show hey y'all
    //as long as message is called within the element scope
    $scope.ninjas = [
        {
            name: "yoshi",
            belt:"green",
            rate: 50
        },{
            name: "crystal",
            belt:"green",
            rate: 30
        },{
            name: "shaun",
            belt:"green",
            rate: 10
        },{
            name: "jennie",
            belt:"green",
            rate: 30
        },{
            name: "lima",
            belt:"green",
            rate:1000
        },
    ]

}]);