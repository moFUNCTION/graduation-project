import {
  Button,
  Flex,
  Heading,
  Input,
  Skeleton,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ImageUploader } from "../../../Components/ImageUploader/ImageUploader";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorText } from "../../../Components/ErrorText/ErrorText";
import { schema } from "./schema";
import { UploadFiles } from "../../../@Firebase/lib/UploadFiles";
import axios from "axios";
import { LoadingModal } from "../../../Components/LoadingModal/LoadingModal";
import { UseUserData } from "../../../Context/UserContext/UserContextProvider";
import { useFetch } from "../../../Hooks/useFetch/useFetch";
export default function Index() {
  const { user } = UseUserData();
  const { id } = useParams();
  const NavigateTo = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState();
  const {
    register,
    formState: { errors, isSubmitting, isLoading },
    setValue,
    control,
    setError,
    handleSubmit,
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: async () => {
      const res = await axios.get(
        `https://mindmap-api-kohl.vercel.app/api/v1/articals/${id}`
      );
      return { ...res.data.data, image: res.data.data.imageCover };
    },
  });

  const image = useWatch({ control, name: "image" });
  const HandleChange = (image) => {
    setValue("image", image);
  };
  const onSubmit = async (data) => {
    try {
      const Data = {
        title: data.title,
        content: data.content,
      };
      if (image instanceof File) {
        const [imageLink] = await UploadFiles({
          files: [image],
          StoragePath: "images",
          onUploadProgress: ({ progress }) => {
            setLoadingProgress(progress);
          },
        });
        Data.imageCover = imageLink.URL;
      }

      const req = await axios.put(
        `https://mindmap-api-kohl.vercel.app/api/v1/articals/${id}`,
        {
          imageCover: image,
          ...Data,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      NavigateTo("/blogs");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LoadingModal
        isOpen={isSubmitting}
        label="Update the blog..."
        progress={loadingProgress}
      />
      <Stack as={Skeleton} isLoaded={!isLoading} p="4">
        <Flex
          p="3"
          color="blue.700"
          borderBottom="2px"
          borderBottomColor="blue.700"
          justifyContent="space-between"
        >
          <Heading>Update the Blog</Heading>
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
            Update your Blog
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
