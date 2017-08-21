app.controller('cfHeaderContentCtrl', ['$scope','$rootScope','$location','Webapi', function($scope,$rootScope,$location,Webapi){
    
    // Logout function:
    $scope.logout = function (fnCallback) {

            $scope.logoutError = false;
            var promise = Webapi.logout();
            promise.success(function (response) {
                $rootScope.initUser();
                $rootScope.setUserSession();
            })
            promise.error(function (err, status) {
                $rootScope.initUser();
                $scope.logoutError = true;
                $rootScope.setUserSession();
            });

            //$route.reload();

            if (fnCallback) {
                fnCallback();
            }
    }
    
    
}]);