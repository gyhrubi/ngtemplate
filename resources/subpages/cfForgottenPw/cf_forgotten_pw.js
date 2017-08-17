app.controller('cfForgottenPwCtrl', ['$scope', '$http', '$rootScope', 'Webapi', function($scope, $http, $rootScope, Webapi){
    
    
    $scope.iLostMyPassword = function () {
        
        var lostUserSend = $scope.lostUser;
        $scope.lostUser = "";
        
        var promise = Webapi.lost_password_token(lostUserSend);
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
                            