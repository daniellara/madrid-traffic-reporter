const
  xlsx = require('xlsx-populate'),
  argv = require('yargs').argv,
  dataFiller = require('./data-filler'),
  utils = require('./utils'),
  moment = require('moment');

function run () {
  let
    wb,
    sheet;

  xlsx.fromBlankAsync().then(workbook => {
    wb = workbook;
    sheet = workbook.sheet('Sheet1');
    return utils.getMeasurementPoints(argv._[0]);
  }).then((data) => {
    return dataFiller.fillSheet(sheet, JSON.parse(data));
  }).then((fileName) => {
    wb.toFileAsync(fileName);
  });
};

switch (argv._[1]) {
  case 'simple':
    run();
    break;
  case 'continue':
    const interval = argv._[2] * 60 * 1000;
    console.log(`Generating traffic report for ${moment().format()}...`);
    run();
    setInterval(function() {
      console.log(`Generating traffic report for ${moment().format()}...`);
      run();
    }, interval);
    break;
  default:
    console.log();
};
