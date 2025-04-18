import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";
import Header from "./components/header/Header.jsx";
import {Routes, Route} from "react-router";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "/src/tailwindcss.css"
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "/src/pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import Orders from "./pages/Orders.jsx";

function App() {

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path={"/"}></Route>
        <Route path={"/login"}
               element={<ProtectedRoute allowAuthenticated={false}>
                 <Login/>
               </ProtectedRoute>}>
        </Route>
        <Route path={"/register"}
               element={<ProtectedRoute allowAuthenticated={false}>
                 <Register/>
               </ProtectedRoute>}>
        </Route>
          <Route path={"/products"}
                 element={<ProtectedRoute allowAuthenticated={true}>
                     <ProductList/>
                 </ProtectedRoute>}>
          </Route>
          <Route path={"/products/:id"}
                 element={<ProtectedRoute allowAuthenticated={true}>
                     <ProductDetail/>
                 </ProtectedRoute>}>
          </Route>
          <Route path={"/cart"}
                 element={<ProtectedRoute allowAuthenticated={true}>
                     <Cart/>
                 </ProtectedRoute>}>
          </Route>
          <Route path={"/profile"}
                 element={<ProtectedRoute allowAuthenticated={true}>
                     <Profile/>
                 </ProtectedRoute>}>
          </Route>
          <Route path={"/orders"}
                 element={<ProtectedRoute allowAuthenticated={true}>
                     <Orders/>
                 </ProtectedRoute>}>
          </Route>
      </Routes>
    </>
  )
}

export default App
