/* eslint-disable @typescript-eslint/no-explicit-any */
import {Box} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Dog, DogBreed} from '../../model/Dog';

function CalculateTotal(breed: DogBreed) {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const fetchDogs = () => {
        axios
            .get('http://localhost:3001/api/dogs')
            .then((response) => {
                const dogs = response.data.map((dog: any) => ({
                    id: dog.id,
                    name: dog.name,
                    breed: dog.breed,
                    description: dog.description,
                    imageUrl: dog.imageUrl,
                    age: dog.age,
                    owner: dog.owner,
                }));
                setDogs(dogs);
            })
            .catch((error) => {
                console.error('Error fetching dogs:', error);
            });
    };
    useEffect(() => {
        fetchDogs();
    }, []);
    const total = dogs.reduce((acc, curr) => {
        if (curr.breed === breed) {
            return acc + 1;
        }
        return acc;
    }, 0);
    return total;
}

const DogPieChart = () => {
    return (
        <Box flexGrow={1}>
            <PieChart
                colors={[
                    'red',
                    'blue',
                    'purple',
                    'orange',
                    'green',
                    'yellow',
                    'brown',
                    'pink',
                    'gray',
                    'lime',
                    'navy',
                ]}
                series={[
                    {
                        data: [
                            {
                                id: 0,
                                value: CalculateTotal(DogBreed.BEAGLE) ?? 0,
                                label: 'BEAGLE',
                            },
                            {
                                id: 1,
                                value: CalculateTotal(DogBreed.BERNESE) ?? 0,
                                label: 'BERNESE',
                            },
                            {
                                id: 2,
                                value: CalculateTotal(DogBreed.BICHON) ?? 0,
                                label: 'BICHON',
                            },
                            {
                                id: 3,
                                value: CalculateTotal(DogBreed.CHIHUAHUA) ?? 0,
                                label: 'CHIHUAHUA',
                            },
                            {
                                id: 4,
                                value: CalculateTotal(DogBreed.CHOWCHOW) ?? 0,
                                label: 'CHOWCHOW',
                            },
                            {
                                id: 5,
                                value: CalculateTotal(DogBreed.DALMATIAN) ?? 0,
                                label: 'DALMATIAN',
                            },
                            {
                                id: 6,
                                value:
                                    CalculateTotal(DogBreed.GERMAN_SHEPHERD) ??
                                    0,
                                label: 'GERMAN SHEPHERD',
                            },
                            {
                                id: 7,
                                value:
                                    CalculateTotal(DogBreed.GOLDEN_RETRIEVER) ??
                                    0,
                                label: 'GOLDEN RETRIEVER',
                            },
                            {
                                id: 8,
                                value: CalculateTotal(DogBreed.HUSKY) ?? 0,
                                label: 'HUSKY',
                            },
                            {
                                id: 9,
                                value: CalculateTotal(DogBreed.LABRADOR) ?? 0,
                                label: 'LABRADOR',
                            },
                            {
                                id: 10,
                                value: CalculateTotal(DogBreed.PITBULL) ?? 0,
                                label: 'PITBUL',
                            },
                        ],
                    },
                ]}
                width={400}
                height={400}
            />
        </Box>
    );
};

export default DogPieChart;
