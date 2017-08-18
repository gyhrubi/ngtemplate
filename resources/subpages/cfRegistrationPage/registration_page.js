(function () {
    'use strict';

    angular.module('app')
        .controller('registration_pageCtrl', ['$scope', '$http', '$rootScope', '$sce','$timeout' ,'Webapi', registration_pageCtrl]);

    function registration_pageCtrl($scope, $http, $rootScope, $sce, $timeout,Webapi) {
        var vm = this;
        
        $rootScope.pageTitle = 'Regisztációs képernyő';

        // Látszódjon a felső és oldalsó Nav bar?
        $rootScope.showTopNav = true;
        //$rootScope.showTopNav = false;
        $rootScope.showLeftNav = true;
        //$rootScope.showLeftNav = false;

        // IDE ÍRJ:
        
        $scope.user = {};        
        
        $scope.formElements = [
            {
                divClass: "reg_username",
                inputID: "reg_username_input",
                labelText: "Felhasználónév",
                inputType: "text",
                infoText: "A felhasználónév legalább 6 karekter hosszú legyen!",
                inputWarning: "reg_username_warning",
            },
            {
                divClass: "reg_fullname",
                inputID: "reg_fullname_input",
                labelText: "Teljes név",
                inputType: "text",
                infoText: "Ne használjon ékezeteket a nevében!",
                inputWarning: "reg_fullname_warning",
            },
            {
                divClass: "reg_email",
                inputID: "reg_email_input",
                labelText: "E-mail cím",
                inputType: "email",
                infoText: "Addjon meg egy érvényes e-mail címet!",
                inputWarning: "reg_email_warning",
            },
            {
                divClass: "reg_email_again",
                inputID: "reg_email_again_input",
                labelText: "E-mail cím újra",
                inputType: "email",
                infoText: "Kérem ismételje meg az e-mail címét!",
                inputWarning: "reg_email_again_warning",
            },
            {
                divClass: "reg_password",
                inputID: "reg_password_input",
                labelText: "Jelszó",
                inputType: "password",
                infoText: "A jelszó minél hosszabb legyen illetve minél több számot, szimbólumot és nagybetűt tartalmazzon!",
                inputWarning: "reg_password_warning",
            },
            {
                divClass: "reg_password_again",
                inputID: "reg_password_again_input",
                labelText: "Jelszó újra",
                inputType: "password",
                infoText: "Az ismételt jelszónak ugyan annak kell lennie mint a megadott jelszó!",
                inputWarning: "reg_password_again_warning",
            },
            
            
        ];

        // Jelszó erőség ellenőrzés
        (function(){
            var weakRegularExp = new RegExp("^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*]))(?=.{3,})");

            var mediumRegularExp = new RegExp("^(((?=.*[a-z])((?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*])))|((?=.*[A-Z])((?=.*[a-z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*])))|((?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z])|(?=.*[!@#\$%\^&\*]) ))|((?=.*[!@#\$%\^&\*])((?=.*[a-z])|(?=.*[0-9])|(?=.*[A-Z]))))(?=.{5,})");

            var OKRegularExp = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])|(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]))(?=.{7,})");


            var strongRegularExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})");  
            
            $scope.checkpwdStrength = {  
                "width": "150px",  
                "height": "25px",  
                "float": "right"  
            };  

            $scope.validationInputText = function (value) {
                // Erre azért van szükség, hogy csak a jelszó erőségét vizsgálja!
                if (value === $scope.user.reg_password_input){

                    if (strongRegularExp.test(value)) {  
                        $scope.userPasswordstrength = 'Jelszavad erősége: Erős';
                    } else if (OKRegularExp.test(value)) {  
                        $scope.userPasswordstrength = 'Jelszavad erősége: Erős';
                    }else if (mediumRegularExp.test(value)) {  
                        $scope.userPasswordstrength = 'Jelszavad erősége: Gyenge';
                    } else if(weakRegularExp.test(value)){  
                        $scope.userPasswordstrength = 'Jelszavad erősége: Gyenge'; 
                    } else {  
                        $scope.userPasswordstrength = 'Jelszavad erősége: Gyenge'; 
                    } 
                };
            };  
                  
        })();
        
        var errorMatchnumb;
        
        /////////////////////RÉGI MEGOLDÁSOK////////////////////////
        
         // E-mailek és jelszavak egyezésének ellenőrzése RÉGI
        /*
        $scope.checkSameInputFieldsMatch = function() {
            
            errorMatchnumb=0;
            $scope.valueWarningMessages="";
            
            // Egyeznek a jelszavak és az email-ek is
            if (($scope.user.reg_password_input === $scope.user.reg_password_again_input) && ($scope.user.reg_email_input === $scope.user.reg_email_again_input)){
                errorMatchnumb= 0;
                
               return true; 
                }
            
            // Egyeznek a jelszavak de az email-ek nem   
            else if(($scope.user.reg_password_input === $scope.user.reg_password_again_input) &&  ($scope.user.reg_email_input != $scope.user.reg_email_again_input)){
                errorMatchnumb= 1;
                return false;
                }
            
            // Nem egyeznek a jelszavak de az email-ek igen    
            else if(($scope.user.reg_password_input != $scope.user.reg_password_again_input) && ($scope.user.reg_email_input === $scope.user.reg_email_again_input)){
                errorMatchnumb= 2;
                return false;
                }
            
            // Nem egyeznek a jelszavak és az email-ek sem
            else if(($scope.user.reg_password_input != $scope.user.reg_password_again_input) && ($scope.user.reg_email_input != $scope.user.reg_email_again_input)){
                errorMatchnumb= 3;
                return false;
            }
            
        };
        */
        
        // Tényleges regisztráció RÉGI
        /*
        $scope.registration = function() {
            
            $scope.showLoading = true;
            
            if ($scope.checkSameInputFieldsMatch()) {
                $timeout($scope.registerUser,1000);
            } 
            else {
                
                if(errorMatchnumb === 1){
                 $scope.valueWarningMessages="A megadott két email cím nem egyezik egymással!" ;  
                }
                else if(errorMatchnumb === 2){
                    $scope.valueWarningMessages="A két megadott jelszó nem egyezik!" ;  
                }
                else if(errorMatchnumb === 3){
                    $scope.valueWarningMessages="A két megadott jelszó nem egyezik illetve a két megadott e-mail cím sem!";   
                }
                
            }
            $scope.RegistrationSucces = '';
            $scope.RegistrationError = '';
            $timeout(function(){$scope.showLoading = false},1000);
        };
        */
        
        /////////////////////////////////////////////////////////////
        
        
        
        // WebApi, SQL kommunikáció
        $scope.registerUser = function() {           
            
            var promise = Webapi.handle_users(null, $scope.user.reg_username_input, $scope.user.reg_surname_input +" " + $scope.user.reg_familyname_input, $scope.user.reg_password_input, 1, "", $scope.user.reg_email_input);


            promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) console.log(data);
                } else {
                    $scope.RegistrationSucces = 'Sikeres regisztráció!';
                };
            });
            promise.error(function (reason) {
                if (console) console.log(reason);
                $scope.RegistrationError = 'Sikertelen regisztráció!';
            });
            
            $scope.showLoading = false;
        };        
        

        // Jelszavak egyezésének ellenőrzése
        $scope.checkSamePasswordInputsMatch = function() {
            $scope.valueWarningMessagesPassword="";
            $scope.validationInputText2 = function (value) {
            $scope.valueWarningMessagesPassword="";
                if ((value === $scope.user.reg_password_again_input) ){
            // Egyeznek az e-mailek
            if ($scope.user.reg_password_input === $scope.user.reg_password_again_input){
                $scope.valueWarningMessagesPassword="Egyeznek az jelszavak";
               return false; 
                }
            
            // Az email-ek nem egyeznek   
            else {
                $scope.valueWarningMessagesPassword="Nem egyeznek a jelszavak";
                return true;
                }
            
                };
            }
        }();
        
        // E-mailek egyezésének ellenőrzése
        $scope.checkSameEmailInputsMatch = function() {
            
            $scope.valueWarningMessagesEmail="";
             
            
            $scope.validationInputText1 = function (value) {
            
                $scope.valueWarningMessagesEmail="";
                
                if ((value === $scope.user.reg_email_again_input) ){
                    // Egyeznek az e-mailek
                    if ($scope.user.reg_email_input === $scope.user.reg_email_again_input){
                        $scope.valueWarningMessagesEmail="Egyeznek az e-mailek";
                       return false; 
                        }

                    // Az email-ek nem egyeznek   
                    else{
                        $scope.valueWarningMessagesEmail="Nem egyeznek az e-mailek";
                        return true;
                        }

                };
            };
        }();
        
          
        // Tényleges regisztráció
        $scope.registration = function() {
            
            $scope.showLoading = true;
            
            if ($scope.checkSameEmailInputsMatch()) {
                $timeout($scope.registerUser,1000);
            };
            
            $scope.RegistrationSucces = '';
            $scope.RegistrationError = '';
            $timeout(function(){$scope.showLoading = false},1000);
        };
    };
  
})();