app.controller('cfAdminPageCtrl', ['$scope','$http', '$rootScope', '$sce','$timeout','Webapi',function($scope, $http, $rootScope, $sce, $timeout,Webapi){
    
   $scope.testApi = function(fnCallback) {

        var promise = Webapi.getLostPw($rootScope.user.username);
        promise.success(function (response) {
            console.log(response);
        })
        promise.error(function (err, status) {
           console.log(err + ' ' + status);
        });

        //$route.reload();

        if (fnCallback) {
            fnCallback();
        }
   }
    
}]);