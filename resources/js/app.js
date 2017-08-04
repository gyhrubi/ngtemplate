var cf = cf || {};

cf.showError = function (e) {
    console.log(e);
};

var app = angular.module('app', ['ngRoute','ngSanitize']);

app.run(function ($rootScope,$http) {

    /** A $rootScope.user-t elmenti sessionStorage-be
    * Ha a $rootScope.user.token == null, akkor törli a bejelentkezést */
    $rootScope.setUserSession = function () {
        if ($rootScope.user && $rootScope.user.token) {
            sessionStorage.setItem("token", $rootScope.user.token);
            sessionStorage.setItem("userJson", JSON.stringify($rootScope.user));
            $http.defaults.headers.common.Authorization = $rootScope.user.token;
        } else {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userJson");
            $http.defaults.headers.common.Authorization = undefined;
        }
    };

    /** Előszedi a user sessiont, beteszi a $rootScope.user -be, és beállítja az auth headert */
    $rootScope.restoreUserSession = function () {
        if (sessionStorage.userJson) {
            $rootScope.user = JSON.parse(sessionStorage.userJson);
            $http.defaults.headers.common.Authorization = $rootScope.user.token;
        }
    };

     /** @returns aktuális tokent */
    $rootScope.getToken = function () {
        if (sessionStorage.token) {
            return sessionStorage.token;
        } else {
            return null;
        }
    };

    /** Kijelentkezteti a user-t */
    $rootScope.initUser = function () {
        $rootScope.user = {
            isAuthenticated: false,
            username: null,
            fullname: null,
            groups: [],
            token: null,
            expires: new Date()
        };
    };

    // A user objektum inicializálása
    $rootScope.initUser();

    // Állítsuk vissza a bejelentkezett felhasználó adatait
    $rootScope.restoreUserSession();

});

app.config(['$routeProvider', function($routeProvider){

    $routeProvider
    .when('/', { templateUrl: 'resources/subpages/cfTestPage1/testpage1.html' })
    .when('/login', { templateUrl: 'resources/subpages/cfLoginPage/login_page.html' })
    .when('/test1', { templateUrl: 'resources/subpages/cfTestPage1/testpage1.html' })
    .when('/test2', { templateUrl: 'resources/subpages/cfTestPage2/testpage2.html' })
    .when('/test3', { templateUrl: 'resources/subpages/cfTestPage3/testpage3.html' })
    .when('/test4', { templateUrl: 'resources/subpages/cfTestPage4/testpage4.html' })
    .when('/test5', { templateUrl: 'resources/subpages/cfTestPage5/testpage5.html' })
    .when('/forgottenpw', { templateUrl: 'resources/subpages/cfForgottenPw/cf_forgotten_pw.html' })

}]);

/** HTTP header beállítása */
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.post['Accept'] = 'application/json';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
}]);

/** Elkapja azt a hibát, ha nem elérhető a Web API szerver */
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q) {
        return {
            responseError: function (rejection) {
                if (rejection.status <= 0) {
                    //window.location = "noresponse.html";
                    rejection.data = 'Nincs kapcsolat a szerverrel: ' + rejection.config.url;
                }
                if (console) console.log(rejection.data);
                return $q.reject(rejection);
            }
        };
    });
});

app.factory('Webapi', function ($http, $templateCache, $rootScope) {
    /* Alap beállítások */
    var config = {};

    // melyik konfigurációt használjuk alapértelmezetten?
    config = cf.config.webapi[cf.config.webapi.current];
    //config = cf.config.webapi.test;
    //config = cf.config.webapi.prod;
    //config = cf.config.webapi.bak;
    config.name = cf.config.webapi.current;

    /* Alap beállítások VÉGE*/

    /* API lekérdezések */
    var webapiSvc = {};

    var getJson = function (data, endpoint) {
        if (!endpoint) endpoint = 'dt';
        var version = '?ver=' + cf.config.webapi.version;

        return $http.post(config.url + '/' + endpoint + version, JSON.stringify(data));
    };

    webapiSvc.login = function (domain, fh, jsz) {
        var data = { db: 'wautlocal', pars: { domain: domain, fh: fh, jsz: jsz } };
        var promise = getJson(data, 'login');
        return promise;
    };

    webapiSvc.logout = function () {
        var data = { db: 'wautlocal' };
        var promise = getJson(data, 'logout');
        return promise;
    }
    
    return webapiSvc;

});

app.controller('appCtrl', ['$scope','$rootScope', function($scope, $rootScope){

    $scope.showMobileNavBar = false;
    $rootScope.showLeftNav = true;

    $scope.toggleMobileNavBar = function() {
        $scope.showMobileNavBar = ! $scope.showMobileNavBar;
    };


}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
    
