import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { env, getUesrName } from '../../index.js';
import commonData from './navigationCD.js';

export default function () {
    var gloubData = commonData();
    console.log(JSON.stringify(gloubData));
    var data = {
        menuName: '测试菜单',
        parentMenuId: '7c11acbb-1c45-4780-b9d5-3f1f38950843',
        menuUrl: '',
        roleNames: '',
        menuSortNumber: '',
        menuStyle: 'icon-cms-setting'
    };

    var payload = JSON.stringify(data);

    group('addMenu', function () {
        var params = getUesrName();
        var url = `${env.api}/Menu`;
        var response = http.post(url, payload, params);
        check(response, {
            'status is 200': (r) => r.status === 200
        });
    });
    var menuId = '';
    gloubData.forEach(one => {
        if (one.menuName === data.menuName) {
            menuId = one.menuId;
        } else {
            one.childrenNode.forEach((oneDep) => {
                if (oneDep.menuName === data.menuName) {
                    menuId = one.menuId;
                } else {
                    console.log('没有找到对应菜单');
                }
            });
        }
    });
    group('deleteMenu', function () {
        var params = getUesrName();
        var url = `${env.api}/Menu/${menuId}`;
        var response = http.post(url, payload, params);
        check(response, {
            'status is 200': (r) => r.status === 200
        });
    });
    sleep(1);
}
