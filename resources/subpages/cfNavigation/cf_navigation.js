app.controller('cf_navigationCtrl', ['$scope', function($scope){  
    
    $scope.activate = "";
    
    $scope.selectNavItem = function(id){
        
        $scope.selectedNavItem = id;

    }  
    
    $scope.navTree = [
        {
            name: "Users",
            icon: "ion-person",
            nodes: [
                {
                    name: "New user",
                    icon: "ion-person-add",
                    route: "#/login"
                },
                {
                    name: "User Groups",
                    icon: "ion-person-stalker",
                    route: "#/test1",
                }
            ]
        },
        {
            name: "Settings",
            icon: "ion-settings",
            nodes: [
                {
                    name: "System",
                    icon: "ion-gear-a",
                    nodes: [
                        {
                            name: "Connections",
                            nodes: [
                                {
                                    name: "Test1",
                                    route: "valami"
                                },
                                {
                                    name: "Test2",
                                    route: "valami"
                                },
                                {
                                    name: "Test3",
                                    route: "valami"
                                }
                            ]                            
                        },
                        {
                            name: "Display",
                            route: "#/test3"                            
                        }
                    ]
                },
                {
                    name: "Messages",
                    icon: "ion-android-mail",
                    route: "#/test4"
                }
            ]
        },
        {
            name: "Events",
            icon: "ion-android-calendar",
            route: "#/test1"                
        },
        {
            name: "Reports",
            icon: "ion-stats-bars",
            route: "#/test5"            
        },
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
                    name: "Forgotten Password",
                    icon: "ion-sad-outline",
                    route: "#/forgottenpw"
                },
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
    
}]);