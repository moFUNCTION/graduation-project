import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImageUploader } from "../../../Components/ImageUploader/ImageUploader";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorText } from "../../../Components/ErrorText/ErrorText";
import { schema } from "./schema";
import { UploadFiles } from "../../../@Firebase/lib/UploadFiles";
import axios from "axios";
import { LoadingModal } from "../../../Components/LoadingModal/LoadingModal";
import { UseUserData } from "../../../Context/UserContext/UserContextProvider";
export default function Index() {
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const Navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState();
  const { user } = UseUserData();
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
    setError,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const image = useWatch({ control, name: "image" });
  const HandleChange = (image) => {
    setValue("image", image);
  };
  const onSubmit = async (data) => {
    try {
      if (!image || !(image instanceof File)) {
        setError("image", { message: "please upload an image" });
        return;
      }
      const [imageLink] = await UploadFiles({
        files: [image],
        StoragePath: "images",
        onUploadProgress: ({ progress }) => {
          setLoadingProgress(progress);
        },
      });
      const req = await axios.post(
        "https://mindmap-api-kohl.vercel.app/api/v1/articals",
        {
          title: data.title,
          content: data.content,
          imageCover: imageLink.URL,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      Navigate("/blogs");
      toast({
        status: "success",
        title: "create the blog successfully",
      });
    } catch (err) {
      toast({
        status: "error",
        title: err.message,
      });
    }
  };
  return (
    <>
      <LoadingModal
        isOpen={isSubmitting}
        label="create the blog..."
        progress={loadingProgress}
      />
      <Stack p="4">
        <Flex
          p="3"
          color="blue.700"
          borderBottom="2px"
          borderBottomColor="blue.700"
          justifyContent="space-between"
        >
          <Heading>Create a Blog</Heading>
          <Button as={Link} to="/blogs" colorScheme="blue">
            Blogs
          </Button>
        </Flex>
        <Stack>
          <ImageUploader
            img={image}
            onChangeImage={HandleChange}
            onRemoveImage={() => HandleChange("")}
            p="5"
            label="Upload an image for the blog"
          />
          <Input
            isInvalid={errors.title}
            {...register("title")}
            placeholder="title"
            variant="outline"
          />
          {errors.title && <ErrorText path="title" errors={errors} />}
          <Textarea
            isInvalid={errors.content}
            {...register("content")}
            variant="outline"
            placeholder="content"
          />
          {errors.content && <ErrorText path="content" errors={errors} />}
          <Button
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            size="lg"
            colorScheme="blue"
          >
            Create Blog
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
