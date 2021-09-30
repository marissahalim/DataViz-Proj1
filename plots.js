//for deaths and attacks
const CSV = "/data/choleraDeaths.tsv";

//read in a csv/tsv file
function plotFromCSV() {
    Plotly.d3.tsv(CSV, function (err, rows) {
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
                color: "#F58518",
                width: 3
            }
        },
        {
            x: x,
            y: y2,
            name: "Deaths",
            line: {
                color: "#0061CB",
                width: 3,
                // dash: "dash"
            }
        },
        {
            x: x,
            y: cumalativeAttacks,
            name: "Cumalative Attacks",
            line: {
                color: "#E45756",
                width: 3,
                // dash: "dash"
            }
        },
        {
            x: x,
            y: cumalativeDeaths,
            name: "Cumalative Deaths",
            line: {
                color: "#72B7B2",
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

plotFromCSV();

//for death and pump locations

const deathLoc = "/data/choleraDeathLocations.csv";
const pumpLoc = "/data/choleraPumpLocations.csv";
d3.csv(
    deathLoc,
    function (err, rows) {
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
                    color: 'rgb(226, 10, 15)',
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
