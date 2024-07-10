import {
  Avatar,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import LogoImage from "../../Assets/Logo/BrainWave__1_-removebg-preview.png";
import { Link } from "react-router-dom";
import { UseUserData } from "../../Context/UserContext/UserContextProvider";

export const Header = () => {
  const { user, HandleLogout } = UseUserData();
  const [isPhoneQuery] = useMediaQuery("(max-width: 900px)");

  return (
    <Flex
      flexDir={isPhoneQuery && "column"}
      alignItems="center"
      justifyContent={isPhoneQuery ? "center" : "space-between"}
      p="3"
      gap="10"
    >
      <Link to="/">
        <Image loading="lazy" decoding="async" src={LogoImage} w="80px" />
      </Link>

      <Flex gap="8">
        <Button as={Link} to="/mind-map/create" size="lg" variant="link">
          Create a mind map
        </Button>
        <Button as={Link} to="/blogs" size="lg" variant="link">
          Blogs
        </Button>
      </Flex>
      <Flex justifyContent="center" flexWrap="wrap" alignItems="center" gap="3">
        {user ? (
          <>
            <Button
              onClick={HandleLogout}
              borderRadius="full"
              colorScheme="red"
            >
              Logout
            </Button>
            <Button borderRadius="full" colorScheme="blue" as={Link} to="/user">
              Wishlist
            </Button>
            <Button
              borderRadius="full"
              colorScheme="blue"
              as={Link}
              to="/mind-map"
            >
              Your folders
            </Button>

            <Button
              borderRadius="full"
              variant="outline"
              colorScheme="blue"
              as={Link}
              to="/user"
            >
              Hi {user.data.firstname} 👋
            </Button>
          </>
        ) : (
          <>
            <Button
              borderRadius="full"
              variant="outline"
              colorScheme="blue"
              as={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              to="/register"
              as={Link}
              borderRadius="full"
              colorScheme="blue"
            >
              Sign up
            </Button>
          </>
        )}

        <IconButton
          as={Link}
          to="/user"
          borderRadius="full"
          p="1"
          w="fit-content"
          h="fit-content"
        >
          <Avatar src={user?.data?.profileImg} size="sm" />
        </IconButton>
      </Flex>
    </Flex>
  );
};
