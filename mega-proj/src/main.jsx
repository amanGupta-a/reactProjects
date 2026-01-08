import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserAuthentication, Login} from './components/index.js'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element:<Login/>
            // element: (
            //     <UserAuthentication authentication={false}>
            //         <Login />
            //     </UserAuthentication>
            // ),
        },
        {
            path: "/signup",
            element: <SignUp/>
            // element: (
            //     <UserAuthentication authentication={false}>
            //         <Signp />
            //     </UserAuthentication>
            // ),
        },
        {
            path: "/all-posts",
            element: (
                <UserAuthentication authentication>
                    {" "}
                    <AllPosts />
                </UserAuthentication>
            ),
        },
        {
            path: "/add-post",
            element: (
                <UserAuthentication authentication>
                    {" "}
                    <AddPost />
                </UserAuthentication>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <UserAuthentication authentication>
                    {" "}
                    <EditPost />
                </UserAuthentication>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
