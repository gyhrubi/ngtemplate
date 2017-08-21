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

        $scope.passwordFailure = 0;     //ezt lehet, hogy globálisan kéne meghatározni
        $scope.user = {};


        /////////////////////////////////////////////////////////////////////////////
        // Felhasználói és jelszó oldal feltöltése
        
        // Felhasználói adatlap elemei
        $scope.formElements = [
            {
                divClass: "username",
                inputID: "username_input",
                labelText: "Felhasználónév",
                requiredStar: "*",
                inputType: "text",
                inputVariable: "username",
                errorMessage: " ",
                isDisabled: "disabled",
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

        // Jelszó módosító lap elemei
        $scope.newPasswordElements = [
            {
                divClass: "current_password",
                inputID: "current_password_input",
                labelText: "Régi jelszó",
                inputVariable: "current_password"
            },
            {
                divClass: "new_password",
                inputID: "new_password_input",
                labelText: "Új jelszó",
                inputVariable: "new_password",
                errorMessage: "A 2 megadott jelszó nem egyezik",
                isPasswordOKicon: "is_password_ok"
            },
            {
                divClass: "new_password_again",
                inputID: "new_password_again_input",
                labelText: "Új jelszó újra",
                inputVariable: "new_password_again"
            }
        ];


        
        $scope.userData = {
            username: "",
            email: "",
            familyname: "",
            surname: "",
            phone: "",
            domain: "",
            current_password: "",
            new_password: "",
            new_password_again: ""
        };
        
        $scope.initPage = function () {
            $scope.modifyUserDataSuccess = "";
            $scope.modifyUserDataError = "";
            $scope.getUserData();
            $scope.initPasswordPage();
        };

        // Szerkeszthetőség változtatása, megfelelő gombok megjelenítése
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

        
        // User adatainak megjelenítése (frissítése)         
        $scope.getUserData = function () {
            var promise = Webapi.list_users("0", /*$rootScope.user.username*/ /*"user1"*/ $scope.selectedUser, 1);
            promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) {
                    }
                    //e.error(data);
                } else {
                    $scope.userData.userID = data[0].u_id;
                    $scope.userData.current_password = data[0].pw;
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
        

        /////////////////////////////////////////////////////////////////////////////
        // User adatainak megjelenítése (frissítése)         
        $scope.getUserList = function () {
            var promise = Webapi.list_users();
            promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) {
                    }
                    //e.error(data);
                } else {
                    $scope.users = data;
                    //$scope.selectedUser = document.getElementById("userlist").value;
                    //console.log($scope.selectedUser);

                    //if (console) console.log($scope.usersAdminGrid.dataSet);
                    //e.success(data);
                }
            });
        };

        $scope.getUserList();
        
        
        // Input mezők ellenőrzése 
        $scope.checkFields = function () {
            $scope.modifyUserDataSuccess = "";
            $scope.modifyUserDataError = "";
            // A kötelező mezők ki vannak töltve
            if (($scope.userData.email !== "") && ($scope.userData.familyname !== "") && ($scope.userData.surname !== "") && ($scope.userData.email !== undefined) && ($scope.userData.familyname !== undefined) && ($scope.userData.surname !== undefined)) {
                return true;
            } else {
                return false;
            }
        };    
        
        
        
        //User adatainak módosítása     
        $scope.modifyUserData = function () {
            if ($scope.checkFields()) {
                var promise = Webapi.handle_users($scope.userData.userID, $scope.userData.username, $scope.userData.familyname/* + " " + $scope.userData.surname*/, "", 1, "", $scope.userData.email);
                promise.success(function (data) {
                    if (Webapi.isError(data)) {
                        if (console) console.log(data);
                    } else {
                        $scope.modifyUserDataSuccess = 'A felhasználói adatokat sikeresen megváltoztatta!';

                        $scope.toggleButtonsAndDisabled();
                    }
                });
                promise.error(function (reason) {
                    if (console) console.log(reason);
                    $scope.modifyUserDataError = 'A felhasználói adatok megváltoztatása nem sikerült!';
                });
                $scope.showLoading = false;
            } else {
                $scope.modifyUserDataError = 'Töltse ki a kötelező mezőket!';
            }
        };

        
        
        
        // Jelszóváltoztatás oldal init
        $scope.initPasswordPage = function () {
            document.getElementById('is_password_ok').innerHTML = "";
            $scope.userData.current_password = "";
            $scope.userData.new_password = "";
            $scope.userData.new_password_again = "";
            document.getElementById('showHide').checked = false;
            $scope.showHidePasswords();
            $scope.modifyPasswordSuccess = "";
            $scope.modifyPasswordError = "";
            $scope.modifyPasswordSmallError = "";
        };
        
        
        // Új jelszavak megegyezőségének vizsgálata
        $scope.checkPWfields = function () {
            var pass1, pass2, html;
            $scope.modifyPasswordSuccess = "";
            $scope.modifyPasswordError = "";
            $scope.modifyPasswordSmallError = "";
            html = "";
            pass1 = document.getElementById('new_password_input').value;
            pass2 = document.getElementById('new_password_again_input').value;
            if (pass1 !== "" && pass2 !== "") {
                if (pass1 === pass2) {
                    html = '<span class="pw_success col-lg-1 col-md-1 col-sm-1 col-xs-1 ion-checkmark-circled"></span>';
                    document.getElementById('is_password_ok').innerHTML = html;
                    $scope.newPasswordFieldsMatch = true;
                } else {
                    html = '<span class="pw_error col-lg-1 col-md-1 col-sm-1 col-xs-1 ion-close-circled"></span>';
                    document.getElementById('is_password_ok').innerHTML = html;
                    $scope.newPasswordFieldsMatch = false;
                }
            } else {
                html = "";
                document.getElementById('is_password_ok').innerHTML = html;
                $scope.newPasswordFieldsMatch = false;
            }
        };
        
        
        // A régi jelszó helyes megadásának ellenőrzése
        $scope.isCurrentPasswordOK = function () {
            $scope.modifyPasswordSuccess = "";
            $scope.modifyPasswordError = "";
            $scope.modifyPasswordSmallError = "";
            $scope.checkPWfields();
            // Ellenőrzi, hogy az új jelszavak megegyeznek-e
            if ($scope.newPasswordFieldsMatch) {
                var promise = Webapi.login(($scope.isZem ? 'zem' : undefined), $scope.userData.username, $scope.userData.current_password);
                promise.success(function (response) {
                    if (!response || !response.token || response.token.length == 0 || !response.token[0].token) {
                        $scope.modifyPasswordError = 'A jelszó megváltoztatása nem sikerült!';
                        $scope.modifyPasswordSmallError = 'Helytelen régi jelszó!';
                        console.log('Helytelen régi jelszó!');
                        $scope.currentPasswordFailure();
                    } else {
                        // Régi jelszó megegyezik  -> JELSZÓ MÓDOSÍTÁS
                        $scope.modifyPassword();
                    }
                });
                promise.error(function (err, status) {
                    $scope.modifyPasswordError = 'A jelszó megváltoztatása nem sikerült!';
                });
            } else {
                // Az új jelszavak nem egyeznek
                $scope.modifyPasswordError = 'A jelszó megváltoztatása nem sikerült!';
                $scope.modifyPasswordSmallError = 'Az új jelszavak nem egyeznek!';
                console.log('Az új jelszavak nem egyeznek!');
            }
        };
        
        
        // Jelszó módosítás
        $scope.modifyPassword = function () {
            //JELSZÓ MÓDOSÍTÁS
            var promise = Webapi.handle_users($scope.userData.userID, $scope.userData.username, $scope.userData.familyname + " " + $scope.userData.surname, $scope.userData.new_password, 1, "", $scope.userData.email);
            promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) console.log(data);
                    $scope.modifyPasswordError = 'A jelszó megváltoztatása nem sikerült!';
                } else {
                    // Sikeres jelszómósosítás
                    $scope.modifyPasswordSuccess = 'A jelszót sikeresen megváltoztatta!';
                    $scope.passwordFailure = 0;
                    console.log('Elrontott kísérletek száma: ' + $scope.passwordFailure);
                }
            });
            promise.error(function (reason) {
                $scope.modifyPasswordError = 'A jelszó megváltoztatása nem sikerült!';
                if (console) {
                    console.log(reason);
                }
            });
        };
        
   
        // Jelszavak megjelenítése / elrejtése
        $scope.showHidePasswords = function () {
            if ($("#showHide").is(':checked')) {
                $("#current_password_input").attr("type", "text");
                $("#new_password_input").attr("type", "text");
                $("#new_password_again_input").attr("type", "text");
            } else {
                $("#current_password_input").attr("type", "password");
                $("#new_password_input").attr("type", "password");
                $("#new_password_again_input").attr("type", "password");
            }
        };
        
        
        
        // Hibás kísérletek számolása (hibásan beírt jelenlegi jelszó)
        $scope.currentPasswordFailure = function () {
            $scope.passwordFailure += 1;
            console.log('Elrontott kísérletek száma: ' + $scope.passwordFailure);
            
            // Utolsó 3 próbálkozásnál figyelmeztető szöveg       
            if ($scope.passwordFailure === 7) {
                alert('Már csak háromszor próbálkozhat!')
            } 
            if ($scope.passwordFailure === 8) {
                alert('Már csak kétszer próbálkozhat!')
            } 
            if ($scope.passwordFailure === 9) {
                alert('Már csak egyszer próbálkozhat!')
            }
            // Ha 10-szer hibásan próbálkozik a jelenlegi jelszóval, kijelentkezteti
            if ($scope.passwordFailure >= 10) {
                //LOGOUT
                $scope.logoutError = false;
                var promise = Webapi.logout();
                promise.success(function (response) {
                    $rootScope.initUser();
                    $rootScope.setUserSession();
                });
                promise.error(function (err, status) {
                    $rootScope.initUser();
                    $rootScope.setUserSession();
                });
            }
        };
        
    
        
        // Jelszó ellenőrzés - Erősség 
/*        (function () {
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
        })();*/
    
        
    }
})();


