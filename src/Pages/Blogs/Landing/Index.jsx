import React, { useState } from "react";
import { useFetch } from "../../../Hooks/useFetch/useFetch";
import {
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { BlogBox } from "../../../Components/BlogBox/BlogBox";
import { Link } from "react-router-dom";
import { UseUserData } from "../../../Context/UserContext/UserContextProvider";
import axios from "axios";

export default function Index() {
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const [loadingReq, setLoadingReq] = useState(false);
  const { user } = UseUserData();
  const { data, loading, error, HandleRender } = useFetch({
    endpoint: "https://mindmap-api-kohl.vercel.app/api/v1/articals",
  });
  const blogs = data?.data;
  const HandleDeleteBlog = async ({ id }) => {
    try {
      setLoadingReq(true);
      const req = await axios.delete(
        `https://mindmap-api-kohl.vercel.app/api/v1/articals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoadingReq(false);
      toast({
        status: "success",
        title: "delete blog successfully",
      });
      HandleRender();
    } catch (err) {
      console.log(err);

      setLoadingReq(false);
      toast({
        status: "error",
        title: "failed to delete blog",
      });
    }
  };
  return (
    <Stack p="4">
      <Flex
        p="3"
        color="blue.700"
        borderBottom="2px"
        borderBottomColor="blue.700"
        justifyContent="space-between"
      >
        <Heading>Blogs</Heading>
        <Button as={Link} to="/blogs/create" colorScheme="blue">
          Create a blog
        </Button>
      </Flex>

      <Flex
        as={Skeleton}
        isLoaded={!loading}
        minH="300px"
        gap="3"
        justifyContent="center"
        p="2"
        flexWrap="wrap"
      >
        {blogs?.map((item) => {
          const isAddedToWhishlist = user?.data?.wishlist?.includes(item._id);
          return (
            <BlogBox
              id={item._id}
              key={item._id}
              title={item.title}
              src={item.imageCover}
              isAddedToWishList={isAddedToWhishlist}
              author={item.author}
              onDeleteBlog={HandleDeleteBlog}
              isLoading={loadingReq}
            />
          );
        })}
      </Flex>
    </Stack>
  );
}
