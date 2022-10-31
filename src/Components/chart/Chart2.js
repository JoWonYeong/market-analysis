import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function Chart2({ dong, ageAvg, populationAvg }) {
    var 수성구평균나이 = 42.6; // 나이
    var 수성구평균유동인구 = 222.18;    // 인구

    const series1 = [{
        data: [ageAvg, 수성구평균나이]
    }];

    const series2 = [{
        data: [populationAvg, 수성구평균유동인구]
    }];

    const options1 = {
        chart: {
            background: '#F3F4FA',
            type: 'bar',
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
                barHeight: '100%',
            }
        },
        colors: ['#c2cd36', '#d6d6d6'],
        legend: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        dataLabels: {
            offsetX: 43,
            offsetY: 8,
            formatter: function (val, opts) {
                return val + "세"
            },
            style: {
                fontSize: '1.3em',
                fontWeight: 'bold',
                colors: ['#263238'],
            },
        },
        xaxis: {
            max: 60,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            categories: [`${dong}`, '수성구'],
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#263238',
                    fontSize: '1.3em',
                    fontWeight: 'bold',
                },
            }
        },
        grid: {
            show: false,
        }
    };

    const options2 = {
        chart: {
            background: '#F3F4FA',
            type: 'bar',
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
                barHeight: '100%',
            }
        },
        colors: ['#c2cd36', '#d6d6d6'],
        legend: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        dataLabels: {
            offsetX: 63,
            offsetY: 8,
            formatter: function (val, opts) {
                return val + "명"
            },
            style: {
                fontSize: '1.3em',
                fontWeight: 'bold',
                colors: ['#263238'],
            },
        },
        xaxis: {
            max: 470,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            categories: [`${dong}`, '수성구'],
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#263238',
                    fontSize: '1.3em',
                    fontWeight: 'bold',
                },
            }
        },
        grid: {
            show: false,
        }
    }

    return (
        <>
            <div style={{ height: "50%", margin: '10px 10px 0px 10px', position: 'relative', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                <div style={{ zIndex: '1', fontWeight: 'bold', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '-6px', fontSize: '1.5rem' }}>평균 연령</div>
                <ReactApexChart options={options1} series={series1} type="bar" width="100%" height="100%" />
            </div >
            <div style={{ height: "50%", margin: '0px 10px 10px 10px', position: 'relative', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                <div style={{ zIndex: '1', fontWeight: 'bold', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '-6px', fontSize: '1.5rem' }}>평균 유동인구</div>
                <ReactApexChart options={options2} series={series2} type="bar" width="100%" height="100%" />
            </div >
        </>
    )
}