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
        
        // Mező objektumot készítő konstruktor. Paraméterek: (Mező címe, Mező típusa, Ellenőrzése típusa, Egyező mező objektum)
        var Field = function(fieldTitle,fieldType,validationType,matchWith) {
            
            this.title = fieldTitle;
            this.type = fieldType;
            this.validationType = validationType;
            this.value = "";
            this.validate = function() {  
                
                switch(this.validationType) {                    
                        
                    case "notEmpty":
                        if (this.value.length > 0) {
                            this.isValid = true;
                            this.validationMessage ="";
                        } else {
                            this.isValid = false;
                            this.validationMessage = "Üres mező!"
                        } 
                        break;
                    case "match":
                        if (this.value === matchWith.value) {
                            this.isValid = true;
                            this.validationMessage ="";
                        } else {
                            this.isValid = false;
                            this.validationMessage = "Nem egyezik a két mező!";
                        } 
                        break;
                    case "password":
                        if (this.value.length > 0) {
                            this.isValid = true;
                            this.validationMessage = $scope.checkPasswordStrength(this.value);
                        } else {
                            this.isValid = false;
                            this.validationMessage = "Üres mező!";
                        }
                        break;
                    case "email":
                        if ($scope.checkEmailPattern(this.value)) {
                            this.isValid = true;
                            this.validationMessage ="";
                        } else {
                            this.isValid = false;
                            this.validationMessage = "Nem megfelelő formátum!";
                        }
                        break;
                    default:
                        this.isValid = true;                        
                }
                this.iconShow = true;                
            },
            this.isValid = false;
            this.validationMessage = "",
            this.iconShow = false;
            
            if (this.validationType === "match" || this.validationType === "password") {
                this.onChange = true;
            }
            
        }
        
        // Mező definiálás és konfiguráció
        $scope.userFields = [
            $scope.userName = new Field("Felhasználónév","text","notEmpty"),
            $scope.fullName = new Field("Teljes név","text","notEmpty"),
            $scope.email = new Field("E-mail cím","text","email"),
            $scope.emailMatch = new Field("E-mail cím újra","text","match",$scope.email),
            $scope.password = new Field("Jelszó","password","password"),
            $scope.passwordMatch = new Field("Jelszó újra","password","match",$scope.password)
        ];
        
        // Regisztráció vezérlő
        $scope.registration = function() {
            
            $scope.showLoading = true;
            
            // Űrlap validáció
            if (!$scope.isFormValid()) {
                $scope.regResult = false;
                $scope.regResultMessage = "Regisztráció sikertelen! A regisztrációs űrlap nincs megfelelően kitöltve!";
                $scope.showLoading = false;
                return false;
            }
            
            // Mentés az adatbázisba
            $scope.registerUser();
            
         };
        
        // Űrlap ellenőrzése
        $scope.isFormValid = function() {
            
            var counter = 0;
            for (i=0; i<$scope.userFields.length; i++) {
                $scope.userFields[i].validate();
                if (!$scope.userFields[i].isValid) {counter++};
            }
            if (counter > 0){
                return false;
            } else {
                return true;
            }  
            
        };
            
        // Jelszó erőség ellenőrzés 
        $scope.checkPasswordStrength = function (pw) {

            var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
            var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
            var enoughRegex = new RegExp("(?=.{2,}).*", "g");

            if (false == enoughRegex.test(pw)) {
                return 'Legalább két karakter!';
            } else if (strongRegex.test(pw)) {
                return 'Jelszavad erősége: Erős';
            } else if (mediumRegex.test(pw)) {
                return 'Jelszavad erősége: Közepes';
            } else {
                return 'Jelszavad erősége: Gyenge'; 
            }

        };  
                  
        // E-mail minta ellenőrzés
        $scope.checkEmailPattern = function(pattern) {
          
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(pattern);

        };
          
        // WebApi, SQL kommunikáció
        $scope.registerUser = function() {           
            
            var promise = Webapi.handle_users(null, $scope.userName.value, $scope.fullName.value, $scope.password.value, 0, "", $scope.email.value);

            promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) console.log(data);
                    $scope.regResult = false;
                } else {
                    $scope.regResult = true;
                    $scope.regResultMessage = "Sikeres regisztráció!";
                    $scope.emptyFields();
                    
                };
                $scope.showLoading = false;
            });
            promise.error(function (reason) {
                if (console) console.log(reason);
                $scope.regResult = false;
                $scope.regResultMessage = "Sikertelen regisztráció!";
                $scope.showLoading = false;
            });            
            
        };       
        
        // Ellenőrzések eredményének törlése a képernyőről
        $scope.resetResult = function(field){
            
            field.iconShow = false;
            field.validationMessage = "";

        };
        
        // Mezők és eredményeik törlése
        $scope.emptyFields = function() {
            for (i=0; i<$scope.userFields.length; i++) {
                $scope.userFields[i].value = "";
                $scope.resetResult($scope.userFields[i]);
            }
        }
        
    };
  
})();