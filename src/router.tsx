import {Suspense, lazy} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
const AppRouter = () => {
    const Overview = lazy(() => import('./components/Overview'));
    const Detail = lazy(() => import('./components/Detail'));
    const Chart = lazy(() => import('./components/Chart'));
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
                    <Route element={<Chart />} path={'/stats'} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRouter;
