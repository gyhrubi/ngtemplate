(function () {
    'use strict';

    angular.module('app')
        .controller('changePassword_pageCtrl', ['$scope', '$http', '$rootScope', '$sce','$timeout' ,'Webapi','$routeParams', changePassword_pageCtrl]);
    
        function changePassword_pageCtrl($scope, $http, $rootScope, $sce, $timeout,Webapi,$routeParams) {
        var vm = this;
        
        sessionStorage.setItem("token", $routeParams.temptoken);
            
        $rootScope.pageTitle = 'Jelszómódosítás képernyő';

        // Látszódjon a felső és oldalsó Nav bar?
        $rootScope.showTopNav = true;
        //$rootScope.showTopNav = false;
        $rootScope.showLeftNav = true;
        //$rootScope.showLeftNav = false;

        // IDE ÍRJ:
            
        $scope.user = {};        
        
        $scope.formElements = [
            {
                divClass: "reg_password",
                inputID: "reg_password_input",
                labelText: "Jelszó",
                inputType: "password",
                infoText: "A jelszó minél hosszabb legyen illetve minél több számot, szimbólumot és nagybetűt tartalmazzon!",
            },
            {
                divClass: "reg_password_again",
                inputID: "reg_password_again_input",
                labelText: "Jelszó újra",
                inputType: "password",
                infoText: "Az ismételt jelszónak ugyan annak kell lennie mint a megadott jelszó!",
            },
            
            
        ];    
            
            
        // Jelszó erőség ellenőrzés
        (function(){
            var weakRegularExp = new RegExp("^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*]))(?=.{3,})");

            var mediumRegularExp = new RegExp("^(((?=.*[a-z])((?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*])))|((?=.*[A-Z])((?=.*[a-z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*])))|((?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z])|(?=.*[!@#\$%\^&\*]) ))|((?=.*[!@#\$%\^&\*])((?=.*[a-z])|(?=.*[0-9])|(?=.*[A-Z]))))(?=.{5,})");

            var OKRegularExp = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])|(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]))(?=.{7,})");


            var strongRegularExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})");  
            
            var score= 0;
            var valueProgressBarBackgroundColor
            var valueProgressBar = 0;
            var valueProgressBarWidth = 0;

            $scope.checkpwdStrength = {  
                "width": "150px",  
                "height": "25px",  
                "float": "right"  
            };  

            $scope.validationInputPwdText = function (value) {
                if (strongRegularExp.test(value)) {  
                    $scope.userPasswordstrength = 'Jelszavad erősége: Nagyon erős';
                    score = 4;
                    valueProgressBarBackgroundColor = "green";
                } else if (OKRegularExp.test(value)) {  
                    $scope.userPasswordstrength = 'Jelszavad erősége: Erős';
                    score = 3;
                    valueProgressBarBackgroundColor = "limegreen";
                }else if (mediumRegularExp.test(value)) {  
                    $scope.userPasswordstrength = 'Jelszavad erősége: Közepes';
                    score = 2;
                    valueProgressBarBackgroundColor = "orange";
                } else if(weakRegularExp.test(value)){  
                    $scope.userPasswordstrength = 'Jelszavad erősége: Gyenge'; 
                    score = 1;
                    valueProgressBarBackgroundColor= "red";
                } else {  
                    $scope.userPasswordstrength = 'Jelszavad erősége: Nagyon gyenge'; 
                    score = 0;
                } 
            };  
            $scope.valueProgressBar = 0;
            $scope.valueProgressBarWidth = 0;
            
            var i = -1;
            function update() {
                $scope.valueProgressBarBackgroundColor = valueProgressBarBackgroundColor;
                $scope.valueProgressBar = score;
                $scope.valueProgressBarWidth = score*25;
                $scope.progress = score;
                $scope.valueProgressBarBackgroundColor
                $timeout(update, 200);
            }; 
            update();        
        })();
        
        
        // Jelszavak egyezésének ellenőrzése
        $scope.checkSameInputFieldsMatch = function() {
            
            $scope.valueWarningMessages="";
            
            // Egyeznek a jelszavak 
            if ($scope.user.reg_password_input === $scope.user.reg_password_again_input){
               return true; 
                }
            // Nem egyeznek a jelszavak    
            else if($scope.user.reg_password_input != $scope.user.reg_password_again_input){
                return false;
                }
        };
        
        // Tényleges jelszómódosítás
        $scope.changePassword = function() {
            
            $scope.showLoading = true;
            
            if ($scope.checkSameInputFieldsMatch()) {
                $timeout($scope.registerUser,1000);
            } 
            else {
                $scope.valueWarningMessages="A két megadott jelszó nem egyezik!" ;  
            }
            $scope.changePasswordSucces = '';
            $scope.changePasswordError = '';
            $timeout(function(){$scope.showLoading = false},1000);
        };
        
        // WebApi, SQL kommunikáció de még hiányzik a tárolt eljárás!                  
        $scope.changePasswordSend = function() {           
            
            var promise = Webapi.reset_password(user.password);


            promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) console.log(data);
                } else {
                    $scope.RegistrationSucces = 'Ön sikeresen módosította a jelszavát!';
                };
            });
            promise.error(function (reason) {
                if (console) console.log(reason);
                $scope.RegistrationError = 'Sikertelen jelszó módosítás!';
            });
            
            $scope.showLoading = false;
        }; 

            
            
         }; 
    
    })();