import React from 'react';
import ReactApexChart from 'react-apexcharts';


export default function Chart4({ male, female }) {
    const series = [male, female];
    const options = {
        chart: {
            background: '#F3F4FA',
            type: 'pie',
        },
        labels: ["남자", "여자"],
        colors: ['#9dbbd9', '#46b3a9'],
        legend: {
            position: 'bottom',
            fontSize: '30px',
            fontWeight: 500,
        },
        dataLabels: {
            enabled: true,
            formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                return [w.config.labels[seriesIndex], value + '%']
            },
            style: {
                fontSize: '33px',
                fontWeight: 'bold',
                colors: undefined,
            },
            background: {
                enabled: true,
                foreColor: '#fff',
                padding: 4,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#fff',
                opacity: 0.9,
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                }
            },
        },
    };
    return (
        <div className='shadow' style={{ margin: '10px 10px 10px 0px', width: '100%', height: "100%" }}>
            <ReactApexChart options={options} series={series} type="pie" width="100%" height='100%' />
        </div >
    )
}