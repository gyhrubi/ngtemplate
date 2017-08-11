(function () {
    'use strict';

    angular.module('app')
        .controller('login_pageCtrl', ['$scope', '$http', '$rootScope', '$sce','$timeout','Webapi', login_pageCtrl]);

    function login_pageCtrl($scope, $http, $rootScope, $sce, $timeout, Webapi) {
        var vm = this;

        $rootScope.pageTitle = 'Bejelentkező képernyő';

        // Látszódjon a felső és oldalsó Nav bar?
        $rootScope.showTopNav = false;
        $rootScope.showLeftNav = true;
        $scope.fh = "";
        $scope.jsz = "";
        $scope.$timeout = $timeout;
        
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
        
        
        $scope.validateInputs = function() {
            
            $scope.showLoading = true;
            $scope.loginError = false;            
            
            if ($scope.fh.length == 0 || $scope.jsz.length == 0) {
                
                $scope.errorMessage = "Hiányzó adat(ok)!";
                $scope.showLoading = false;
                $scope.loginError = true;
                
                return false;
                
            } else {
                return true;
            }
            
        }
        // Login function: 
        $scope.login = function (fnCallback) {
            
            $scope.errorMessage = "Sikertelen bejelentkezés.";          
            
            var promise = Webapi.login(($scope.isDomain ? $rootScope.domainName : undefined), $scope.fh, $scope.jsz);
            $scope.jsz = '';
            promise.success(function (response) {
                $rootScope.initUser();
                if (!response || !response.token || response.token.length == 0 || !response.token[0].token) {
                    $scope.loginError = true;                    
                } else {
                    $rootScope.user.isAuthenticated = true;
                    $rootScope.user.username = $scope.fh;
                    $rootScope.user.fullname = response.token[0].lname;
                    $rootScope.user.token = response.token[0].token;
                    $rootScope.user.expires = new Date(response.token[0].valid);
                    $rootScope.user.groups = response.groups;
                    $scope.errorMessage = "";
                }
                $scope.showLoading = false;
                $rootScope.setUserSession();
            });
            promise.error(function (err, status) {
                $rootScope.initUser();
                $scope.loginError = true;
                $rootScope.setUserSession();
                $scope.showLoading = false;
            });

            //$route.reload();

            if (fnCallback) {
                fnCallback();
            }          
            
        }
        
        // Logout function:
        $scope.logout = function (fnCallback) {

                $scope.logoutError = false;
                var promise = Webapi.logout();
                promise.success(function (response) {
                    $rootScope.initUser();
                    $rootScope.setUserSession();
                })
                promise.error(function (err, status) {
                    $rootScope.initUser();
                    $scope.logoutError = true;
                    $rootScope.setUserSession();
                });

                //$route.reload();

                if (fnCallback) {
                    fnCallback();
                }
        }
        
    }
})();

