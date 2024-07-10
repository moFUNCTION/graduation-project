import React, { useEffect, useState } from "react";
import { useFetch } from "../../../Hooks/useFetch/useFetch";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { UseUserData } from "../../../Context/UserContext/UserContextProvider";
import { LazyLoadedImage } from "../../../Components/LazyLoadedImage/LazyLoadedImage";

export default function Index() {
  const {
    user,
    HandleAddItemToWishList,
    HandleDeleteFromWishList,
    isAddedToWishlist,
  } = UseUserData();
  const { id } = useParams();

  const {
    data: blog,
    loading,
    error,
  } = useFetch({
    endpoint: `https://mindmap-api-kohl.vercel.app/api/v1/articals/${id}`,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  return (
    <Stack p="3">
      <Stack
        w="100%"
        bgColor="gray.100"
        h="400px"
        p="2"
        justifyContent="center"
        alignItems="center"
        as={Skeleton}
        isLoaded={!loading}
        borderRadius="md"
        pos="relative"
        fadeDuration={2}
      >
        {isAddedToWishlist({ id }) ? (
          <Button
            pos="absolute"
            top="2"
            right="2"
            zIndex="100"
            colorScheme="red"
            onClick={() => HandleDeleteFromWishList({ id })}
          >
            Remove from wishlist
          </Button>
        ) : (
          <Button
            pos="absolute"
            top="2"
            right="2"
            zIndex="100"
            colorScheme="blue"
            onClick={() => HandleAddItemToWishList({ id })}
          >
            Add to wishList
          </Button>
        )}

        <LazyLoadedImage
          borderRadius="lg"
          src={blog?.data?.imageCover}
          w="100%"
          maxW="600px"
          minH="250px"
          ImageProps={{
            objectFit: "cover",
          }}
        />
        <Button
          variant="outline"
          bgColor="white"
          w="100%"
          maxW="600px"
          colorScheme="blue"
          flexShrink="0"
        >
          Created At : {blog?.data?.createdAt}
        </Button>
      </Stack>

      <Stack
        as={SkeletonText}
        noOfLines="4"
        isLoaded={!loading}
        fadeDuration={2}
        alignItems="start"
        borderRadius="md"
        p="3"
        bgColor="gray.50"
      >
        <Flex
          justifyContent="space-between"
          borderBottom="2px"
          borderBottomColor="blue.700"
          p="3"
          alignItems="center"
        >
          <Heading size="md">
            Created By{" "}
            {blog?.data?.author?._id === user?.data?._id
              ? "You"
              : blog?.data?.author?.firstname +
                " " +
                blog?.data?.author?.lastname}
          </Heading>
          {blog?.data?.author?._id === user?.data?._id && (
            <Button colorScheme="blue" as={Link} to="update">
              Update
            </Button>
          )}
        </Flex>
        <Heading>{blog?.data?.title}</Heading>
        <Text>{blog?.data?.content}</Text>
      </Stack>
    </Stack>
  );
}
