(function () {
    'use strict';

    angular.module('app')
        .controller('userprofile_pageCtrl', ['$scope', '$http', '$rootScope', '$sce','Webapi', userprofile_pageCtrl]);

    function userprofile_pageCtrl($scope, $http, $rootScope, $sce, Webapi) {
        var vm = this;

        $rootScope.pageTitle = 'User profile';

        // Látszódjon a felső és oldalsó Nav bar?
        $rootScope.showTopNav = true;
        //$rootScope.showTopNav = false;
        $rootScope.showLeftNav = true;
        //$rootScope.showLeftNav = false;

        // IDE ÍRJ:

        $scope.userData = {
            username: "",
            email: "",
            familyname: "",
            surname: "",
            phone: "",
            domain: ""
        }
                
        $scope.formElements = [
            {
                divClass: "reg_username",
                inputID: "reg_username_input",
                labelText: "Felhasználónév",
                requiredStar: "*",
                inputType: "text",
                inputVariable: "username",
                errorMessage: ""
            },
            {
                divClass: "reg_email",
                inputID: "reg_email_input",
                labelText: "E-mail cím",
                requiredStar: "*",
                inputType: "email",
                inputVariable: "email",
                errorMessage: "Adj meg egy érvényes e-mail címet!"
            },
            {
                divClass: "reg_familyname",
                inputID: "reg_familyname_input",
                labelText: "Vezetéknév",
                requiredStar: "*",
                inputType: "text",
                inputVariable: "familyname",
                errorMessage: "Adj meg egy vezetéknevet!"
            },
            {
                divClass: "reg_surname",
                inputID: "reg_surname_input",
                labelText: "Keresztnév",
                requiredStar: "*",
                inputType: "text",
                inputVariable: "surname",
                errorMessage: "Adj meg egy keresztnevet!"
            },
            {
                divClass: "reg_phone",
                inputID: "reg_phone_input",
                labelText: "Telefonszám",
                inputType: "text",
                inputVariable: "phone"
            },
            {
                divClass: "reg_domain",
                inputID: "reg_domain_input",
                labelText: "Domain",
                inputType: "text",
                inputVariable: "domain"
            }
        ];

        
        $scope.newPasswordElements = [
            {
                divClass: "old_password",
                inputID: "old_password_input",
                labelText: "Régi jelszó"
            },
            {
                divClass: "new_password",
                inputID: "new_password_input",
                labelText: "Új jelszó"
            },
            {
                divClass: "new_password_again",
                inputID: "new_password_again_input",
                labelText: "Új jelszó újra"
            },
        
        ];
        
        $scope.getUserData = function() {
            
            var promise = Webapi.list_users("0", "42230",1);
            promise.success(function (data) {
                if (Webapi.isError(data)) {
                    if (console) console.log(data);
                    //e.error(data);
                } else {
                    $scope.userData.familyname = data[0].lname;
                    //if (console) console.log($scope.usersAdminGrid.dataSet);
                    //e.success(data);
                }               
        
            });        
        };
        
        $scope.getUserData();
    }
})();
