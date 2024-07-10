import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { lazy } from "react";
import { LazyPageWrapper } from "./Components/LazyPageWrapper/LazyPageWrapper";
import { ProtectedRoute } from "./Utils/ProtectedRoute/ProtectedRoute";
const Landing = lazy(() => import("./Pages/Landing/Index"));
const Login = lazy(() => import("./Pages/Auth/Login/Index"));
const Register = lazy(() => import("./Pages/Auth/Register/Index"));
const Blogs = lazy(() => import("./Pages/Blogs/Landing/Index"));
const AddBlog = lazy(() => import("./Pages/Blogs/AddBlog/Index"));
const Blog = lazy(() => import("./Pages/Blogs/Blog[id]/Index"));
const UpdateBlog = lazy(() => import("./Pages/Blogs/UpdateBlog/Index"));
const UserProfile = lazy(() => import("./Pages/UserProfile/Landing/Index"));
const UserUpdate = lazy(() => import("./Pages/UserProfile/Update/Index"));
const AddMindMap = lazy(() => import("./Pages/MindMap/AddMindMap/index"));
const MindMaps = lazy(() => import("./Pages/MindMap/GetMindMaps/Index"));
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <LazyPageWrapper>
              <Landing />
            </LazyPageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <LazyPageWrapper>
              <Login />
            </LazyPageWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <LazyPageWrapper>
              <Register />
            </LazyPageWrapper>
          }
        />
        <Route
          path="/user"
          element={
            <LazyPageWrapper>
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            </LazyPageWrapper>
          }
        />
        <Route
          path="/user/update"
          element={
            <LazyPageWrapper>
              <ProtectedRoute>
                <UserUpdate />
              </ProtectedRoute>
            </LazyPageWrapper>
          }
        />

        <Route
          path="/blogs"
          element={
            <LazyPageWrapper>
              <Blogs />
            </LazyPageWrapper>
          }
        />
        <Route
          path="/blogs/create"
          element={
            <LazyPageWrapper>
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            </LazyPageWrapper>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <LazyPageWrapper>
              <Blog />
            </LazyPageWrapper>
          }
        />

        <Route
          path="/blogs/:id/update"
          element={
            <LazyPageWrapper>
              <ProtectedRoute>
                <UpdateBlog />
              </ProtectedRoute>
            </LazyPageWrapper>
          }
        />
        <Route
          path="/mind-map/create"
          element={
            <LazyPageWrapper>
              <ProtectedRoute>
                <AddMindMap />
              </ProtectedRoute>
            </LazyPageWrapper>
          }
        />
        <Route
          path="/mind-map"
          element={
            <LazyPageWrapper>
              <MindMaps />
            </LazyPageWrapper>
          }
        />
      </Routes>
    </>
  );
}

export default App;
