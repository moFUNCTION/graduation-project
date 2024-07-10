import {
  Button,
  Input,
  Stack,
  Image,
  useToast,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import LogoImage from "../../../Assets/Logo/BrainWave__1_-removebg-preview.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../Components/ErrorText/ErrorText";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { UseUserData } from "../../../Context/UserContext/UserContextProvider";
export default function Index() {
  const { state } = useLocation();
  const { user, HandleSetUser } = UseUserData();
  console.log(user);
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    try {
      const req = await axios.post(
        "https://mindmap-api-kohl.vercel.app/api/v1/auth/login",
        data
      );
      toast({
        status: "success",
        title: "login successfully",
      });
      HandleSetUser(req.data);
    } catch (err) {
      const errors = err.response.data.errors;
      for (let error of errors) {
        setError(error.path, { message: error.msg });
        toast({
          title: `error in ${error.path} field check it again `,
          status: "error",
        });
      }
    }
  };
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Stack
      bgColor="blue.600"
      justifyContent="center"
      alignItems="center"
      h="calc(100vh - 104px)"
      p="3"
    >
      <Stack
        w="100%"
        maxW="600px"
        bgColor="gray.100"
        alignItems="center"
        p="4"
        borderRadius="lg"
      >
        <Image mb="4" src={LogoImage} w="100px" />
        {state?.message && (
          <Heading
            size="sm"
            w="100%"
            p="4"
            borderRadius="md"
            bgColor="blue.400"
            color="gray.50"
          >
            {state.message}
          </Heading>
        )}
        <Input
          {...register("email")}
          placeholder="email"
          variant="outline"
          bgColor="white"
        />
        {errors.email && (
          <ErrorText ml="1" mr="auto" errors={errors} path="email" />
        )}

        <Input
          {...register("password")}
          placeholder="password"
          variant="outline"
          bgColor="white"
        />
        {errors.password && (
          <ErrorText ml="1" mr="auto" errors={errors} path="password" />
        )}

        <Button
          isLoading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          w="100%"
          colorScheme="blue"
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
}
