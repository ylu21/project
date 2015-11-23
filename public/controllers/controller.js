var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http){
    console.log("Hellow world from controller");
    
    $http.get('/seatlist').success(function(res){
        console.log("i got the requested data");
        $scope.seatlist = res;
    });
//    person1 = {
//        number: '1',
//        condition: 'yes'
//    };
//    
//    person2 = {
//         number: '2',
//        condition: 'no'
//    };
//    
//     person3 = {
//         number: '3',
//        condition: 'yes'
//    };
//    
//    var seatlist = [person1,person2,person3];
//    $scope.seatlist = seatlist;
    
}]);