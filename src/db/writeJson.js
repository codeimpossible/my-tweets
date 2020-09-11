const fs = require('fs');

module.exports = async function(filePath, data) {
    return new Promise(function(resolve, reject) {
        let json = JSON.stringify(data, null, 2);
        fs.writeFile(filePath, json, (err) => {
            if (err) return reject(err);
            resolve(json);
        });
    });
};