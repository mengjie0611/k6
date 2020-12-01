import { exec } from 'child_process';
import fs from 'fs';
import os from 'os';
import readline from 'readline';
import _ from 'lodash';
const gulpHelper = {
    json2Har: (name, extend, output) => {
        fs.readFile('aaa.har', function (err, data) {
            if (err) throw err;
            var isTrue = true;
            var jsonData = JSON.parse(data);
            var array = JSON.parse(JSON.stringify(jsonData.log.entries));
            var array2 = _.filter(array, function (item) {
                extend.forEach(function (ex) {
                    isTrue = item.request.url.indexOf(ex) > -1;
                    if (!isTrue) {
                        break;
                    }
                });
                // var isTrue = item.request.url.indexOf('.js') > -1 || item.request.url.indexOf('.html') > -1 ||
                // item.request.url.indexOf('.png') > -1 || item.request.url.indexOf('.svg') > -1 || item.request.url.indexOf('.woff2') > -1 ||
                // item.request.url.indexOf('.css') > -1 || item.request.url.indexOf('.ico') > -1;
                return !isTrue;
            });
            jsonData.log.entries = array2;
            fs.writeFile('ttt.har', JSON.stringify(jsonData), function (err, data) {
                if (err) throw err;
            });
        });
    },
    DIRMAP: () => {
    },
    // TAGMAP: () => {
    // },
    // tagRun: () => {
    // },
    dirRun: function (key, options, callback) {
        var path = gulpHelper.DIRMAP[key];
        fs.readdir(path, (err, dir) => {
            if (!err) {
                dir.forEach(item => {
                    gulpHelper.run(`${path}${item}`, options);
                });
            }
        });

        callback();
    },
    run: function (path, options) {
        exec(`k6 run ${options} ${path}`, (err, stdout) => {
            if (!err) {
                console.log(stdout);
            }
        });
    },
    diroutRun: function (key, options, callback) {
        var path = gulpHelper.DIRMAP[key];
        let name = '';
        fs.readdir(path, (err, dir) => {
            if (!err) {
                dir.forEach((item) => {
                    name = item.substr(0, item.length - 3);
                    gulpHelper.outRun(path, item, name, gulpHelper.readFile, options);
                });
            }
        });
        callback();
    },
    outRun: function (path, item, name, readFile, options) {
        console.log(`k6 run ${options} --out json=./output/${name}.json ${path}${item}`);
        exec(`k6 run ${options} --out json=./output/${name}.json ${path}${item}`, (err, stdout) => {
            if (!err) {
                console.log(stdout);
            }
        });
        setTimeout(() => {
            gulpHelper.readWriteFileByLine(`/工作/k6-runner/output/${name}.json`, `/工作/k6-runner/abnormalData/${name}-errData.json`, function (line) {
                let currAllData = JSON.parse(line);
                let temp = null;
                let flag = false;
                if (currAllData.metric === 'checks') {
                    for (let key in currAllData.data) {
                        if (key === 'value') {
                            if (currAllData.data[key] === '0') {
                                temp = line;
                                flag = true;
                            }
                        }
                    }
                }
                if (flag) {
                    flag = false;
                    return temp;
                } else {
                    return '';
                }
            });
            gulpHelper.readWriteFileByLine(`/工作/k6-runner/output/${name}.json`, `/工作/k6-runner/abnormalData/${name}-Longduration.json`, function (line) {
                let currAllData = JSON.parse(line);
                let temp = null;
                let flag = false;
                if (currAllData.metric === 'http_req_duration') {
                    for (let key in currAllData.data) {
                        if (key === 'value') {
                            if (currAllData.data[key] > '100') {
                                temp = line;
                                flag = true;
                            }
                        }
                    }
                }
                if (flag) {
                    flag = false;
                    return temp;
                } else {
                    return '';
                }
            });
        }, 3000);
        return true;
    },
    readWriteFileByLine: function (readName, writeName, callback) {
        var readStream = fs.createReadStream(readName);
        var writeStream = fs.createWriteStream(writeName);
        var readLine = readline.createInterface({
            input: readStream
        });
        readLine.on('line', function (line) {
            var rs = callback(line);
            if (rs !== '') {
                writeStream.write(rs + os.EOL);
            }
        });
    }
};
export default gulpHelper;
