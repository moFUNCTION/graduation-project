import {
  Box,
  Stack,
  Image,
  Heading,
  Button,
  useToast,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LazyLoadedImage } from "../LazyLoadedImage/LazyLoadedImage";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";
import { UseUserData } from "../../Context/UserContext/UserContextProvider";
export const BlogBox = ({
  src,
  title,
  id,
  isAddedToWishList,
  author,
  onDeleteBlog,
  isLoading,
}) => {
  const {
    user,
    HandleRender,
    HandleAddItemToWishList,
    HandleDeleteFromWishList,
  } = UseUserData();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const [loadingReq, setLoading] = useState(false);
  const HandleDeleteBlog = () => {
    onDeleteBlog({ id });
  };
  const onAddToWishlist = async () => {
    try {
      setLoading(true);
      await HandleAddItemToWishList({ id });
      toast({
        title: "added to whishlist",
        status: "success",
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast({
        title: "failed to add to wishlist",
        description: "try again later",
        status: "error",
      });
    }
  };
  const onDeleteFromWishlist = async () => {
    try {
      setLoading(true);
      await HandleDeleteFromWishList({ id });
      toast({
        title: "removed from wishlist",
        status: "success",
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast({
        title: "failed to remove from wishlist",
        description: "try again later",
        status: "error",
      });
    }
  };
  return (
    <Stack
      bgColor="rgb(0, 0 , 0 , 0.01)"
      borderRadius="lg"
      overflow="hidden"
      w="100%"
      maxW="500px"
      border="1px"
      borderColor="gray.300"
    >
      <Box
        w="100%"
        h="300px"
        _hover={{
          img: {
            transform: "scale(1.1)",
          },
        }}
        pos="relative"
        alignItems="center"
      >
        {isAddedToWishList ? (
          <>
            <Flex
              flexWrap="wrap"
              pos="absolute"
              gap="3"
              top="2"
              right="2"
              zIndex="10"
            >
              <Button isLoading={isLoading} colorScheme="green">
                Added to wishlist
              </Button>
              <Button
                colorScheme="red"
                onClick={onDeleteFromWishlist}
                isLoading={loadingReq}
              >
                Remove From the wishlist
              </Button>
            </Flex>
          </>
        ) : (
          <Button
            pos="absolute"
            gap="3"
            top="2"
            right="2"
            zIndex="10"
            colorScheme="blue"
            onClick={onAddToWishlist}
            isLoading={loadingReq}
          >
            Add to wishlist
            <IoAddCircleOutline />
          </Button>
        )}

        <LazyLoadedImage
          ImageProps={{
            objectFit: "cover",
            transition: "0.3s",
          }}
          src={src}
          w="100%"
          h="100%"
        />
      </Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        m="3"
        borderRadius="lg"
        p="3"
        bgColor="gray.100"
      >
        {author?._id === user.data._id ? (
          <>
            <Heading size="sm" color="blue.900">
              created by you
            </Heading>
            <ButtonGroup>
              <Button
                isLoading={isLoading}
                as={Link}
                to={`/blogs/${id}/update`}
                colorScheme="blue"
              >
                Update
              </Button>
              <Button
                isLoading={isLoading}
                colorScheme="red"
                onClick={HandleDeleteBlog}
              >
                Delete
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <Heading size="sm" color="blue.900">
            created by{" "}
            {(author?.firstname || "Unknown user") +
              " " +
              (author?.lastname || "")}
          </Heading>
        )}
      </Flex>
      <Stack gap="5" p="5">
        <Heading color="gold.500" size="md">
          {title}
        </Heading>
        <Button
          isLoading={isLoading}
          colorScheme="blue"
          as={Link}
          to={`/blogs/${id}`}
          gap="3"
        >
          Navigate to <BsArrowRight />
        </Button>
      </Stack>
    </Stack>
  );
};
