import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Hotels from "./pages/Hotels";
import EditCategories from "./pages/EditCategories";
import NewHotel from "./pages/NewHotel";
import Home from "./pages/Home";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index path="/" element={<Home />} />,
            <Route index path="/hotels" element={<Hotels />} />,
            <Route path="/edit-categories" element={<EditCategories />} />,
            <Route path="/create-new-hotel" element={<NewHotel />} />
        </Route>
    )
);

export default function Router() {
    return <RouterProvider router={router} />;
}

