import LogIn from "./pages/LogIn"
import Registration from "./pages/Registration"
export const AppRoutes =[
    {
        index:true,
        element: < Registration/>,
    },
    {
        path:'/log-in',
        element: < LogIn/>,
    },
]          