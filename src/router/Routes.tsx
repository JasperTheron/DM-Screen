import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Error404 from "../pages/error404";
import Articles from "../pages/Articles";
import Article from "../pages/Article";
import Home from "../pages/home";
import ArticleForm from "../forms/ArticleForm";
import Create from "../pages/Create";
import CreatureForm from "../forms/CreatureForm";
import ItemForm from "../forms/ItemForm";
import Items from "../pages/Items";

export const routes: RouteObject[] = [
    { // top of the tree, can have child routes
        path: '/',
        element: <App />,
        errorElement: <Error404/>,
        children: [
            {path: '/', element: <Home />},
            {path: 'articles', element: <Articles />},
            {path: 'article/:id', element: <Article />},
            {path: 'items', element: <Items />},
            {path: 'item/:id', element: <Items />},
        ]
    },
    {
        path:'create/',
        element: <Create />,
        errorElement: <Error404 />,
        children: [
            {path: 'article', element: <ArticleForm />},
            {path: 'creature', element: <CreatureForm />},
            {path: 'item', element: <ItemForm />},
            {path: 'editItem/:id', element: <ItemForm />},
        ]
    }
]

export const router = createBrowserRouter(routes);