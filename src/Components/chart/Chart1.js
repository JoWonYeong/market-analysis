import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function Chart1({ periodAvg }) {
    var colors = ['#26a0fc', '#26e7a6', '#febc3b', '#ff6178', '#8b75d7'];
    var 수성구평균영업기간 = [3.29, 1.83, 6.90, 1.23, 1.18];

    const series = [{
        data: [
            {
                x: '식육구이점',
                y: periodAvg[0],
                goals: [{
                    name: 'avg',
                    value: 수성구평균영업기간[0],
                    strokeHeight: 4,
                    strokeDashArray: 2,
                    strokeColor: 'red'
                }]
            },
            {
                x: '일식점',
                y: periodAvg[1],
                goals: [{
                    name: 'avg',
                    value: 수성구평균영업기간[1],
                    strokeHeight: 4,
                    strokeDashArray: 2,
                    strokeColor: 'red'
                }]
            },
            {
                x: '중식점',
                y: periodAvg[2],
                goals: [{
                    name: 'avg',
                    value: 수성구평균영업기간[2],
                    strokeHeight: 4,
                    strokeDashArray: 2,
                    strokeColor: 'red'
                }]
            },
            {
                x: '한식점',
                y: periodAvg[3],
                goals: [{
                    name: 'avg',
                    value: 수성구평균영업기간[3],
                    strokeHeight: 4,
                    strokeDashArray: 2,
                    strokeColor: 'red'
                }]
            },
            {
                x: '휴게음식점',
                y: periodAvg[4],
                goals: [{
                    name: 'avg',
                    value: 수성구평균영업기간[4],
                    strokeHeight: 4,
                    strokeDashArray: 2,
                    strokeColor: 'red'
                }]
            }
        ]
    }]
    const options = {
        title: {
            text: '평균영업기간 (년)',
            offsetY: 40,
            align: 'center',
            style: {
                fontSize: '2em',
                fontWeight: 'bold',
                color: '#263238'
            }
        },
        chart: {
            background: '#F3F4FA',
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: '58%',
                distributed: true,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        tooltip: {
            enabled: false,
        },
        colors: colors,
        xaxis: {
            categories: [
                '식육구이점',
                '일식점',
                '중식점',
                '한식점',
                '휴게음식점'
            ],
            labels: {
                offsetY: 6,
                style: {
                    colors: colors,
                    fontSize: '1.5em',
                    fontWeight: 'bold',
                }
            }
        },
        legend: {
            show: false
        },
        dataLabels: {
            offsetY: -12,
            style: {
                fontSize: '1.5em',
                fontWeight: 'bold',
                colors: ['#263238'],
            },
        },
    }

    return (
        <div style={{ margin: '10px 10px 10px 10px', height: "100%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
            <ReactApexChart options={options} series={series} type="bar" width="100%" height="100%" />
        </div>
    )
}