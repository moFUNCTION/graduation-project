import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import AnimationData from "../../Assets/Animations/Animation - 1720548578775.json";
import Lottie from "lottie-react";
import { UseUserData } from "../../Context/UserContext/UserContextProvider";
import { Link } from "react-router-dom";
export default function Index() {
  const { user } = UseUserData();
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minH="calc(100vh - 125px)"
      p="4"
      gap="10"
      flexWrap="wrap"
    >
      <Lottie
        animationData={AnimationData}
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgb(0, 0 , 0 ,0.04)",
          borderRadius: "20px",
        }}
      />
      <Stack maxW="600px">
        <Heading color="blue.700">
          Map Your Thoughts, Share Your Stories
        </Heading>
        <Text color="blue.600">
          Unleash your creativity with BrainWave, the ultimate platform for
          creating stunning mind maps and engaging blogs. Visualize ideas,
          organize thoughts, and share your insights effortlessly. Collaborate
          with others and join a vibrant community of thinkers and creators.
          Transform your ideas into powerful content with BrainWave.
        </Text>
        <ButtonGroup colorScheme="blue" size="lg" mt="4">
          {user ? (
            <>
              <Button>Your Folders</Button>
              <Button as={Link} to="/user" variant="outline">
                WishList
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" variant="outline">
                Login
              </Button>
              <Button as={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </ButtonGroup>
      </Stack>
    </Flex>
  );
}
