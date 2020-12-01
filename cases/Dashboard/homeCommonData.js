// 首页共用
import http from 'k6/http';
import { sleep, group } from 'k6';
import runtime from '../../runtime/index.js';
const { session } = runtime.variables;
export default function () {
    var temp = group('login', function () {
        var params = runtime.k6Helper.httpHelper.defaultParams(session.sub);
        var url = 'http://11.11.180.90:7122/user/16aefacadd6e49178eb9b74e72224a18/accounts';
        var response = http.get(url, params);
        temp = JSON.parse(response.body);
        console.log(JSON.stringify(temp));
        runtime.k6Helper.checkHelper.defaultCheck(response);
        return JSON.parse(response.body);
    });
    sleep(1);
    return temp;
}
