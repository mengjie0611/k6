// 关注
import http from 'k6/http';
import { sleep, group } from 'k6';
import runtime from '../../runtime/index.js';
import CommonData from './homeCommonData.js';
// import { utils } from '../../startup/index.js';

const { parameters, session } = runtime.variables;

export default function () {
    var allCommonData = CommonData();
    var userName = allCommonData.masterAccount.user.userName;
    group('getUser', function () {
        var data = [];
        data.push(allCommonData.masterAccount.user.userID);
        allCommonData.relatedAccounts.forEach(function (item) {
            data.push(item.user.userID);
        });
        var payload = JSON.stringify(data);
        var params = runtime.k6Helper.httpHelper.defaultParams(userName);
        var url = `${parameters.orgApi}/user/FindUserOrgInfoByID`;

        var response = http.post(url, payload, params);
        runtime.k6Helper.checkHelper.defaultCheck(response);
    });

    group('getMenus', function () {
        var params = runtime.k6Helper.httpHelper.defaultParams(userName);
        var url = `${parameters.orgApi}/Menu/GetNewMenu?userName=${encodeURI(session.adSub)}`;
        let resps = http.get(url, params);
        runtime.k6Helper.checkHelper.defaultCheck(resps);
    });

    group('NoticeList', function () {
        var params = runtime.k6Helper.httpHelper.defaultParams(userName);
        var url = `${parameters.host3}:${parameters.docEditorApi}/notice/get/NoticeList?UserID=${encodeURI(session.adSub)}&BeginTime=2020-08-15&EndTime=2020-09-16&Title=&PageIndex=1&PageSize=100`;
        let resps = http.get(url, params);
        runtime.k6Helper.checkHelper.defaultCheck(resps);
    });

    group('GetReadyTask', function () {
        var params = runtime.k6Helper.httpHelper.defaultParams(userName);
        var url = `${parameters.orgApi}/Task/GetReadyTask?title=&fileType=&status=&taskTime=&userName=${encodeURI(session.adSub)}&pageIndex=1&pageSize=10&bigType=`;
        let resps = http.get(url, params);
        runtime.k6Helper.checkHelper.defaultCheck(resps);
    });
    group('GetUserFlowCollectList', function () {
        var params = runtime.k6Helper.httpHelper.defaultParams(userName);
        var url = `${parameters.orgApi}/ColligrateQuery/GetUserFlowCollectList?username=${encodeURI(session.adSub)}&title=&pageNo=1&pageSize=3`;
        let resps = http.get(url, params);
        runtime.k6Helper.checkHelper.defaultCheck(resps);
    });

    group('UrgencyTask', function () {
        var params = runtime.k6Helper.httpHelper.defaultParams(userName);
        var url = `${parameters.orgApi}/UrgencyTask/user?target=${encodeURI(session.adSub)}&skip=0&top=10&displayName=&documentName=`;
        let resps = http.get(url, params);
        runtime.k6Helper.checkHelper.defaultCheck(resps);
    });

    group('UrgencyTask', function () {
        var params = runtime.k6Helper.httpHelper.defaultParams(userName);
        var url = `${parameters.orgApi}/UrgencyTask/user?target=${encodeURI(session.adSub)}&skip=0&top=10&displayName=&documentName=`;
        let resps = http.get(url, params);
        runtime.k6Helper.checkHelper.defaultCheck(resps);
    });

    group('/ColligrateQuery/StatUserDocData', function () {
        var data = { 'Target': session.adSub, 'BeginDate': '2020/09/01', 'EndDate': '2020/09/30', 'Type': '发文' };
        var payload = JSON.stringify(data);
        var params = runtime.k6Helper.httpHelper.defaultParams(userName);
        var url = `${parameters.orgApi}/ColligrateQuery/StatUserDocData`;

        var response = http.post(url, payload, params);
        runtime.k6Helper.checkHelper.defaultCheck(response);
    });

    group('GetUserFlowCollectList', function () {
        var params = runtime.k6Helper.httpHelper.defaultParams(userName);
        var url = `${parameters.orgApi}/ColligrateQuery/GetUserFlowCollectList?username=${encodeURI(session.adSub)}&title=&pageNo=1&pageSize=10`;
        var response = http.get(url, params);
        runtime.k6Helper.checkHelper.defaultCheck(response);
    });
    sleep(1);
}
