import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Error404 from "../pages/error404";
import Models from "../pages/models";
import ModelsForm from "../pages/modelsForm";
import Articles from "../pages/Articles";

export const routes: RouteObject[] = [
    { // top of the tree, can have child routes
        path: '/',
        element: <App />,
        errorElement: <Error404/>,
        children: [
            {path: 'articles', element: <Articles />},
            {path: 'models/:id', element: <Models />},
            {path: 'createModel', element: <ModelsForm key="create" />},
            {path: 'manage/:id', element: <ModelsForm key="update" />}
        ]
    }
]

export const router = createBrowserRouter(routes);