import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import BeARider from "../Pages/BeARider/BeARider";
import SendAParcel from "../Pages/SendAParcel/SendAParcel";
import Dashboard from "../Layouts/Dashboard";
import Myparcels from "../Pages/Dashboard/MyParcels/Myparcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccessful from "../Pages/Dashboard/PaymentSuccessfull/PaymentSuccessful";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AssignedTask from "../Pages/Dashboard/AssignedTask/AssignedTask";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { index: true, 
        Component: Home },
        {
          path:"coverage",
          Component:Coverage,
          loader: ()=> fetch("../serviceCenter.json")
        },
        {
          path:"rider",
          element:<PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>,
           loader: ()=> fetch("../serviceCenter.json")
        },
        {
          path:"send-parcel",
          element:<PrivateRoute>
            <SendAParcel></SendAParcel>
          
          </PrivateRoute>,
           loader: ()=> fetch("../serviceCenter.json")


        },
        {
          path:"parcel-track/:trackingId",
          Component:ParcelTrack,
         
        },

     
      
        ]
  },
  {
    path:"/",
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:"login",
        Component:Login
      },
      {
        path:"register",
        Component:Register
      }
    ]
  },
  {
    path:"dashboard",
    element:<PrivateRoute>
          <Dashboard></Dashboard>
          </PrivateRoute>,
    children:[

      { index: true, 
        Component: DashboardHome },

      {
        path:"my-parcel",
        element:<Myparcels></Myparcels>
      },
      {
        path:"payment/:parcelId",
        element:<Payment></Payment>
      },
      {
        path:"payment-success",
        element:<PaymentSuccessful></PaymentSuccessful>
      },
      {
        path:"payment-history",
        element:<PaymentHistory></PaymentHistory>
      },

      //rider routes

      {
        path:"assigned-task",
        element:<RiderRoute><AssignedTask></AssignedTask></RiderRoute>
      },
      {
        path:"completed-deliveries",
        element:<RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
      },

      //admin routes
      {
        path:"approve-riders",
        element:<AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
      },
      {
        path:"manage-users",
        element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        
      },
      {
        path:"assign-riders",
        element:<AdminRoute><AssignRiders></AssignRiders></AdminRoute>
        
      }

    ]


  }
]);
