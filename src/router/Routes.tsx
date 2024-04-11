import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Error404 from "../pages/error404";
import Articles from "../pages/Articles";
import Article from "../pages/Article";
import Home from "../pages/home";
import ArticleForm from "../layout/ArticleForm";
import Create from "../pages/Create";
import CreatureForm from "../layout/CreatureForm";

export const routes: RouteObject[] = [
    { // top of the tree, can have child routes
        path: '/',
        element: <App />,
        errorElement: <Error404/>,
        children: [
            {path: '/', element: <Home />},
            {path: 'articles', element: <Articles />},
            {path: 'article', element: <Article />, children: [
                {path: 'article/:id', element: <Article />}
            ]},
        ]
    },
    {
        path:'create/',
        element: <Create />,
        errorElement: <Error404 />,
        children: [
            {path: 'create/article', element: <ArticleForm />},
            {path: 'create/creature', element: <CreatureForm />},
        ]
    }
]

export const router = createBrowserRouter(routes);