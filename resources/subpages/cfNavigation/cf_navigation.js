app.controller('cf_navigationCtrl', ['$scope','$rootScope', function($scope,$rootScope){
    
    $scope.activate = "";
    
    $scope.selectNavItem = function(id){
        
        $scope.selectedNavItem = id;

    }  
    
    $scope.navTree = [
        
        {
            name: "Subpages",
            icon: "ion-document",
            nodes: [
                {
                    name: "Login",
                    icon: "ion-log-in",
                    route: "#/login"
                },
                {
                    name: "Reset Password",
                    icon: "ion-sad-outline",
                    route: "#/forgottenpw"
                },
                {
                    name: "Admin",
                    icon: "ion-lock-combination",
                    route: "#/admin"
                },
                {
                    name: "Registration",
                    icon: "ion-person-add",
                    link: true,
                    route: "#/registration_page"
                },
                {
                    name: "Profile",
                    icon: "ion-person",
                    route: "#/profile"
                },
                {
                    name: "Change Password",
                    icon: "ion-settings",
                    route: "#/change_password_page"
                },
                {
                    name: "Information",
                    icon: "ion-information",
                    route: "#/info"
                }
            ]
        }        
    ];    
    
    // Iterate trough the objects and add id property them with and unique value
    $scope.autoIdNavTree = function(arr,index){
        
        for (i in arr) {
            arr[i]['id'] = "nT-" + index + i;
            if(arr[i].nodes) {                
                $scope.autoIdNavTree(arr[i].nodes,"" + index + i);
            }
        }        
    }
        
    $scope.autoIdNavTree($scope.navTree,"");
    
    $scope.toggleMinNav = function(){
        $rootScope.minLeftNav = !$rootScope.minLeftNav;
    };
    
    
}]);