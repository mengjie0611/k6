import { check } from 'k6';

const k6Helper = {
    httpHelper: {
        defaultParams: function (userName) {
            return {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${variables.session.tokenType} ${variables.session.accessToken}`,
                    UserName: userName
                }
            };
        }
    },
    checkHelper: {
        defaultCheck: function (response) {
            check(response, { 'status is 200': (r) => r.status === 201 });
        }
    }
};

const Env = {
    Options: {
        vus: 1,
        iterations: 1
    }
};

const variables = {
    parameters: {
        'host3': 'http://11.11.180.90',
        'orgApi': 'http://11.11.180.90:7122',
        'UCApi': 'http://11.11.180.79:6010',
        'formManageApi': 'http://11.11.180.50:6050',
        'subCenterAPi': 'http://11.11.180.125:6080',
        'workFlowApi': '7120',
        'docEditorApi': '7121',
        'orgUserRole': '7122',
        'archivingPort': '7124',
        'processApi': '7120',
        'paprm': '7122',
        'domain': '60105',
        'tasks': '60030',
        'sealServer': '60050',
        'dailyDictions': '60061',
        'org': '60065',
        'notice': '60070',
        'reservation': '60090',
        'reportUrl': 'http://11.11.180.69:9999/ReportServer/logon.aspx?ReturnUrl=%2Fpowerbi%2F%3Fid%3Dbe2b534a-8e21-4f11-8823-4b6c2e69a027%26formatLocale%3Dzh-CN&token='
    },
    session: {
        'idToken': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdlZmNkYmUyN2Y1NjM1YWQ0ZmVlOTgxM2Q5NDUwNGVjIiwidHlwIjoiSldUIn0.eyJuYmYiOjE2MDA0OTU1MzcsImV4cCI6MTYwMDQ5NTgzNywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5vYXBsdXMucGV0cm9jaGluYSIsImF1ZCI6IldvcmtzcGFjZSIsIm5vbmNlIjoiNjM3MzYwOTIzMzUwODc0MjEwLlpqQmpaamsyTlRFdE1HSXhOQzAwT0dJMUxXSTBaakF0WW1ReE5EQmxZMkkzWkRkbFlUY3pPR0l4WVdNdE56WXdaaTAwWkRSaExXRTBNell0TWpnMFpEaGlPR05qWkRBeiIsImlhdCI6MTYwMDQ5NTUzNywiYXRfaGFzaCI6IjhrVERTZ2t6V0w5d09NQjdFOTIxaFEiLCJzaWQiOiI2ODRmMzMzNmY0MzQxMWQ5NjE3OGM1NDZiNGI2MjJkZSIsInN1YiI6IjE2YWVmYWNhZGQ2ZTQ5MTc4ZWI5Yjc0ZTcyMjI0YTE4IiwiYXV0aF90aW1lIjoxNjAwNDk1NTM2LCJpZHAiOiJsb2NhbCIsImFtciI6WyJwd2QiXX0.biNlB893V59FEABKhCPD_taKHsmMNKiEzQS7PP2t-wtLhtrfA7Kz56QO3ZQZnx4WynHHgow5kDscWNSeXSLfCoTStakcf6Ptzn6WgobWebjjm771MHE2Ge9HZgdfpF11-9Pe6XzVA6DTARx_9pFSVFvnn_LxV02Ht16lhTtBwSfNDhEM4lWiLEg7-iYnp-Fh9HQwrNcecvYpFYFKiMp6vjEE20QIjsSkxUuAtsCfF0mCfln-8a8cQxt_kbgFQAWi-_13UgLGPTtfoEaRZ0VSxmwjHylPVAgb9lhkDBRDmc8kQ2gwKpix2KzSCcGjnl4Y92JX7Buca9FWW-p4UH49zw',
        'tokenType': 'Bearer',
        'accessToken': 'd6fd059f3ea59571c639a46e661066368712d50b67ae1fe06718a8850f48ce7f',
        'sid': '684f3336f43411d96178c546b4b622de',
        'sub': '16aefacadd6e49178eb9b74e72224a18',
        'idp': 'local',
        'name': '16aefacadd6e49178eb9b74e72224a18',
        'email': 'ceshi126@126.com',
        'displayName': '王铮',
        'mobile': '13853068686',
        'orgId': 'c1bb78c017084e5c93d847c7aa59b1d5',
        'orgSub': '65035840',
        'orgName': '市场化',
        'adSub': 'ptr\\wangzheng01',
        'iamSub': 'T0360853'
    }
};

const runtime = {
    Env,
    variables,
    k6Helper
};

export default runtime;
