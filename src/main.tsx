import React from "react";
import ReactDOM from "react-dom/client";
import "../app/globals.css";
import Layout from "./components/layout";
import {
	BookingsManagement,
	bookingsManagementLoader,
} from "@/routes/bookings-management";
import { Toaster } from "@/components/ui/toaster";
import { PlacesHome, placesHomeLoader } from "./routes/places-home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		loader: placesHomeLoader,
		element: <PlacesHome />,
	},
	{
		path: "/:placeId/bookings",
		loader: bookingsManagementLoader,
		element: <BookingsManagement />,
	},
]);

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<Layout>
			<RouterProvider router={router} />
		</Layout>
		<Toaster />
	</React.StrictMode>,
);
