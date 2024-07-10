import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
const userContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [JSON.stringify(user)]);
  const HandleSetUser = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };
  const HandleRender = async () => {
    try {
      setLoading(true);
      const req = await axios.get(
        "https://mindmap-api-kohl.vercel.app/api/v1/users/getMe",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = { ...user, data: req.data.data };
      setLoading(false);
      setUser(data);
    } catch (err) {
      setLoading(false);
    }
  };
  const HandleLogout = () => {
    setUser(undefined);
  };
  const HandleAddItemToWishList = async ({ id }) => {
    setLoading(true);
    const req = await axios.post(
      "https://mindmap-api-kohl.vercel.app/api/v1/wishlist",
      {
        blogId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    HandleRender();
  };
  const HandleDeleteFromWishList = async ({ id }) => {
    setLoading(true);
    const req = await axios.delete(
      `https://mindmap-api-kohl.vercel.app/api/v1/wishlist/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    HandleRender();
  };
  const isAddedToWishlist = useCallback(
    ({ id }) => {
      return user?.data?.wishlist.includes(id);
    },
    [user?.data?.wishlist]
  );
  return (
    <userContext.Provider
      value={{
        user,
        HandleLogout,
        HandleSetUser,
        HandleRender,
        isLoading: loading,
        HandleAddItemToWishList,
        HandleDeleteFromWishList,
        isAddedToWishlist,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
export const UseUserData = () => {
  return useContext(userContext);
};
