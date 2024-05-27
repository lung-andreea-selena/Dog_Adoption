/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Suspense, lazy} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Dog/LayoutDog';
import LayoutP from './components/Possession/LayoutPossession';
import SignIn from './components/SignIn/signin';
import SignUp from './components/Register/register';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import UserInfo from './components/User/UserInfo';
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
                    <Route element={<AuthOutlet fallbackPath='/login' />}>
                        <Route
                            path='/'
                            element={<Navigate replace to='/login' />}
                        />
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
                        <Route element={<UserInfo />} path={'user-info'} />
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
                    </Route>
                    <Route path='/login' element={<SignIn />} />
                    <Route path='/register' element={<SignUp />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRouter;
