(function () {
    'use strict';

    angular.module('app')
        .controller('userprofile_pageCtrl', ['$scope', '$http', '$rootScope', '$sce', '$timeout', 'Webapi', userprofile_pageCtrl]);

    function userprofile_pageCtrl($scope, $http, $rootScope, $sce, $timeout, Webapi) {
        var vm = this;

        $rootScope.pageTitle = 'User profile';

        // Látszódjon a felső és oldalsó Nav bar?
        $rootScope.showTopNav = true;
        //$rootScope.showTopNav = false;
        $rootScope.showLeftNav = true;
        //$rootScope.showLeftNav = false;

        // IDE ÍRJ:

        $scope.user = {};

        $scope.userData = {
            username: "",
            email: "",
            familyname: "",
            surname: "",
            phone: "",
            domain: "",
            password: "",
            new_password: "",
            new_password_again: ""
        };
console.log($scope.userData);
console.log($rootScope.user.username);

        $scope.formElements = [
            {
                divClass: "username",
                inputID: "username_input",
                labelText: "Felhasználónév",
                requiredStar: "*",
                inputType: "text",
                inputVariable: "username",
                errorMessage: "",
                /*isDisabled: "disabled",*/
                isRequired: true
            },
            {
                divClass: "email",
                inputID: "email_input",
                labelText: "E-mail cím",
                requiredStar: "*",
                inputType: "email",
                inputVariable: "email",
                errorMessage: "Adj meg egy érvényes e-mail címet!",
                isRequired: true
            },
            {
                divClass: "familyname",
                inputID: "familyname_input",
                labelText: "Vezetéknév",
                requiredStar: "*",
                inputType: "text",
                inputVariable: "familyname",
                errorMessage: "Adj meg egy vezetéknevet!",
                isRequired: true
            },
            {
                divClass: "surname",
                inputID: "surname_input",
                labelText: "Keresztnév",
                requiredStar: "*",
                inputType: "text",
                inputVariable: "surname",
                errorMessage: "Adj meg egy keresztnevet!",
                isRequired: true
            },
            {
                divClass: "phone",
                inputID: "phone_input",
                labelText: "Telefonszám",
                inputType: "text",
                inputVariable: "phone",
                isRequired: false
            },
            {
                divClass: "domain",
                inputID: "domain_input",
                labelText: "Domain",
                inputType: "text",
                inputVariable: "domain",
                isRequired: false
            }
        ];


        $scope.newPasswordElements = [
            {
                divClass: "old_password",
                inputID: "old_password_input",
                labelText: "Régi jelszó",
                inputVariable: "password"
            },
            {
                divClass: "new_password",
                inputID: "new_password_input",
                labelText: "Új jelszó",
                inputVariable: "new_password"
            },
            {
                divClass: "new_password_again",
                inputID: "new_password_again_input",
                labelText: "Új jelszó újra",
                inputVariable: "new_password_again"
            }

        ];


        $scope.initPage = function () {
            $scope.modifyUserDataSucces = "";
            $scope.modifyUserDataError = "";
            $scope.getUserData();
        };
        
// Szerkeszthetőség változtatása, megfelelő gombok megjelenítése ***************
        $scope.isDisabled = true;
        $scope.toggleButtonsAndDisabled = function () {
            if ($scope.isDisabled === true) {
                $scope.isDisabled = false;
                /*var focusinput = document.getElementById("email_input");
                focusinput.focus();*/
                document.getElementById('email_input').focus();
            } else {
                $scope.isDisabled = true;
            }
            $scope.getUserData();
        };


// User adatainak megjelenítése (frissítése) ********************************************************        
        $scope.getUserData = function () {
            var promise = Webapi.list_users("0", $rootScope.user.username, 1);
            promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) {
                        console.log(data);
                    }
                    //e.error(data);
                } else {
                    $scope.userData.userID = data[0].u_id;
                    $scope.userData.username = data[0].sname;
                    $scope.userData.familyname = data[0].lname;
                    $scope.userData.email = data[0].email;
                    $scope.userData.phone = data[0].email;
                    //if (console) console.log($scope.usersAdminGrid.dataSet);
                    //e.success(data);
                }
            });
        };

        $scope.getUserData();


//User adatainak módosítása ******************************************************    
        $scope.modifyUserData = function () {

            var promise = Webapi.handle_users($scope.userData.userID, $scope.userData.username, $scope.userData.familyname/* + " " + $scope.userData.surname*/, "", 1, "", $scope.userData.email);

            promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) console.log(data);
                } else {
                    $scope.modifyUserDataSucces = 'A felhasználói adatokat sikeresen megváltoztatta!';

                    $scope.toggleButtonsAndDisabled();
                }
            });
            promise.error(function (reason) {
                if (console) console.log(reason);
                $scope.modifyUserDataError = 'A felhasználói adatok megváltoztatása nem sikerült!';
            });

            $scope.showLoading = false;
        };

// Input mezők ellenőrzése ********************************************
        $scope.checkFields = function() {
            
            errorMatchnumb=0;
            $scope.valueWarningMessages="";
            
            // Egyeznek a jelszavak és az email-ek is
            if (($scope.userData.email !== "") && ($scope.userData.familyname !== "") && ($scope.userData.surname !== "")){
                errorMatchnumb= 0;
                
               return true; 
            }
            
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
     
        
        

// Jelszó ellenőrzés
        (function () {
            var weakRegularExp = new RegExp("^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*]))(?=.{3,})");

            var mediumRegularExp = new RegExp("^(((?=.*[a-z])((?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*])))|((?=.*[A-Z])((?=.*[a-z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*])))|((?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z])|(?=.*[!@#\$%\^&\*]) ))|((?=.*[!@#\$%\^&\*])((?=.*[a-z])|(?=.*[0-9])|(?=.*[A-Z]))))(?=.{5,})");

            var OKRegularExp = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])|(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]))(?=.{7,})");

            var strongRegularExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})");

            var score = 0;
            var valueProgressBarBackgroundColor;
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
                } else if (mediumRegularExp.test(value)) {
                    $scope.userPasswordstrength = 'Jelszavad erősége: Közepes';
                    score = 2;
                    valueProgressBarBackgroundColor = "orange";
                } else if (weakRegularExp.test(value)) {
                    $scope.userPasswordstrength = 'Jelszavad erősége: Gyenge';
                    score = 1;
                    valueProgressBarBackgroundColor = "red";
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
                $scope.valueProgressBarWidth = score * 25;
                $scope.progress = score;
                $scope.valueProgressBarBackgroundColor;
                $timeout(update, 200);
            };
            update();
        })();

    }
})();
