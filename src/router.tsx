/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {Suspense, lazy, useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import {Dog} from './model/Dog';
const AppRouter = () => {
    const Overview = lazy(() => import('./components/Overview'));
    const Detail = lazy(() => import('./components/Detail'));
    const Chart = lazy(() => import('./components/Chart'));

    const [dogs, setDogs] = useState<Dog[]>([]);
    const fetchDogs = () => {
        axios
            .get('http://localhost:3001/api/dogs')
            .then((response) => {
                const dogs = response.data.map(
                    (dog: any) =>
                        new Dog(
                            dog.id,
                            dog.name,
                            dog.breed,
                            dog.description,
                            dog.imageUrl,
                            dog.age,
                            dog.owner,
                        ),
                );
                setDogs(dogs);
            })
            .catch((error) => {
                console.error('Error fetching dogs:', error);
            });
    };
    useEffect(() => {
        fetchDogs();
    }, []);
    useEffect(() => {
        console.log(dogs);
    }, [dogs]);
    return (
        <BrowserRouter>
            <Suspense fallback={<></>}>
                <Routes>
                    {/* Default route  */}
                    <Route path='/' element={<Navigate replace to='/dogs' />} />

                    {/* Routes for different paths */}
                    <Route
                        element={
                            <Layout>
                                <Overview />
                            </Layout>
                        }
                        path={'/dogs'}
                    />
                    <Route element={<Detail />} path={'/dogs/:id'} />
                    <Route element={<Chart />} path={'/dogs/stats'} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRouter;
