import Chart from 'chart.js/auto';
import React, {useEffect, useRef} from 'react';
import {DogList} from '../service/DogApi';

const DogChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            // Count occurrences of each dog breed
            const breedCounts = DogList.reduce((counts, dog) => {
                counts[dog.breed] = (counts[dog.breed] || 0) + 1;
                return counts;
            }, {});

            // Prepare data for the chart
            const breedLabels = Object.keys(breedCounts);
            const breedData = breedLabels.map((breed) => breedCounts[breed]);

            // Create a bar chart
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: breedLabels,
                        datasets: [
                            {
                                label: 'Dog Breeds',
                                data: breedData,
                                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }
    }, []);

    return (
        <div style={{width: '400px', margin: '20px auto'}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default DogChart;
