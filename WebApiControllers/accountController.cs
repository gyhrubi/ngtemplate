using Comforth.BWDataSources;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers {
    [RoutePrefix("api/account")]
    public class accountController : BaseApiController {
        [Route("bejelentkezes")]
        public DataSet Login([FromBody]object value) {
            JsonRequestDb oJson;
            try {
                oJson = JsonConvert.DeserializeObject<JsonRequestDb>(value.ToString());
            } catch (Exception) {
                throw new Exception("Nem sikerült értelmezni a JSON adatot. A helyes formátum pl: {db:'Ostomy',action:'login',pars:{fh:'asos',jsz:'asosasos'}}");
            }
            addTokenToPars(oJson);
            if (logInfo == null) logInfo = BaseApiController.logInfoFactory();
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                Dictionary<string, string> pars = oJson.pars;
                pars.Add("IP", (Request.GetOwinContext() == null ? "na" : Request.GetOwinContext().Request.RemoteIpAddress));
                if (oJson.log != null && !string.IsNullOrWhiteSpace(oJson.log.msg)) logInfo.Log(oJson.log.msg);
                if (oJson.log == null || !oJson.log.enabled) _sql.logger.DisabledOnce();
                using (DataSet ds = _sql.login(pars)) {
                    if (ds != null && ds.Tables.Count == 2) {
                        ds.Tables[0].TableName = "token";
                        ds.Tables[1].TableName = "groups";
                    }
                    return ds;
                }
            }
        }

        [Route("kijelentkezes")]
        public HttpResponseMessage Logout([FromBody]object value) {
            JsonRequestDb oJson;
            try {
                oJson = JsonConvert.DeserializeObject<JsonRequestDb>(value.ToString());
            } catch (Exception) {
                throw new Exception("Nem sikerült értelmezni a JSON adatot. A helyes formátum pl: {db:'Ostomy',action:'login',pars:{fh:'asos',jsz:'asosasos'}}");
            }
            addTokenToPars(oJson);
            if (logInfo == null) logInfo = BaseApiController.logInfoFactory();
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                Dictionary<string, string> pars = oJson.pars;
                if (oJson.log != null && !string.IsNullOrWhiteSpace(oJson.log.msg)) logInfo.Log(oJson.log.msg);
                if (oJson.log == null || !oJson.log.enabled) _sql.logger.DisabledOnce();
                _sql.logout(pars);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }

        private bool checkPw(string fh, string pw) {
            throw new NotImplementedException("Meg kéne csinálni");
        }
        public void changePw(Dictionary<string, string> pars) {
            // A hiányzó 
            pars.Add("pw", pars["ujJsz"]);
            pars.Add("sname", null);
            pars.Add("lname", null);
            pars.Add("enabled", null);
            pars.Add("email", null);
            _sql.handle_users(pars);
        }

        /// <summary>
        /// Jelszó módosítás
        /// </summary>
        /// <param name="oJson">Kötelező paraméterek: u_id, ujJsz, regiJsz</param>
        /// <returns></returns>
        [Route("jszMod")]
        public HttpResponseMessage changePw([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            addTokenToPars(oJson);
            if (!checkPw(oJson.pars["fh"], oJson.pars["regiJsz"])) {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, new UnauthorizedAccessException("Hibás jelszót adtál meg"));
            }
            try {
                int userId;
                if (!int.TryParse(oJson.pars["u_id"], out userId)) {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("Érvénytelen u_id"));
                }
                this.changePw(oJson.pars);
                return Request.CreateResponse(HttpStatusCode.OK);
            } catch (Exception ex) {
                if (logInfo != null) { logInfo.Log(ex); }
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        [Route("felhLista")]
        public HttpResponseMessage listUsers([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            addTokenToPars(oJson);
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                using (DataTable dt = _sql.list_users(oJson.pars)) {
                    return Request.CreateResponse(HttpStatusCode.OK, dt);
                }
            }
        }

        [Route("csopLista")]
        public HttpResponseMessage listGroups([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            addTokenToPars(oJson);
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                using (DataTable dt = _sql.list_user_Groups(oJson.pars)) {
                    return Request.CreateResponse(HttpStatusCode.OK, dt);
                }
            }
        }
        [Route("csopTagsagLista")]
        public HttpResponseMessage listGroupMembers([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            addTokenToPars(oJson);
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                using (DataTable dt = _sql.list_userGroupsMembers(oJson.pars)) {
                    return Request.CreateResponse(HttpStatusCode.OK, dt);
                }
            }
        }
        [Route("csopJogLista")]
        public HttpResponseMessage listGroupRights([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            addTokenToPars(oJson);
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                using (DataTable dt = _sql.list_userGroupsRights(oJson.pars)) {
                    return Request.CreateResponse(HttpStatusCode.OK, dt);
                }
            }
        }
        [Route("levCsopLista")]
        public HttpResponseMessage listMailGroups([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            addTokenToPars(oJson);
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                using (DataTable dt = _sql.list_mailGroups(oJson.pars)) {
                    return Request.CreateResponse(HttpStatusCode.OK, dt);
                }
            }
        }
        [Route("levCsopTagsagLista")]
        public HttpResponseMessage listMailGroupMembers([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            addTokenToPars(oJson);
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                using (DataTable dt = _sql.list_mailGroupsMembers(oJson.pars)) {
                    return Request.CreateResponse(HttpStatusCode.OK, dt);
                }
            }
        }
        [Route("levCsopTagsagMod")]
        public HttpResponseMessage handleMailGroupMembers([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            addTokenToPars(oJson);
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                using (DataTable dt = _sql.handle_mailGroupMembers(oJson.pars)) {
                    return Request.CreateResponse(HttpStatusCode.OK, dt);
                }
            }
        }
        [Route("levKuld")]
        public HttpResponseMessage sendMail([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            addTokenToPars(oJson);
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                using (DataTable dt = _sql.sendmail(oJson.pars)) {
                    return Request.CreateResponse(HttpStatusCode.OK, dt);
                }
            }
        }

        /// <summary>
        /// Felhasználót hozzáaad csoporthoz
        /// </summary>
        /// <param name="oJson">Kötelező paraméterek: u_id, ug_id</param>
        /// <returns></returns>
        [Route("csopFelhHozzaadas")]
        public HttpResponseMessage addUserGroupMember([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            oJson.pars.Add("dir", "1");
            return addRemoveUserGroupMember(oJson);
        }
        /// <summary>
        /// Felhasználót töröl csoportból
        /// </summary>
        /// <param name="oJson">Kötelező paraméterek: u_id, ug_id</param>
        /// <returns></returns>
        [Route("csopFelhTorles")]
        public HttpResponseMessage removeUserGroupMember([FromBody]JsonRequestDb oJson) {
            if (oJson == null) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A json nem értelmezhető"));
            }
            oJson.pars.Add("dir", "0");
            return addRemoveUserGroupMember(oJson);
        }
        private HttpResponseMessage addRemoveUserGroupMember(JsonRequestDb oJson) {
            addTokenToPars(oJson);
            using (_sql = new Sql(getConnectionString(oJson.db), logInfo)) {
                using (DataTable dt = _sql.handle_user_group_members(oJson.pars)) {
                    return Request.CreateResponse(HttpStatusCode.OK, dt);
                }
            }
        }

    }
}
