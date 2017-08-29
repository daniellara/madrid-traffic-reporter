const
  fs = require('fs'),
  path = require('path')

function getMeasurementPoints(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join('measurement-points', file), function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
};

module.exports = {
  getMeasurementPoints
}
