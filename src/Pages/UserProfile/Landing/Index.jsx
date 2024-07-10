import {
  Stack,
  Flex,
  Button,
  Avatar,
  Box,
  IconButton,
  Editable,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import { UseUserData } from "../../../Context/UserContext/UserContextProvider";
import { BiEdit } from "react-icons/bi";
import { useFetch } from "../../../Hooks/useFetch/useFetch";
import { BlogBox } from "../../../Components/BlogBox/BlogBox";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

export default function Index() {
  const { user } = UseUserData();
  const { data, loading, error } = useFetch({
    endpoint: "https://mindmap-api-kohl.vercel.app/api/v1/wishlist",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const blogs = data?.data?.filter((item) => {
    return user.data.wishlist.includes(item._id);
  });
  return (
    <Stack p="2">
      <Flex
        alignItems="center"
        justifyContent="center"
        p="5"
        w="100%"
        bgColor="gray.100"
        borderRadius="lg"
        flexDir="column"
        gap="4"
      >
        <Box pos="relative">
          <Avatar src={user?.data?.profileImg} size="2xl" />
          <IconButton
            colorScheme="blue"
            pos="absolute"
            bottom="0"
            right="-1"
            borderRadius="full"
            as={Link}
            to="/user/update"
          >
            <BiEdit />
          </IconButton>
        </Box>
        <Button
          w="100%"
          maxW="400px"
          bgColor="white"
          variant="outline"
          colorScheme="blue"
          size="lg"
        >
          Hi {user.data.firstname} 👋 this is your profile
        </Button>
        <Button
          w="100%"
          maxW="400px"
          bgColor="white"
          variant="outline"
          colorScheme="blue"
          size="lg"
        >
          email : {user.data.email}
        </Button>
        <Button
          w="100%"
          maxW="400px"
          bgColor="white"
          variant="outline"
          colorScheme="blue"
          size="lg"
        >
          name : {user.data.firstname + " " + user.data.lastname}
        </Button>
        <Button
          w="100%"
          maxW="400px"
          bgColor="white"
          variant="outline"
          colorScheme="blue"
          size="lg"
        >
          wishlist : {user.data.wishlist?.length} blogs saved
        </Button>
        <Button as={Link} to="update" w="100%" maxW="400px" colorScheme="green">
          Update user data
        </Button>
      </Flex>
      <Stack>
        <Heading
          size="lg"
          color="blue.700"
          borderBottom="2px"
          borderBottomColor="blue.700"
          p="3"
        >
          Blogs Saved ❣️
        </Heading>
        <Flex
          gap="3"
          justifyContent="center"
          isLoaded={!loading}
          as={Skeleton}
          borderRadius="lg"
          minH="400px"
          flexWrap="wrap"
        >
          {blogs?.length === 0 && !loading && (
            <Stack justifyContent="center" maxW="700px" w="100%">
              <Heading
                size="md"
                bgColor="gray.100"
                h="fit-content"
                p="4"
                color="blue.700"
                borderRadius="md"
                w="100%"
                textAlign="center"
              >
                There are no blogs added to wishlist 😥
              </Heading>
              <Button
                alignItems="center"
                gap="3"
                as={Link}
                to="/blogs"
                colorScheme="blue"
              >
                Navigate To blogs
                <BsArrowRight />
              </Button>
            </Stack>
          )}
          {blogs?.map((item, index) => {
            return (
              <BlogBox
                isAddedToWishList={true}
                key={index}
                title={item.title}
                src={item.imageCover}
                id={item._id}
              />
            );
          })}
        </Flex>
      </Stack>
    </Stack>
  );
}
