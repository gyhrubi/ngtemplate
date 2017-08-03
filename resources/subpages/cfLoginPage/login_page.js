(function () {
    'use strict';

    angular.module('app')
        .controller('login_pageCtrl', ['$scope', '$http', '$rootScope', '$sce','$timeout', login_pageCtrl]);

    function login_pageCtrl($scope, $http, $rootScope, $sce, $timeout) {
        var vm = this;

        $rootScope.pageTitle = 'Bejelentkező képernyő';

        // Látszódjon a felső és oldalsó Nav bar?
        $rootScope.showTopNav = false;
        $rootScope.showLeftNav = true;
        
        // Scrolls the viewport to the focused element with 500ms delay. It's useful on mobile devices.
        $scope.scrollTo = function(elem){
            
            $timeout(function(){
 
                document.getElementById(elem).scrollIntoView({ 
                    behavior: 'smooth' 
                });                
                
            },500);            
        };
        
        $scope.loading = false;
        
        $scope.showError = function() {
            //$scope.errorMessage = 'Sikertelen bejelentkezés.';
            
            $scope.loading = !$scope.loading;
        }
    }
})();

