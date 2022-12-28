$(function () {
    $('#pricing-slider').highcharts({
        chart: {
            type: 'column',
            zoomType: 'x'
        },
        colors: [
            '#fafafa'
        ],
        legend: {
            enabled: false
        },
        title: {
            style: {
                fontSize: '0px'
            }
        },
        subtitle: {
            style: {
                fontSize: '0px'
            }
        },
        xAxis: {
            // NOTE: There is an interesting bug here where not all labels will be shown when the chart is redrawn.
            // I'm not certain why this is occuring, and I've tried different methods to no avail. I'll check with Highcharts.


            data: [36, 40, 45, 60, 80,],
            tickmarkPlacement: 'off',
            tickInterval: 15,
            minRange: 36,// set this to allow up to one year to be viewed
            maxRange: 236// set this to allow up to one year to be viewed
        },
        yAxis: {

            title: {
                text: 'Number',
                style: {
                    fontSize: '0px'
                }
            }
        },
        tooltip: {
            shared: false,
            useHTML: false
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{

            data: [36, 40, 45, 60, 80,],
        }]
    }, function (chart) {

        $("#slider-range").slider({
            range: true,
            min: 36,
            max: 80,
            values: [36, 80],
            slide: function (event, ui) {
                $("#amount").val(ui.values[0] + " - " + ui.values[1]);
                chart.xAxis[0].setExtremes(ui.values[0] - 36, ui.values[1] - 36)
            }
        });
        $("#amount").val($("#slider-range").slider("values", 0) +
            " - " + $("#slider-range").slider("values", 1));

    });

});
