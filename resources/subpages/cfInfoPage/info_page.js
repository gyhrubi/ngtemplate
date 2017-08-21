(function () {
    'use strict';

    angular.module('app')
        .controller('info_pageCtrl', ['$scope', '$http', '$rootScope', '$sce','$timeout' ,'Webapi', info_pageCtrl]);
    
        function info_pageCtrl($scope, $http, $rootScope, $sce, $timeout,Webapi) {
        var vm = this;
            
        $rootScope.pageTitle = 'Névjegy képernyő';

        // Látszódjon a felső és oldalsó Nav bar?
        $rootScope.showTopNav = true;
        //$rootScope.showTopNav = false;
        $rootScope.showLeftNav = true;
        //$rootScope.showLeftNav = false;

        // IDE ÍRJ:
            
        // Verzió keresés
        $scope.checkCurrentVersion = function() {           
            
            var versioncheck = {};
            versioncheck.comment = undefined,
            versioncheck.sessionstoragewriter = function () {
                if (typeof (Storage) !== "undefined") {
                    $http.get("WebApi.appcache?" + new Date().toString())
                    .success(function (result) {
                        versioncheck.comment = result.split("#");
                        sessionStorage.setItem("change_version", versioncheck.comment[1]);
                        sessionStorage.setItem("change_date", versioncheck.comment[2]);
                        sessionStorage.setItem("change_reason", versioncheck.comment[3]);
                    })
                    .error(function(reason){
                        if (console) console.log(reason);
                    });
                }
            };
            versioncheck.check = function () {
                $http.get("WebApi.appcache?" + new Date().toString())
                    .success(function (result) {
                    versioncheck.comment = result.split("#");
                    if (versioncheck.comment[1] != window.sessionStorage.change_version) {
                        
                        
                        // Nincs verzió követés
                        var changeHistory = "";
                        for (var i = 1; i < 4; i++) {
                            changeHistory = changeHistory + versioncheck.comment[i];
                        };
                        for (var i = 0; i < versioncheck.comment.length; i++) {
                            if (versioncheck.comment[i] == window.sessionStorage.change_version) {
                                
                                var changeHistory = "";
                                for (var x = 1; x < (i); x++) {
                                    // #END# törlése
                                    if (x != 4) {
                                        changeHistory = changeHistory + versioncheck.comment[x];
                                    };
                                };
                                break;
                            };
                        };
                        
                        var confirm_later = confirm("Figyelem  új frissítés elérhető! Frissíti az oldalt?\n" + changeHistory + "Amennyiben frissíti az oldalt a jelenlegi munkafolyamata elvész!");
                        
                        if (confirm_later == true) {
                            window.location.reload();
                        };
                    }
                })
                .error(function(reason){
                    if (console) console.log(reason)
                });
            };
            
            versioncheck.check();
            versioncheck.sessionstoragewriter();
            
            return versioncheck;
            
        }; 
          
        // Az oldal úrjatöltése
        $scope.Reloadthecurrentpage = function() { 
         window.location.reload();
        };
        
        // Html meghivása
            $scope.openHtmlBehind = function(adat) {
                return adat;
            };
  
        };
    
    })();    