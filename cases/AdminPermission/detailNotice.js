// 首页通知公告详情
import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { env, getUesrName } from '../../index.js';
import CommonData from './homeCommonData.js';

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
        var params = getUesrName(userName);
        var url = `${env.api}/user/FindUserOrgInfoByID`;

        var response = http.post(url, payload, params);
        check(response, {
            'status is 200': (r) => r.status === 200
        });
    });

    group('getMenus', function () {
        var params = getUesrName(userName);
        var url = `${env.api}/Menu/GetNewMenu?userName=${encodeURI(env.userName)}`;
        let resps = http.get(url, params);
        check(resps, {
            'status is 200': (r) => r.status === 200
        });
    });

    group('NoticeList', function () {
        var params = getUesrName(userName);
        var url = `${env.api2}/notice/get/NoticeList?UserID=${encodeURI(env.userName)}&BeginTime=2020-08-15&EndTime=2020-09-16&Title=&PageIndex=1&PageSize=100`;
        let resps = http.get(url, params);
        check(resps, {
            'status is 200': (r) => r.status === 200
        });
    });

    group('GetReadyTask', function () {
        var params = getUesrName(userName);
        var url = `${env.api}/Task/GetReadyTask?title=&fileType=&status=&taskTime=&userName=${encodeURI(env.userName)}&pageIndex=1&pageSize=10&bigType=`;
        let resps = http.get(url, params);
        check(resps, {
            'status is 200': (r) => r.status === 200
        });
    });

    group('GetUserFlowCollectList', function () {
        var params = getUesrName(userName);
        var url = `${env.api}/ColligrateQuery/GetUserFlowCollectList?username=${encodeURI(env.userName)}&title=&pageNo=1&pageSize=3`;
        let resps = http.get(url, params);
        check(resps, {
            'status is 200': (r) => r.status === 200
        });
    });

    group('UrgencyTask', function () {
        var params = getUesrName(userName);
        var url = `${env.api}/UrgencyTask/user?target=${encodeURI(env.userName)}&skip=0&top=10&displayName=&documentName=`;
        let resps = http.get(url, params);
        check(resps, {
            'status is 200': (r) => r.status === 200
        });
    });

    group('UrgencyTask', function () {
        var params = getUesrName(userName);
        var url = `${env.api}/UrgencyTask/user?target=${encodeURI(env.userName)}&skip=0&top=10&displayName=&documentName=`;
        let resps = http.get(url, params);
        check(resps, {
            'status is 200': (r) => r.status === 200
        });
    });

    group('/ColligrateQuery/StatUserDocData', function () {
        var data = { 'Target': env.userName, 'BeginDate': '2020/09/01', 'EndDate': '2020/09/30', 'Type': '发文' };
        var payload = JSON.stringify(data);
        var params = getUesrName(userName);
        var url = `${env.api}/ColligrateQuery/StatUserDocData`;

        var response = http.post(url, payload, params);
        check(response, {
            'status is 200': (r) => r.status === 200
        });
    });

    var detail = group('NoticeList', function () {
        var params = getUesrName(userName);
        var url = `${env.api2}/notice/get/NoticeList?UserID=${userName}&BeginTime=2020-08-19&EndTime=2020-09-19&Title=&PageIndex=1&PageSize=10`;
        var response = http.get(url, params);
        check(response, {
            'status is 200': (r) => r.status === 200
        });
        return JSON.parse(response.body);
    });
    var docFileID = detail.data[0].webDocID;
    var noticeID = detail.data[0].noticeID;

    group('Preview', function () {
        var params = getUesrName(userName);
        var url = `${env.api2}/Docs/Preview?docFileID=${docFileID}`;
        let resps = http.get(url, params);
        check(resps, {
            'status is 200': (r) => r.status === 200
        });
    });

    group('GetAccessoryListByNoticeID', function () {
        var params = getUesrName(userName);
        var url = `${env.api}/Notice/GetAccessoryListByNoticeID?NoticeID=${noticeID}&isAsc=true`;
        let resps = http.get(url, params);
        check(resps, {
            'status is 200': (r) => r.status === 200
        });
    });
    sleep(1);
}