import { Route, Routes } from "react-router-dom";
import { publicPath,privatePath } from "./pathname";
import PrivateRoutes from "../components/PrivateRoutes ";
import ScrollTop from "../components/ScrollTop";
import LazyLoading from "./lazyLoading";

function AppRouter() {
    return (
        <ScrollTop>
            <Routes>
                {publicPath.map((item,index)=>{
                    const Layout = item.Element
                    console.log(item.path)
                    return (
                        <Route key={index} path={item.pathname}  element={<LazyLoading><Layout/></LazyLoading>  }></Route>
                    )
                })}
                {privatePath.map((item,index)=>{
                    const Layout = item.Element
                    return (
                        <Route key={index} element={<PrivateRoutes/>}>
                            <Route key={index} path={item.pathname} element={<LazyLoading><Layout/></LazyLoading>}></Route>
                        </Route>
                    )
                })}
            </Routes>
        </ScrollTop>
    );
}

export default AppRouter;