import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import AdminLayout from "./help_components/AdminLayout";
import CommonLayout from "./help_components/CommonLayout";

import HomePage from "./screens/common_screens/HomePage";
import AboutPage from "./screens/common_screens/AboutUs";
import ContactPage from "./screens/common_screens/DeliveryPayment";
import CatalogPage from "./screens/common_screens/CatalogPage";
import ItemPage from "./screens/common_screens/ItemPage";
import CartPage from "./screens/common_screens/CartPage";

import AdminPage from "./screens/admin_screens/AdminPage";
import NewItemPage from "./screens/admin_screens/NewItemPage";
import Login from "./screens/admin_screens/AdminLogin";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CommonLayout>
              <Routes>
                <Route index element={<HomePage />} />
              </Routes>
            </CommonLayout>
          }
        />
        <Route
          path="/catalog/:slug/all"
          element={
            <CommonLayout>
              <Routes>
                <Route index element={<CatalogPage />} />
              </Routes>
            </CommonLayout>
          }
        />
        <Route
          path="/catalog/:slug/:type/all"
          element={
            <CommonLayout>
              <Routes>
                <Route index element={<CatalogPage />} />
              </Routes>
            </CommonLayout>
          }
        />
        <Route
          path="/catalog/:slug"
          element={
            <CommonLayout>
              <Routes>
                <Route index element={<ItemPage />} />
              </Routes>
            </CommonLayout>
          }
        />
        <Route
          path="/about"
          element={
            <CommonLayout>
              <Routes>
                <Route index element={<AboutPage />} />
              </Routes>
            </CommonLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <CommonLayout>
              <Routes>
                <Route index element={<CartPage />} />
              </Routes>
            </CommonLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <CommonLayout>
              <Routes>
                <Route index element={<ContactPage />} />
              </Routes>
            </CommonLayout>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Routes>
                <Route index element={<PrivateRoute element={<AdminPage />} />} />
              </Routes>
            </AdminLayout>
          }
        />

        <Route
          path="/admin/add_new_item"
          element={
            <AdminLayout>
              <Routes>
                <Route index element={<NewItemPage />} />
              </Routes>
            </AdminLayout>
          }
        /> 

        <Route path="/admin/login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
