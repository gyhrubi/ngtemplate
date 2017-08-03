app.controller('cfHeaderContentCtrl', ['$scope','$location', function($scope,$location){
    
    $scope.showDropDown = false;    
    
    $scope.toggleDropDown = function() {
        
        $location.path() !== '/login' ? $scope.enableLoginPage = true : $scope.enableLoginPage=false;
        
        $scope.showDropDown = !$scope.showDropDown;
          
    }
    
}]);