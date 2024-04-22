/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Suspense, lazy} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Dog/LayoutDog';
import LayoutP from './components/Possession/LayoutPossession';
const AppRouter = () => {
    const OverviewDog = lazy(() => import('./components/Dog/OverviewDog'));
    const DetailDog = lazy(() => import('./components/Dog/DetailDog'));
    const Chart = lazy(() => import('./components/Dog/ChartDogbreed'));
    const OverviewPossession = lazy(
        () => import('./components/Possession/OverviewPossession'),
    );
    const DetailPossession = lazy(
        () => import('./components/Possession/DetailPosession'),
    );
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
                                <OverviewDog />
                            </Layout>
                        }
                        path={'/dogs'}
                    />
                    <Route element={<DetailDog />} path={'/dogs/:id'} />
                    <Route element={<Chart />} path={'/dogs/stats'} />
                    <Route
                        element={
                            <LayoutP>
                                <OverviewPossession />
                            </LayoutP>
                        }
                        path={'/possessions'}
                    />
                    <Route
                        element={<DetailPossession />}
                        path={'/possessions/:id'}
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRouter;
