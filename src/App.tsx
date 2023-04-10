import { Refine } from "@refinedev/core";
import { Layout, notificationProvider, ErrorComponent } from "@refinedev/antd";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import {dataProvider} from "./data-provider";
import { CarList } from "pages/allcars";
import { UserList } from "pages/allUsers";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerBindings}
                dataProvider={dataProvider("http://localhost:3021")}
                notificationProvider={notificationProvider}
                resources={[
                    {
                        name: "cars",
                        list: "/cars",
                        show: "/cars/show/:id",
                        create: "/users/create",
                        edit: "/cars/edit/:id",
                    },
                    {
                        name: "users",
                        list: "/users",
                        show: "/users/show/:id",
                        create: "/users/create",
                        edit: "/user/edit/:id",
                    }
                ]}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route
                            index
                            element={
                                <NavigateToResource resource="cars" />
                            }
                        />
                        <Route path="cars">
                            <Route index element={<CarList/>} />
                            <Route
                                path="show/:id"
                                element={<AntdInferencer />}
                            />
                            <Route
                                path="edit/:id"
                                element={<AntdInferencer />}
                            />
                            <Route path="create" element={<AntdInferencer />} />
                        </Route>
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route
                            index
                            element={
                                <NavigateToResource resource="users" />
                            }
                        />
                        <Route path="users">
                            <Route index element={<UserList />} />
                            <Route
                                path="show/:id"
                                element={<AntdInferencer />}
                            />
                            <Route
                                path="edit/:id"
                                element={<AntdInferencer />}
                            />
                            <Route path="create" element={<AntdInferencer />} />
                        </Route>
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
};

export default App;