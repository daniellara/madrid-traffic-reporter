# Madrid Traffic Reporter
Application that generates excel reports with the information about the traffic in Madrid using Madrid Open Data info.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites
You only need NodeJS and NPM in order to use Madrid Traffic Reporter. For install them check the following link:
https://nodejs.org/en/

NOTE: This software was tested using node 6.10.3 and npm 3.10.10.

### Installing
Installing Madrid Traffic Reporter is simple and easy, just follow these steps:

1. Clone this repo wherever you want in your computer:
```
git clone https://github.com/daniellara/madrid-traffic-reporter.git
```

2. Go to the cloned directory and execute:
```
npm install
```

This is all what you need to install Madrid Traffic Reporter in your computer.

### Usage
Madrid Traffic Reporter runs using a shell (in future versions i will try to give a GUI to facilitate the use).

First of all you need to create a JSON file inside the measurement-points folder where you specify the points that you want to include in the report. The JSON file must have the following structure:
```json
{
  "nombre de la zona": [
    {
      "codigo": 24001,
      "descripcion": "SEPÚLVEDA ENTRADA CRUCE N-S",
      "activo": true
    },
    {
      "codigo": 24002,
      "descripcion": "C.FCO.J.JIMENEZ ENTRE BERLANAS-SEPULVEDA E-O",
      "activo": true
    },
    .
    .
    .
  ]
}
```
"nombre de la zona": it will be used to name the excel file.
"codigo": the code of the measurement point. It must match the same code that Madrid Open Data uses.
"descripcion": simple description of the point. Madrid Traffic Reporter does not use it to fill any information, it just serves for indicate where is the measurement point.
"activo": if you want to take some measures skipping one point but without delete it from the file, you can mark these field as false.

Madrid Traffic Reporter can run in two modes:
  1. **Simple**: in this mode, it runs once and generates only one report.
  2. **Continue** it runs every X minutes, generating one report per time.

All the reports generated in the two modes are stored in the output folder.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
