app.controller('cfHeaderContentCtrl', ['$scope','$rootScope','$location','Webapi', function($scope,$rootScope,$location,Webapi){
    
    $scope.showDropDown = false;    
    
    $scope.toggleDropDown = function() {
        
        $location.path() !== '/login' ? $scope.enableLoginPage = true : $scope.enableLoginPage=false;
        
        $scope.showDropDown = !$scope.showDropDown;
          
    }
    
    
}]);