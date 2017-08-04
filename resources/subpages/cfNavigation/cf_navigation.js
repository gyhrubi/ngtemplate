app.controller('cf_navigationCtrl', ['$scope', function($scope){  
    
    $scope.activate = "";
    
    $scope.selectNavItem = function(id){
        
        $scope.selectedNavItem = id;

    }  
    
    $scope.navTree = [
        {
            name: "Users",
            id: "l1",
            icon: "ion-person",
            link: false,
            nodes: [
                {
                    name: "New user",
                    id: "l11",
                    icon: "ion-person-add",
                    link: true,
                    route: "#/login"
                },
                {
                    name: "User Groups",
                    id: "l12",
                    icon: "ion-person-stalker",
                    route: "#/test1",
                    link: true
                }
            ]
        },
        {
            name: "Settings",
            id: "l2",
            icon: "ion-settings",
            link: false,
            nodes: [
                {
                    name: "System",
                    id: "l21",
                    icon: "ion-gear-a",
                    link: false,
                    nodes: [
                        {
                            name: "Connections",
                            id: "l211",
                            link: true,
                            route: "#/test2"                            
                        },
                        {
                            name: "Dsiplay",
                            id: "l212",
                            link: true,
                            route: "#/test3"                            
                        }
                    ]
                },
                {
                    name: "Messages",
                    id: "l22",
                    icon: "ion-android-mail",
                    link: true,
                    route: "#/test4"
                }
            ]
        },
        {
            name: "Events",
            id: "l3",
            icon: "ion-android-calendar",
            link: true,
            route: "#/test1"                
        },
        {
            name: "Reports",
            id: "l4",
            icon: "ion-stats-bars",
            link: true,
            route: "#/test5"            
        },
        {
            name: "Subpages",
            id: "l5",
            icon: "ion-document",
            link: false,
            nodes: [
                {
                    name: "Login",
                    id: "l51",
                    icon: "ion-log-in",
                    link: true,
                    route: "#/login"
                },
                {
                    name: "Forgotten Password",
                    id: "l52",
                    icon: "ion-sad-outline",
                    link: true,
                    route: "#/forgottenpw"
                },
            ]
        }
        
    ];
    
    
}]);