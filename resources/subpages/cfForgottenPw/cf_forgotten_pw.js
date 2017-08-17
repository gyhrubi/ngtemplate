app.controller('cfForgottenPwCtrl', ['$scope', '$http', '$rootScope', 'Webapi', function($scope, $http, $rootScope, Webapi){
    
    $scope.iLostMyPassword = function () {
        
        var promise = Webapi.lost_password_token($rootScope.user.username, '');
        promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) {
                        console.log(data);
                    }
                    //e.error(data);
                } else {
                    console.log(data);
                }
            });
        };
    
    
}]);
                            