import { exec } from 'child_process';
import fs from 'fs';
import utils from './utils.js';

const { readFile } = utils;
const gulpHelper = {
    DIRMAP: () => {
    },
    // TAGMAP: () => {
    // },
    // tagRun: () => {
    // },
    dirRun: function (key, callback) {
        var path = gulpHelper.DIRMAP[key];
        fs.readdir(path, (err, dir) => {
            if (!err) {
                dir.forEach(item => {
                    gulpHelper.run(`${path}${item}`);
                });
            }
        });
        callback();
    },
    run: function (path) {
        exec(`k6 run ${path}`, (err, stdout) => {
            if (!err) {
                console.log(stdout);
            }
        });
    },
    diroutRun: function (key, callback) {
        var path = gulpHelper.DIRMAP[key];
        let name = '';
        fs.readdir(path, (err, dir) => {
            if (!err) {
                dir.forEach((item) => {
                    name = item.substr(0, item.length - 3);
                    gulpHelper.outRun(path, item, name, readFile);
                });
            }
        });
        callback();
    },
    outRun: function (path, item, name, readFile) {
        exec(`k6 run --out json=./output/${name}.json ${path}${item}`, (err, stdout) => {
            if (!err) {
                console.log(stdout);
            }
        });
        setTimeout(() => {
            readFile(`./output/${name}.json`, name);
        }, 3000);
        return true;
    }
};

export default gulpHelper;
