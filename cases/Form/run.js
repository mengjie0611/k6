// Creator: WebInspector 537.36

import { check, sleep, group } from 'k6';
import http from 'k6/http';

export const options = {};

export default function main () {
    let response;

    group('page_4 - http://11.11.180.90:6030/signin-oidc', function () {
        response = http.get(
            'http://11.11.180.90:7122/orgs/RootOrgs?_=1602551083613',
            {
                headers: {
                    Host: '11.11.180.90:7122',
                    Connection: 'keep-alive',
                    Accept: 'application/json, text/javascript, */*; q=0.01',
                    UserName: 'ptr\\wangzheng01',
                    Authorization:
            'Bearer 32633637838b453797ee4d6d75c723ebbdb9c41b525571ffe50db40d96be032e',
                    'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
                    'Content-Type': 'application/json',
                    Origin: 'http://11.11.180.90:6030',
                    Referer: 'http://11.11.180.90:6030/index.html',
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'zh-CN,zh;q=0.9'
                }
            }
        );
        check(response, {
            'status is 200': (r) => r.status === 200
        });
        response = http.get(
            'http://11.11.180.90:7122/Orgs/ChildrenOrgs?oid=5c740b40-bb43-468a-87ee-833967b4083b&type=0&isAdmin=true&_=1602551083614',
            {
                headers: {
                    Host: '11.11.180.90:7122',
                    Connection: 'keep-alive',
                    Accept: 'application/json, text/javascript, */*; q=0.01',
                    UserName: 'ptr\\wangzheng01',
                    Authorization:
            'Bearer 32633637838b453797ee4d6d75c723ebbdb9c41b525571ffe50db40d96be032e',
                    'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
                    'Content-Type': 'application/json',
                    Origin: 'http://11.11.180.90:6030',
                    Referer: 'http://11.11.180.90:6030/index.html',
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'zh-CN,zh;q=0.9'
                }
            }
        );
        check(response, {
            'status2 is 200': (r) => r.status === 200
        });
        response = http.get(
            'http://11.11.180.90:7122/Orgs/ChildrenOrgs?oid=5c740b40-bb43-468a-87ee-833967b4083b&type=0&isAdmin=true&_=1602551083615',
            {
                headers: {
                    Host: '11.11.180.90:7122',
                    Connection: 'keep-alive',
                    Accept: 'application/json, text/javascript, */*; q=0.01',
                    UserName: 'ptr\\wangzheng01',
                    Authorization:
            'Bearer 32633637838b453797ee4d6d75c723ebbdb9c41b525571ffe50db40d96be032e',
                    'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
                    'Content-Type': 'application/json',
                    Origin: 'http://11.11.180.90:6030',
                    Referer: 'http://11.11.180.90:6030/index.html',
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'zh-CN,zh;q=0.9'
                }
            }
        );
        check(response, {
            'status3 is 200': (r) => r.status === 200
        });
    });

    // Automatically added sleep
    sleep(1);
}
