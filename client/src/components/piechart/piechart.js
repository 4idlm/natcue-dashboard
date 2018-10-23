import React from 'react'
import { Pie } from 'react-chartjs-2'

const Piechart = (props) => {

    let pieChartData = {
        datasets: [{
            data: props.data,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#c31aff',
                '#ff653e',
                '#00cc99'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#c31aff',
                '#ff653e',
                '#00cc99'
            ]
        }],

        labels: props.labels
    };

    const legend = {
        display: true,
        position: 'right',
        fullWidth: true,
        reverse: false,
        labels: {
            fontColor: 'rgba(0, 0, 0, 0.65)'
        }
    }

    return (
        <div>
            <Pie
                data={pieChartData}
                width={360}
                height={360}
                legend={legend}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}

export default Piechart 