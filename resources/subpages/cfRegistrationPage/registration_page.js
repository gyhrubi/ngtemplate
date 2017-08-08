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
                
            },
            {
                divClass: "reg_familyname",
                inputID: "reg_familyname_input",
                labelText: "Vezetéknév",
                inputType: "text",
                infoText: "Ne használjon ékezeteket a vezetéknevében!",
            },
            {
                divClass: "reg_surname",
                inputID: "reg_surname_input",
                labelText: "Keresztnév",
                inputType: "text",
                infoText: "Ne használjon ékezeteket a keresztnevében!",
            },
            {
                divClass: "reg_email",
                inputID: "reg_email_input",
                labelText: "E-mail cím",
                inputType: "email",
                infoText: "Addjon meg egy érvényes e-mail címet!",
            },
            {
                divClass: "reg_email_again",
                inputID: "reg_email_again_input",
                labelText: "E-mail cím újra",
                inputType: "email",
                infoText: "Kérem ismételje meg az e-mail címét!",
            },
           
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
                inputType: "text",
                infoText: "Az ismételt jelszónak ugyan annak kell lennie mint a megadott jelszó!",

            },
            
            
        ];

        // Jelszó ellenőrzés
        (function(){
            var weakRegularExp = new RegExp("^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*]))(?=.{3,})");

            var mediumRegularExp = new RegExp("^(((?=.*[a-z])((?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*])))|((?=.*[A-Z])((?=.*[a-z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*])))|((?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z])|(?=.*[!@#\$%\^&\*]) ))|((?=.*[!@#\$%\^&\*])((?=.*[a-z])|(?=.*[0-9])|(?=.*[A-Z]))))(?=.{5,})");

            var OKRegularExp = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])|(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]))(?=.{7,})");


            var strongRegularExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})");  

            var emptyRegularExp = new RegExp("^");

            var score= 0;

            $scope.checkpwdStrength = {  
                "width": "150px",  
                "height": "25px",  
                "float": "right"  
            };  

            $scope.validationInputPwdText = function (value) {
                if (strongRegularExp.test(value)) {  
                    $scope.userPasswordstrength = 'Jelszavad erősége: Nagyon erős';
                    score = 4;

                } else if (OKRegularExp.test(value)) {  
                    $scope.userPasswordstrength = 'Jelszavad erősége: Erős';
                    score = 3;
                }else if (mediumRegularExp.test(value)) {  
                    $scope.userPasswordstrength = 'Jelszavad erősége: Közepes';
                    score = 2;
                } else if(weakRegularExp.test(value)){  
                    $scope.userPasswordstrength = 'Jelszavad erősége: Gyenge'; 
                    score = 1;
                    angular.element(document.querySelector('.k-state-selected')).addClass("very_strong");
                    
                } else {  
                    $scope.userPasswordstrength = 'Jelszavad erősége: Nagyon gyenge'; 
                    score = 0;
                } 
            };  

            $scope.status = "";
            $scope.progress = 0;
            $scope.labels = [
                "",

              ];
            var i = -1;
            function update() {
                $scope.progress = score;
                $timeout(update, 200);

                  
            }; 
              
            update();        
            
        })();
        
        $scope.registerUser = function() {
            var promise = Webapi.handle_users(null, "etetenyi", "Eszter Tétényi", "kiscica", 1, "cf", "etetenyi@comforth.hu");


            promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) console.log(data);
                } else {
                    $scope.handleUsers.alarmShow = false;
                    $scope.handleUsers.saveSuccess = true;
                    $scope.handleUsers.userModifyShow = false;
                };
            });
            promise.error(function (reason) {
                if (console) console.log(reason);
                $scope.handleUsers.alarmShow = true;
                $scope.handleUsers.saveSuccess = false;
            });
        };
        
        $scope.registerUser();
        
        
        
    };
      
})();