'use strict';

var cf = cf || {};
cf.WebapiExt = cf.WebapiExt || {};
cf.WebapiExt.appendAccount = function (webapiSvc) {
    webapiSvc = webapiSvc || {}; // ha nem kapunk semmit...

    /* LOGIN */
    if (webapiSvc.login) alert("'login' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.login = function (fh, jsz) {
        var data = { db: 'waut', pars: { fh: fh, jsz: jsz } };
        var promise = webapiSvc.getJson(data, 'account/bejelentkezes');
        return promise;
    };
    if (webapiSvc.logout) alert("'logout' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.logout = function () {
        var data = { db: 'waut' };
        var promise = webapiSvc.getJson(data, 'account/kijelentkezes');
        return promise;
    }
    if (webapiSvc.changePw) alert("'changePw' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.changePw = function (u_id, regiJsz, ujJsz) {
        var data = {
            "db": "waut",
            "pars": {
                "u_id": u_id,
                "regiJsz": regiJsz,
                "ujJsz": ujJsz,
            },
            log:
                {
                    "enabled": true,
                },
        };
        var promise = webapiSvc.getJson(data, 'account/jszMod');
        return promise;
    };
    if (webapiSvc.list_mailGroups) alert("'list_mailGroups' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.list_mailGroups = function (mgid) {
        var data = {
            "db": "waut",
            "pars": {
                "mgid": mgid
            }
        };
        var promise = webapiSvc.getJson(data, 'account/levCsopLista');
        return promise;
    };
    if (webapiSvc.list_mailGroupsMembers) alert("'list_mailGroupsMembers' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.list_mailGroupsMembers = function (mgid) {
        var data = {
            "db": "waut",
            "pars": {
                "mgid": mgid || 0
            }
        };
        var promise = webapiSvc.getJson(data, 'account/levCsopTagsagLista');
        return promise;
    };
    if (webapiSvc.list_users) alert("'list_users' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.list_users = function (u_id, sname) {
        var data = {
            "db": "waut",
            "pars": {
                "u_id": u_id,
                "sname": sname
            }
        };
        var promise = webapiSvc.getJson(data, 'account/felhLista');
        return promise;
    };
    if (webapiSvc.remove_user_group_member) alert("'remove_user_group_member' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.remove_user_group_member = function (ugm_id, u_id, ug_id, operator, dir) {
        var data = {
            "db": "waut",
            "pars": {
                "ugm_id": ugm_id,
                "u_id": u_id,
                "ug_id": ug_id,
                "operator": operator,
                "dir": dir
            },
            log: {
                enabled: true,
            },
        };
        var promise = webapiSvc.getJson(data, 'account/csopFelhTorles');
        return promise;
    };
    if (webapiSvc.add_user_group_member) alert("'add_user_group_member' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.add_user_group_member = function (ugm_id, u_id, ug_id, operator, dir) {
        var data = {
            "db": "waut",
            "pars": {
                "ugm_id": ugm_id,
                "u_id": u_id,
                "ug_id": ug_id,
                "operator": operator,
                "dir": dir
            },
            log: {
                enabled: true,
            },
        };
        var promise = webapiSvc.getJson(data, 'account/csopFelhTorles');
        return promise;
    };
    if (webapiSvc.handle_mailGroupMembers) alert("'handle_mailGroupMembers' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.handle_mailGroupMembers = function (mgid, u_id, dir) {
        var data = {
            "db": "waut",
            "pars": {
                "mgid": mgid,
                "u_id": u_id,
                "dir": dir
            },
            log: {
                enabled: true,
            },
        };
        var promise = webapiSvc.getJson(data, 'account/levCsopTagsagMod');
        return promise;
    };
    if (webapiSvc.sendmail) alert("'sendmail' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.sendmail = function (mgid, subject, body) {
        var data = {
            "db": "waut",
            "pars": {
                "mgid": mgid,
                "subject": subject,
                "body": body
            },
            log: {
                enabled: true,
            },
        };
        var promise = webapiSvc.getJson(data, 'account/levKuld');
        return promise;
    };


    // a melyik kártya van bedugva?
    if (webapiSvc.getStation) alert("'getStation' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.getStation = function (machinename, opcode) {
        var data = {
            "db": "cdb",
            "action": "find_machine_v2",
            "pars": {
                "machinename": machinename,
                "opcode": opcode,
            },
            log:
            {
                "enabled": false,
            },
        };
        var promise = getCard2(data);
        return promise;
    }
    if (webapiSvc.getCardId) alert("'getCardId' néven már van webapi hívás. Másik adatbázisra vonatkozik? Vagy már más létrehozta ? ");
    webapiSvc.getCardId = function () {
        var data = {
            "db": "cdb",
            "action": "read_newcard",
            "pars": {
            },
            log:
            {
                "enabled": true,
            },
        };
        var promise = getCardId(data);
        return promise;

    }



    /* LOGIN VÉGE */

}