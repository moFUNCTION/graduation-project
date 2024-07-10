import { Button, Input, Stack, Image, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import LogoImage from "../../../Assets/Logo/BrainWave__1_-removebg-preview.png";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../Components/ErrorText/ErrorText";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseUserData } from "../../../Context/UserContext/UserContextProvider";
import { ImageUploader } from "./../../../Components/ImageUploader/ImageUploader";
import { UploadFiles } from "../../../@Firebase/lib/UploadFiles";
import { LoadingModal } from "../../../Components/LoadingModal/LoadingModal";
export default function Index() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { user, HandleRender } = UseUserData();
  const Navigate = useNavigate();
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
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { ...user.data, image: user.data.profileImg },
  });
  const image = useWatch({ control, name: "image" });
  const HandleChange = (image) => {
    setValue("image", image);
  };
  const onSubmit = async (data) => {
    try {
      const Data = {
        firstname: data.firstname,
        lastname: data.lastname,
      };

      if (image instanceof File) {
        const [imageLink] = await UploadFiles({
          files: [image],
          StoragePath: "images",
          onUploadProgress: ({ progress }) => {
            setLoadingProgress(progress);
          },
        });
        Data.profileImg = imageLink.URL;
      }

      const req = await axios.put(
        "https://mindmap-api-kohl.vercel.app/api/v1/users/updateMe",
        { profileImg: image, ...Data },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      HandleRender();
      toast({
        title: "update user data successfully",
        status: "success",
      });
      Navigate("/user");
    } catch (err) {
      toast({
        title: "failed to update user data",
        description: err.message,
        status: "error",
      });
    }
  };

  return (
    <>
      <LoadingModal
        isOpen={isSubmitting}
        label="update user data..."
        progress={loadingProgress}
      />
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
          <ImageUploader
            img={image}
            onChangeImage={HandleChange}
            onRemoveImage={() => HandleChange("")}
            p="5"
            label="update your image"
          />
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

          <Button
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            w="100%"
            colorScheme="blue"
          >
            Update your data
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
