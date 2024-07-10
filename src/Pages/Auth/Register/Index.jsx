import { Button, Input, Stack, Image, useToast } from "@chakra-ui/react";
import React from "react";
import LogoImage from "../../../Assets/Logo/BrainWave__1_-removebg-preview.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../Components/ErrorText/ErrorText";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UseUserData } from "../../../Context/UserContext/UserContextProvider";
export default function Index() {
  const { user } = UseUserData();
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
      console.log(data);
      const req = await axios.post(
        "https://mindmap-api-kohl.vercel.app/api/v1/auth/signup",
        data
      );
      toast({
        status: "success",
        title: "register successfully",
      });
      localStorage.setItem("user", JSON.stringify(req.data.data));
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
        <Input
          {...register("firstname")}
          placeholder="first name"
          variant="outline"
          bgColor="white"
        />
        {errors.firstname && (
          <ErrorText mr="auto" errors={errors} path="firstname" />
        )}

        <Input
          {...register("lastname")}
          placeholder="last name"
          variant="outline"
          bgColor="white"
        />
        {errors.lastname && (
          <ErrorText ml="1" mr="auto" errors={errors} path="lastname" />
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

        <Input
          {...register("confirmPassword")}
          placeholder="confirm password"
          variant="outline"
          bgColor="white"
        />
        {errors.confirmPassword && (
          <ErrorText ml="1" errors={errors} path="confirmPassword" mr="auto" />
        )}

        <Button
          isLoading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          w="100%"
          colorScheme="blue"
        >
          create user
        </Button>
      </Stack>
    </Stack>
  );
}
