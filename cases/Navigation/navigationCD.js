
import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { env, getUesrName } from '../../index.js';

export default function () {
    var commonData = group('getAllMenu', function () {
        var params = getUesrName(env.userName);
        var url = `${env.api}/Menu/all`;
        var response = http.get(url, params);
        check(response, {
            'status is 200': (r) => r.status === 200
        });
        return JSON.parse(response.body);
    });
    sleep(1);
    return commonData;
}
