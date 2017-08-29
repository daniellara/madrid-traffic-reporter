const
  moment = require('moment'),
  request = require('request'),
  parseString = require('xml2js').parseString,
  path = require('path');

function fillSheet (sheet, data) {
  _createSheetStructure(sheet, data);
  _styleSheet(sheet, data);
  return _fillData(sheet, data);
};

function _createSheetStructure (sheet, data) {
  sheet.cell('B2')
    .value(moment().format('MMMM Do YYYY, h:mm:ss a'))
    .style({border: 'medium', fill: 'bfbfbf'});
  sheet.cell('F2')
    .value(Object.keys(data)[0].toString().toUpperCase())
    .style({border: 'medium', fill: 'bfbfbf'});

  sheet.cell('A5')
    .value('CÓDIGO')
    .style({border: 'medium', fill: 'bfbfbf'});
  sheet.cell('B5')
    .value('DESCRIPCIÓN')
    .style({border: 'medium', fill: 'bfbfbf'});
  sheet.cell('C5')
    .value('INTENSIDAD')
    .style({border: 'medium', fill: 'bfbfbf'});
  sheet.cell('D5')
    .value('OCUPACIÓN')
    .style({border: 'medium', fill: 'bfbfbf'});
  sheet.cell('E5')
    .value('CARGA')
    .style({border: 'medium', fill: 'bfbfbf'});
  sheet.cell('F5')
    .value('NIVEL DE SERVICIO')
    .style({border: 'medium', fill: 'bfbfbf'});
  sheet.cell('G5')
    .value('SATURACIÓN')
    .style({border: 'medium', fill: 'bfbfbf'});
  sheet.cell('H5')
    .value('SUBAREA')
    .style({border: 'medium', fill: 'bfbfbf'});
  sheet.cell('I5')
    .value('ERROR')
    .style({border: 'medium', fill: 'bfbfbf'});
};

function _styleSheet (sheet, data) {
  sheet.row(2).style({horizontalAlignment: 'center', bold: true});
  sheet.row(5).style({horizontalAlignment: 'center', bold: true});

  sheet.column('A').width(10);
  sheet.column('B').width(50);
  sheet.column('C').width(15);
  sheet.column('D').width(15);
  sheet.column('E').width(15);
  sheet.column('F').width(20);
  sheet.column('G').width(15);
  sheet.column('H').width(15);
  sheet.column('I').width(15);

  let name = Object.keys(data)[0];
  for (var i = 6; i < data[name].length + 6; i++) {
    let range = sheet.range(`A${i}:I${i}`);
    if(i % 2 !== 0){
      range.style({fill: 'e6e6e6', border: 'thin', borderColor: 'cccccc'});
    } else {
      range.style({fill: 'ffffff', border: 'thin', borderColor: 'cccccc'});
    }
  }
};

function _fillData(sheet, data) {
  const
    name = Object.keys(data)[0],
    pms = data[name];

  let measuresSelected = [];
  return new Promise(function(resolve, reject) {
    _fetchData().then((value) => {
      let measuresDownloaded = value.pms.pm;
      measuresDownloaded.forEach((item) => {
        pms.forEach((pm) => {
          if (pm.codigo.toString() === item.codigo[0]) {
            measuresSelected.push(item);
          }
        });
      });
      for (var i = 6; i < measuresSelected.length + 6; i++) {
        sheet.cell(`A${i}`)
          .value(measuresSelected[i - 6].codigo[0])
          .style("numberFormat", "0.00");
        sheet.cell(`B${i}`).value(measuresSelected[i - 6].descripcion[0]);
        sheet.cell(`C${i}`)
          .value(measuresSelected[i - 6].accesoAsociado[0])
          .style("numberFormat", "0.00");
        sheet.cell(`D${i}`)
          .value(measuresSelected[i - 6].intensidad[0])
          .style("numberFormat", "0.00");
        sheet.cell(`E${i}`)
          .value(measuresSelected[i - 6].ocupacion[0])
          .style("numberFormat", "0.00");
        sheet.cell(`F${i}`)
          .value(measuresSelected[i - 6].carga[0])
          .style("numberFormat", "0.00");
        sheet.cell(`G${i}`)
          .value(measuresSelected[i - 6].nivelServicio[0])
          .style("numberFormat", "0.00");
        sheet.cell(`H${i}`)
          .value(measuresSelected[i - 6].intensidadSat[0])
          .style("numberFormat", "0.00");
        sheet.cell(`I${i}`).value(measuresSelected[i - 6].error[0]);
      }
      resolve(_generateOutputName(name));
    }).catch((err) => {
      reject(err);
    });
  });
};

function _fetchData() {
  return new Promise(function(resolve, reject) {
    request({
      url: `http://informo.munimadrid.es/informo/tmadrid/pm.xml`,
    }, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        parseString(body, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
};

function _generateOutputName (name) {
  let time = moment().format();
  let timeParsed = time.split(':').join('·');
  return path.join('outputs', `${name}-${timeParsed}.xlsx`);
};

module.exports = {
  fillSheet
}
