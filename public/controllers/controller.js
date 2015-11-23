var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http){
    console.log("Hellow world from controller");
    
    $http.get('/').success(function(res){
        console.log("i got the requested data");
    });
    
//    $scope.addSeat = function(){
//      console.log($scope.seat);   
//    };
    
}]);