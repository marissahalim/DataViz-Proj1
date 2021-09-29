const CSV = "/data/choleraDeaths.tsv";

function plotFromCSV() {
    Plotly.d3.tsv(CSV, function (err, rows) {
        console.log(rows);
        processData(rows);
    });
}

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
        cumalativeAttacks.push(parseInt(y1[i], 10) + parseInt(cumalativeAttacks[i-1], 10));
    }

    console.log("Cumalative Attacks", cumalativeAttacks);

    let cumalativeDeaths = [];
    let beginD = parseInt(y2[0], 10);
    cumalativeDeaths.push(beginD);
    for (let i = 1; i < y2.length; i++) {
        cumalativeDeaths.push(parseInt(y2[i], 10) + parseInt(cumalativeDeaths[i-1], 10));
    }

    console.log("Cumalative Deaths", cumalativeDeaths);

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
/*
    let layout = {
        title: "Cholera Deaths and Attacks in the UK in 1854",
        yaxis: {
            range: [0, Math.max(cumalativeDeaths)]
        },
        xaxis: {
            // tickformat: "%d/%m/%y"
        },
    };
*/

let layout = {
    title: {
      text:'Cholera Deaths and Attacks in the UK in 1854',
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
    }
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

/*d3.tsv("/data/naplesCholeraAgeSexData.tsv", function (d) {
    console.log(d);
});
*/