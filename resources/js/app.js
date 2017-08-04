var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    
    $routeProvider
    .when('/', { templateUrl: 'resources/subpages/cfLoginPage/login_page.html' })
    .when('/login', { templateUrl: 'resources/subpages/cfLoginPage/login_page.html' })
    .when('/test1', { templateUrl: 'resources/subpages/cfTestPage1/testpage1.html' })
    .when('/test2', { templateUrl: 'resources/subpages/cfTestPage2/testpage2.html' })
    .when('/test3', { templateUrl: 'resources/subpages/cfTestPage3/testpage3.html' })
    .when('/test4', { templateUrl: 'resources/subpages/cfTestPage4/testpage4.html' })
    .when('/test5', { templateUrl: 'resources/subpages/cfTestPage5/testpage5.html' })
    .when('/forgottenpw', { templateUrl: 'resources/subpages/cfForgottenPw/cf_forgotten_pw.html' })
    
}]);

app.controller('appCtrl', ['$scope','$rootScope', function($scope, $rootScope){
 
    $scope.showMobileNavBar = false;
    
    $scope.toggleMobileNavBar = function() {
        $scope.showMobileNavBar = ! $scope.showMobileNavBar;
    };
    
    $rootScope.user = {};
    
    $rootScope.user.isAuthenticated = false;
    $rootScope.user.username = 'kis.pista';
    
}]);