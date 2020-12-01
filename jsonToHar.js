import fs from 'fs';
import _ from 'lodash';
fs.readFile('aaa.har', 'utf8', function (err, data) {
    if (err) throw err;
    var jsonData = JSON.parse(data);
    var array = JSON.parse(JSON.stringify(jsonData.log.entries));
    var array2 = _.filter(array, function (item) {
        var isTrue = item.request.url.indexOf('.js') > -1 || item.request.url.indexOf('.html') > -1 ||
        item.request.url.indexOf('.png') > -1 || item.request.url.indexOf('.svg') > -1 || item.request.url.indexOf('.woff2') > -1 ||
        item.request.url.indexOf('.css') > -1 || item.request.url.indexOf('.ico') > -1;
        return !isTrue;
    });
    jsonData.log.entries = array2;
    fs.writeFile('ttt.har', JSON.stringify(jsonData), function (err, data) {
        if (err) throw err;
    });
});
