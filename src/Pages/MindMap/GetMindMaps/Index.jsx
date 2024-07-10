import { Flex, Heading, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import { useFetch } from "../../../Hooks/useFetch/useFetch";
import { UseUserData } from "../../../Context/UserContext/UserContextProvider";
import { MindMapBox } from "./Components/MindMapBox/MindMapBox";

export default function Index() {
  const { user } = UseUserData();
  const {
    data: folders,
    error,
    loading,
  } = useFetch({
    endpoint: "https://mindmap-api-kohl.vercel.app/api/v1/folders",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return (
    <Stack p="3">
      <Heading
        size="lg"
        borderBottom="2px"
        borderBottomColor="blue.700"
        color="blue.700 "
        p="3"
      >
        Folders 📁
      </Heading>
      <Flex
        p="3"
        justifyContent="center"
        isLoaded={!loading}
        as={Skeleton}
        minH="400px"
        gap="6"
        flexWrap="wrap"
      >
        {folders?.data?.map((folder, index) => {
          return <MindMapBox src={folder} key={index} />;
        })}
      </Flex>
    </Stack>
  );
}
