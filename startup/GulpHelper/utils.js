import readline from 'readline';
import fs from 'fs';

const utils = {
    readFile: function (path, name) {
        let allData = [];
        let currData = {};
        let errData = [];
        let currAllData = {};
        let Longduration = [];
        let waitingDuration = [];
        let connectingDuration = [];
        let errorcheck = [];
        let getApiData = [];
        let fRead = fs.createReadStream(path);
        let objReadline = readline.createInterface({
            input: fRead
        });
        objReadline.on('line', function (line) {
            currAllData = JSON.parse(line);
            currData = currAllData.data;
            if (currAllData.metric === 'http_req_duration') {
                for (let key in currAllData.data) {
                    if (key === 'value') {
                        if (currAllData.data[key] > '66') {
                            Longduration.push(line);
                        }
                    }
                }
            }
            if (currAllData.metric === 'http_req_waiting') {
                for (let key in currAllData.data) {
                    if (key === 'value') {
                        if (currAllData.data[key] > '66') {
                            waitingDuration.push(line);
                        }
                    }
                }
            }
            if (currAllData.metric === 'http_req_connecting') {
                for (let key in currAllData.data) {
                    if (key === 'value') {
                        if (currAllData.data[key] > '66') {
                            connectingDuration.push(line);
                        }
                    }
                }
            }
            if (currAllData.metric === 'http_req_connecting') {
                for (let key in currAllData.data) {
                    if (key === 'value') {
                        if (currAllData.data[key] > '66') {
                            connectingDuration.push(line);
                        }
                    }
                }
            }
            if (currAllData.metric === 'checks') {
                for (let key in currAllData.data) {
                    if (key === 'value') {
                        if (currAllData.data[key] !== '1') {
                            errorcheck.push(line);
                        }
                    }
                }
            }
            for (let key in currData) {
                if (key === 'tags') {
                    if (!currData[key] && typeof (currData[key]) !== 'undefined' && currData[key] !== 0) return;
                    if (!currData[key].status) return;
                    if (currData[key].status !== '200') {
                        errData.push(line);
                    }
                    if (currData[key].method === 'GET') {
                        getApiData.push(line);
                    }
                }
            }
            allData.push(JSON.parse(line));
        });
        objReadline.on('close', function () {
            fs.writeFileSync(`abnormalData\\errData.json`, JSON.stringify(allData));
            fs.writeFileSync(`abnormalData\\${name}-errData.json`, JSON.stringify(errData));
            fs.writeFileSync(`abnormalData\\${name}-Longduration.json`, JSON.stringify(Longduration));
            fs.writeFileSync(`abnormalData\\${name}-waitingDuration.json`, JSON.stringify(waitingDuration));
            fs.writeFileSync(`abnormalData\\${name}-connectingDuration.json`, JSON.stringify(connectingDuration));
            fs.writeFileSync(`abnormalData\\${name}-errorcheck.json`, JSON.stringify(errorcheck));
            fs.writeFileSync(`abnormalData\\${name}-getApiData.json`, JSON.stringify(getApiData));
        });
    }
};

export default utils;
