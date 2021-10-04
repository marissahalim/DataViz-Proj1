//Deaths and attacks
const CSV = "/data/choleraDeaths.tsv";

//Cholera death and attack table
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
        //console.log(rows);
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

//UK Census Table
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
        title: "The UK Census in 1851 divided by Age Groups",
        font: { family: "Roboto, sans-serif", size: 18, color: ["black"] }
    }

    Plotly.newPlot('ukCensusTable', data, layout);
});

//UK Census Bar Chart
d3.csv(ukCens, function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    let data = [
        {
            name: 'Male Population',
            type: "bar",
            marker: {
                color: 'rgb(169, 224, 182)'
            },
            x: unpack(rows, "age"),
            y: unpack(rows, "male"),
            showlegend: true
        },
        {
            name: 'Female Population',
            type: "bar",
            marker: {
                color: 'rgb(211, 169, 240)'
            },
            x: unpack(rows, "age"),
            y: unpack(rows, "female"),
            showlegend: true
        }
    ];

    let layout = {
        title: {
            text: 'UK Census based on Age Groups (Male vs Female)',
            font: {
                family: 'Roboto, sans-serif',
                size: 24
            },
            xref: 'paper',
            x: 0.55
        },
        xaxis: {
            title: {
                text: 'Age Groups',
                font: {
                    family: 'Roboto, sans-serif',
                    size: 14,
                    color: '#7f7f7f'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Population',
                font: {
                    family: 'Roboto, sans-serif',
                    size: 14,
                    color: '#7f7f7f'
                }
            }
        },
        height: 525
    };

    Plotly.newPlot('ukCensusBar', data, layout);
});


//UK Census Pie Chart      ukCensusPie
/*d3.csv(ukCens, function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }
/*
    let allLabels = unpack(rows, "age");

    let allValues = [
        unpack(rows, "male"),
        unpack(rows, "female")
    ];
*//*
    let data = [{
        values: unpack(rows, "male"),
        labels: unpack(rows, "age"),
        type: 'pie',
        marker: {
            colors: ['rgb(215, 247, 223)', 'rgb(199, 237, 209)', 'rgb(177, 222, 189)', 'rgb(169, 224, 182)', 'rgb(152, 212, 166)', 'rgb(126, 191, 141)', 'rgb(98, 163, 113)', 'rgb(69, 125, 82)', 'rgb(34, 66, 41)']
        },
    }];
    /*var ultimateColors = [
        ['rgb(215, 247, 223)', 'rgb(199, 237, 209)', 'rgb(177, 222, 189)', 'rgb(169, 224, 182)', 'rgb(152, 212, 166)', 'rgb(126, 191, 141)', 'rgb(98, 163, 113)', 'rgb(69, 125, 82)', 'rgb(34, 66, 41)'],
        ['rgb(236, 212, 252)', 'rgb(221, 186, 245)', 'rgb(211, 169, 240)', 'rgb(193, 143, 227)', 'rgb(177, 130, 209)', 'rgb(163, 114, 196)', 'rgb(135, 90, 166)', 'rgb(95, 59, 120)', 'rgb(58, 34, 74)'],
    ];*/

    //Plotly.newPlot('ukCensusPie', data, layout);
//});

//overall UK census for male vs female pie chart
let data = [{
    values: [8186432, 8552261],
    labels: ['Overall Male Population', 'Overall Female Population'],
    type: 'pie',
    marker: {
        colors: ['rgb(169, 224, 182)', 'rgb(211, 169, 240)']
    },
}];

let layout = {
    title: {
        text: 'Percentage of Overall Cholera Deaths in the UK (Based on Sex)',
        font: {
            family: 'Roboto, sans-serif',
            size: 24
        }
    },
    legend: {
        x: 0.73,
        y: 0.5
    },
    height: 550
};

Plotly.newPlot('ukCensusOverallPie', data, layout);

//Naples 
const napDeaths = 'data/naplesCholeraAgeSexData.tsv';

//table
d3.tsv(napDeaths, function (err, rows) {

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
        title: "Cholera Fatalities in Naples divided by Age Groups",
        font: { family: "Roboto, sans-serif", size: 18, color: ["black"] }
    }

    Plotly.newPlot('naplesDeathTable', data, layout);
});

//Naples Bar Chart
d3.tsv(napDeaths, function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    let data = [
        {
            name: 'Male Deaths',
            type: "bar",
            marker: {
                color: 'rgb(97, 148, 110)'
            },
            x: unpack(rows, "Age Groups"),
            y: unpack(rows, "Male"),
            showlegend: true
        },
        {
            name: 'Female Deaths',
            type: "bar",
            marker: {
                color: 'rgb(144, 105, 171)'
            },
            x: unpack(rows, "Age Groups"),
            y: unpack(rows, "Female"),
            showlegend: true
        }
    ];

    let layout = {
        title: {
            text: 'Cholera Fatalities in Naples based on Age Groups (Male vs Female)',
            font: {
                family: 'Roboto, sans-serif',
                size: 24
            },
            xref: 'paper',
            x: 0.55
        },
        xaxis: {
            title: {
                text: 'Age Groups',
                font: {
                    family: 'Roboto, sans-serif',
                    size: 14,
                    color: '#7f7f7f'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Fatalities (in the 10,000s)',
                font: {
                    family: 'Roboto, sans-serif',
                    size: 14,
                    color: '#7f7f7f'
                }
            }
        },
        height: 525
    };

    Plotly.newPlot('naplesDeathBar', data, layout);
});



function convertTSVUK(file) {
    d3.csv(file, function (err, rows) {
        console.log(rows);
        pushToArray(rows);
    });
}

function pushToArray(allrows) {
    let age = [];
    let maleD = [];
    let femaleD = [];
    let row;

    let i = 0;
    while (i < allrows.length) {
        row = allrows[i];
        age.push(row["Age Groups"]);
        maleD.push(row["Male"]);
        femaleD.push(row["Female"]);
        i += 1;
    }
}

convertTSVUK(ukCens);