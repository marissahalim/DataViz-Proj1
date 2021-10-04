//for deaths and attacks
const CSV = "/data/choleraDeaths.tsv";

//table
d3.tsv(CSV, function (err, rows) {

    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    var headerNames = d3.keys(rows[0]);

    var headerValues = [];
    var cellValues = [];
    for (i = 0; i < headerNames.length; i++) {
        headerValue = [headerNames[i]];
        headerValues[i] = headerValue;
        cellValue = unpack(rows, headerNames[i]);
        cellValues[i] = cellValue;
    }

    // clean date
    for (i = 0; i < cellValues[1].length; i++) {
        var dateValue = cellValues[1][i].split(' ')[0]
        cellValues[1][i] = dateValue
    }


    var data = [{
        type: 'table',
        columnwidth: [500, 500, 500],
        columnorder: [0, 1, 2],
        header: {
            values: headerValues,
            align: "center",
            line: { width: 1, color: 'rgb(50, 50, 50)' },
            fill: { color: ['rgb(255, 255, 255)'] },
            font: { family: "Roboto, sans-serif", size: 14, color: ["black"] }
        },
        cells: {
            values: cellValues,
            align: ["center", "right"],
            line: { color: "black", width: 1 },
            font: { family: "Roboto, sans-serif", size: 12, color: ["black"] }
        }
    }]

    var layout = {
        title: "Cholera Deaths and Attacks in the UK in 1854",
        font: { family: "Roboto, sans-serif", size: 18, color: ["black"] }
    }

    Plotly.newPlot('deathsAndAttacksTable', data, layout);
});

//read in a csv/tsv file
function plotFromCSV(file) {
    Plotly.d3.tsv(file, function (err, rows) {
        console.log(rows);
        processData(rows);
    });
}

//creates arrays of variables from csv/tsv files
function processData(allRows) {
    let x = [];
    let y1 = [];
    let y2 = [];
    let row;

    let i = 0;
    while (i < allRows.length) {
        row = allRows[i];
        x.push(row["Date"]);
        y1.push(row["Attack"]);
        y2.push(row["Death"]);
        i += 1;
    }

    let cumalativeAttacks = [];
    let beginA = parseInt(y1[0], 10);
    cumalativeAttacks.push(beginA);
    for (let i = 1; i < y1.length; i++) {
        cumalativeAttacks.push(parseInt(y1[i], 10) + parseInt(cumalativeAttacks[i - 1], 10));
    }

    //console.log("Cumalative Attacks", cumalativeAttacks);

    let cumalativeDeaths = [];
    let beginD = parseInt(y2[0], 10);
    cumalativeDeaths.push(beginD);
    for (let i = 1; i < y2.length; i++) {
        cumalativeDeaths.push(parseInt(y2[i], 10) + parseInt(cumalativeDeaths[i - 1], 10));
    }

    //console.log("Cumalative Deaths", cumalativeDeaths);

    makePlotly(x, y1, y2, cumalativeAttacks, cumalativeDeaths);
}

function makePlotly(x, y1, y2, cumalativeAttacks, cumalativeDeaths) {
    let traces = [
        {
            x: x,
            y: y1,
            name: "Attacks",
            line: {
                color: "#878686",
                width: 3
            }
        },
        {
            x: x,
            y: cumalativeAttacks,
            name: "Cumalative Attacks",
            line: {
                color: "#403f3f",
                width: 3,
                // dash: "dash"
            }
        },
        {
            x: x,
            y: y2,
            name: "Deaths",
            line: {
                color: "rgb(242, 24, 29)",
                width: 3,
                // dash: "dash"
            }
        },
        {
            x: x,
            y: cumalativeDeaths,
            name: "Cumalative Deaths",
            line: {
                color: "rgb(112, 8, 10)",
                width: 3,
                // dash: "dash"
            }
        }
    ];

    let layout = {
        title: {
            text: 'Cholera Deaths and Attacks in the UK in 1854',
            font: {
                family: 'Roboto, sans-serif',
                size: 24
            },
            xref: 'paper',
            x: 0.55
        },
        xaxis: {
            title: {
                text: 'Dates',
                font: {
                    family: 'Roboto, sans-serif',
                    size: 14,
                    color: '#7f7f7f'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Attacks/Deaths',
                font: {
                    family: 'Roboto, sans-serif',
                    size: 14,
                    color: '#7f7f7f'
                }
            }
        },
        height: 525
    };


    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("deathsAndAttacks", traces, layout, config);
}

plotFromCSV(CSV);

//Cholera Death and Pump Location
const deathLoc = "/data/choleraDeathLocations.csv";
const pumpLoc = "/data/choleraPumpLocations.csv";

//Cholera Death Location Table
d3.csv(deathLoc, function (err, rows) {

    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    var headerNames = d3.keys(rows[0]);

    var headerValues = [];
    var cellValues = [];
    for (i = 0; i < headerNames.length; i++) {
        headerValue = [headerNames[i]];
        headerValues[i] = headerValue;
        cellValue = unpack(rows, headerNames[i]);
        cellValues[i] = cellValue;
    }

    // clean date
    for (i = 0; i < cellValues[1].length; i++) {
        var dateValue = cellValues[1][i].split(' ')[0]
        cellValues[1][i] = dateValue
    }


    var data = [{
        type: 'table',
        columnwidth: [500, 500, 500],
        columnorder: [0, 1, 2],
        header: {
            values: headerValues,
            align: "center",
            line: { width: 1, color: 'rgb(50, 50, 50)' },
            fill: { color: ['rgb(255, 255, 255)'] },
            font: { family: "Roboto, sans-serif", size: 14, color: ["black"] }
        },
        cells: {
            values: cellValues,
            align: ["center", "right"],
            line: { color: "black", width: 1 },
            font: { family: "Roboto, sans-serif", size: 12, color: ["black"] }
        }
    }]

    var layout = {
        title: "Number of Cholera Deaths and the Locations in the UK"
    }

    Plotly.newPlot('deathLocationTable', data, layout);
});

//for death and pump locations

d3.csv(deathLoc, function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    var data = [
        {
            name: 'Deaths',
            type: "scattermapbox",
            deaths: unpack(rows, "Deaths"),
            lon: unpack(rows, "Longitude"),
            lat: unpack(rows, "Latitude"),
            marker: {
                color: 'rgb(242, 24, 29)',
                size: unpack(rows, "Deaths"),
                sizemode: 'area',
                sizeref: 0.05
            },
            showlegend: true
        }
    ];

    var layout = {
        title: {
            text: 'Locations of Cholera Deaths and Frequency',
            font: {
                family: 'Roboto, sans-serif',
                size: 24
            },
            xref: 'paper',
            x: 0.55
        },
        dragmode: "zoom",
        mapbox: {
            style: "dark",
            center: { lat: 51.51388, lon: -0.1359 },
            pitch: 0,
            zoom: 15
        },
        autosize: true,
        height: 600
    };

        Plotly.newPlot('deathAndPumpLocations', data, layout, { mapboxAccessToken: 'pk.eyJ1IjoiY2hyaWRkeXAiLCJhIjoiY2lxMnVvdm5iMDA4dnhsbTQ5aHJzcGs0MyJ9.X9o_rzNLNesDxdra4neC_A' });
    });
    //Plotly.newPlot('deathAndPumpLocations', data, layout, { mapboxAccessToken: 'pk.eyJ1IjoiY2hyaWRkeXAiLCJhIjoiY2lxMnVvdm5iMDA4dnhsbTQ5aHJzcGs0MyJ9.X9o_rzNLNesDxdra4neC_A' });

//UK Census
const ukCens = "/data/UKcensus1851.csv";

//table
d3.csv(ukCens, function (err, rows) {

    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    var headerNames = d3.keys(rows[0]);

    var headerValues = [];
    var cellValues = [];
    for (i = 0; i < headerNames.length; i++) {
        headerValue = [headerNames[i]];
        headerValues[i] = headerValue;
        cellValue = unpack(rows, headerNames[i]);
        cellValues[i] = cellValue;
    }

    // clean date
    for (i = 0; i < cellValues[1].length; i++) {
        var dateValue = cellValues[1][i].split(' ')[0]
        cellValues[1][i] = dateValue
    }


    var data = [{
        type: 'table',
        columnwidth: [500, 500, 500],
        columnorder: [0, 1, 2],
        header: {
            values: headerValues,
            align: "center",
            line: { width: 1, color: 'rgb(50, 50, 50)' },
            fill: { color: ['rgb(255, 255, 255)'] },
            font: { family: "Roboto, sans-serif", size: 14, color: ["black"] }
        },
        cells: {
            values: cellValues,
            align: ["center", "right"],
            line: { color: "black", width: 1 },
            font: { family: "Roboto, sans-serif", size: 12, color: ["black"] }
        }
    }]

    var layout = {
        title: "The UK Census in 1851 based on Age Groups",
        font: { family: "Roboto, sans-serif", size: 18, color: ["black"] }
    }

    Plotly.newPlot('ukCensusTable', data, layout);
});

