import { Route, Routes } from 'react-router-dom';
import { publicPath, privatePath, instructorPath, adminPath } from './customPage';
import PrivateRoutes from '../components/PrivateRoutes ';
import ScrollTop from '../components/ScrollTop';
import LazyLoading from './lazyLoading';
import Layout from '~/components/Layout';
import { ToastContainer } from 'react-toastify';
import ManagerRoutes from '~/components/ManagerRoutes';
import AdminRoutes from '~/components/AdminRoutes';

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
                            />
                        </Route>
                    ) : (
                        <Route key={index} element={<PrivateRoutes />}>
                            <Route
                                path={item.pathname}
                                element={
                                    <Layout>
                                        <LazyLoading>
                                            <Item />
                                        </LazyLoading>
                                    </Layout>
                                }
                            ></Route>
                        </Route>
                    );
                })}
                {instructorPath.map((item, index) => {
                    const Item = item.Element;
                    return item?.noLayout ? (
                        <Route key={index} element={<ManagerRoutes />}>
                            <Route
                                key={index}
                                path={item.pathname}
                                element={
                                    <LazyLoading>
                                        <Item />
                                    </LazyLoading>
                                }
                            />
                        </Route>
                    ) : (
                        <Route key={index} element={<ManagerRoutes />}>
                            <Route
                                path={item.pathname}
                                element={
                                    <Layout>
                                        <LazyLoading>
                                            <Item />
                                        </LazyLoading>
                                    </Layout>
                                }
                            ></Route>
                        </Route>
                    );
                })}
                {adminPath.map((item, index) => {
                    const Item = item.Element;
                    return item?.noLayout ? (
                        <Route key={index} element={<AdminRoutes />}>
                            <Route
                                key={index}
                                path={item.pathname}
                                element={
                                    <LazyLoading>
                                        <Item />
                                    </LazyLoading>
                                }
                            />
                        </Route>
                    ) : (
                        <Route key={index} element={<AdminRoutes />}>
                            <Route
                                path={item.pathname}
                                element={
                                    <Layout>
                                        <LazyLoading>
                                            <Item />
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
