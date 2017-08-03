app.controller('cfHeaderContentCtrl', ['$scope', function($scope){
    
    $scope.showDropDown = false;    
    
    $scope.toggleDropDown = function() {
        
        $scope.showDropDown = !$scope.showDropDown;
          
    }
    
}]);