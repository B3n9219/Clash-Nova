import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx";
import Clan from "./pages/Clan.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"


import Summary from "./pages/Summary.jsx";
import Wars from "./pages/Wars.jsx";
import Raids from "./pages/Raids.jsx"

// font awesome setup
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "clans/:tag",
                element: <Clan />,
                children: [
                    {
                        index: true,
                        element: <Summary />
                    },
                    {
                        path: "wars",
                        element: <Wars />,
                    },
                    {
                        path: "raids",
                        element: <Raids />
                    }
                ]
            }
        ]
    }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
