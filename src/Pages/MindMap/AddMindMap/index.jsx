import {
  Button,
  Flex,
  Heading,
  Input,
  Skeleton,
  SkeletonText,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { MindMap } from "./../../../Components/MindMap/MindMap";
import html2canvas from "html2canvas";
import { LoadingModal } from "../../../Components/LoadingModal/LoadingModal";
import { UploadFiles } from "../../../@Firebase/lib/UploadFiles";
import { UseUserData } from "../../../Context/UserContext/UserContextProvider";
import { useNavigate } from "react-router-dom";
export default function Index() {
  const Navigate = useNavigate();
  const { user } = UseUserData();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const treeContainerRef = useRef(null);
  const [tree, setTree] = useState();
  const [videoURL, setVideoURL] = useState("");
  const [error, setError] = useState();
  const [GetDataLoading, setGetDataLoading] = useState(false);
  const [RequistLoading, setRequistLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState();
  const [summary, setSummary] = useState();
  const HandleChangeText = (e) => {
    setVideoURL(e.target.value);
  };
  const HandleGetSummary = async () => {
    try {
      setGetDataLoading(true);
      const res = await axios.get(
        `https://yt-api.p.rapidapi.com/video/info?id=${
          videoURL.split("v=")[1]
        }`,
        {
          headers: {
            "x-rapidapi-key":
              "d4b82d177fmsh1abab841e438a1ep1dee33jsn21287e1c1888",
            "x-rapidapi-host": "yt-api.p.rapidapi.com",
          },
        }
      );
      setSummary(res.data.description);
      HandleGetMindMap(res.data.keywords);
    } catch (err) {
      setGetDataLoading(false);
      setError(err.message);
    }
  };
  const HandleGetMindMap = (keywords) => {
    const data = {
      name: "Root",
      children: keywords.slice(0, 6).map((keyword) => {
        return { name: keyword };
      }),
    };
    setTree(data);
    GetDataLoading(false);
  };

  const captureTreeAsImage = () => {
    return new Promise((resolve, reject) => {
      if (treeContainerRef.current) {
        html2canvas(treeContainerRef.current)
          .then((canvas) => {
            canvas.toBlob((blob) => {
              const file = new File([blob], "mindmap.png", {
                type: "image/png",
              });
              resolve(file); // Resolve with the File object
            }, "image/png");
          })
          .catch((error) => {
            reject(error); // Reject if html2canvas fails
          });
      } else {
        reject(new Error("treeContainerRef is not initialized"));
      }
    });
  };
  const onSubmit = async () => {
    try {
      setRequistLoading(true);
      const file = await captureTreeAsImage();
      const [imageLink] = await UploadFiles({
        files: [file],
        StoragePath: "images",
        onUploadProgress: ({ progress }) => {
          setLoadingProgress(progress);
        },
      });
      const req = await axios.post(
        "https://mindmap-api-kohl.vercel.app/api/v1/folders",
        {
          myFolders: imageLink.URL,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast({
        status: "success",
        title: "make a mindmap successfully ",
      });
      Navigate("/mind-map");
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
        isOpen={RequistLoading}
        label="create the blog..."
        progress={loadingProgress}
      />
      <Stack p="3">
        <Stack p="3" bgColor="gray.50">
          <Heading
            size="lg"
            borderBottomColor="blue.700"
            borderBottom="2px"
            p="3"
          >
            Summarize your video
          </Heading>

          <Input
            onChange={HandleChangeText}
            value={videoURL}
            placeholder="enter the video url to summarize"
            bgColor="white"
            size="lg"
          />
          {(summary || GetDataLoading) && (
            <SkeletonText isLoaded={!GetDataLoading} noOfLines={8} w="100%">
              {summary}
            </SkeletonText>
          )}
          <Button onClick={HandleGetSummary} colorScheme="blue">
            Summarize
          </Button>
          {summary && tree && (
            <Button colorScheme="green" onClick={onSubmit}>
              Save
            </Button>
          )}
        </Stack>
        {tree && <MindMap ref={treeContainerRef} h="400px" orgChart={tree} />}
      </Stack>
    </>
  );
}
