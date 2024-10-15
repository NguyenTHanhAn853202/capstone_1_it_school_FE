import { Route, Routes } from 'react-router-dom';
import { publicPath, privatePath } from './customPage';
import PrivateRoutes from '../components/PrivateRoutes ';
import ScrollTop from '../components/ScrollTop';
import LazyLoading from './lazyLoading';
import Layout from '~/components/Layout';
import { ToastContainer } from 'react-toastify';

function AppRouter() {
    return (
        <ScrollTop>
            <ToastContainer />
            <Routes>
                {publicPath.map((item, index) => {
                    const Item = item.Element;

                    return item?.noLayout ? (
                        <Route
                            key={index}
                            path={item.pathname}
                            element={
                                <LazyLoading>
                                    <Item />
                                </LazyLoading>
                            }
                        ></Route>
                    ) : (
                        <Route
                            key={index}
                            path={item.pathname}
                            element={
                                <Layout>
                                    <LazyLoading>
                                        <Item />
                                    </LazyLoading>
                                </Layout>
                            }
                        ></Route>
                    );
                })}
                {privatePath.map((item, index) => {
                    const Item = item.Element;
                    return item?.noLayout ? (
                        <Route key={index} element={<PrivateRoutes />}>
                            <Route
                                key={index}
                                path={item.pathname}
                                element={
                                    <LazyLoading>
                                        <Item />
                                    </LazyLoading>
                                }
                            ></Route>
                        </Route>
                    ) : (
                        <Route key={index} element={<PrivateRoutes />}>
                            <Route
                                key={index}
                                path={item.pathname}
                                element={
                                    <Layout>
                                        <LazyLoading>
                                            <Layout />
                                        </LazyLoading>
                                    </Layout>
                                }
                            ></Route>
                        </Route>
                    );
                })}
            </Routes>
        </ScrollTop>
    );
}

export default AppRouter;
