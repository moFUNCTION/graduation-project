import React from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { LazyLoadedImage } from "../../../../../Components/LazyLoadedImage/LazyLoadedImage";
function ImageDisplayModal({ isOpen, onClose, src }) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>mind map image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              bgColor="gray.100"
              justifyContent="center"
              alignItems="center"
              p="2"
              borderRadius="lg"
            >
              <Image
                h="100%"
                maxH="350px"
                w="100%"
                src={src}
                loading="lazy"
                decoding="async"
                objectFit="contain"
              />
            </Stack>
          </ModalBody>
          <ModalFooter gap="3">
            <Button onClick={onClose} colorScheme="red">
              cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export const MindMapBox = ({ src }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ImageDisplayModal onClose={onClose} isOpen={isOpen} src={src} />
      <Card w="sm" maxW="400px" flexGrow="1">
        <CardBody>
          <LazyLoadedImage
            src={src}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            h="200px"
            ImageProps={{
              objectFit: "cover",
            }}
            w="100%"
          />
          <Stack mt="6" spacing="3">
            <Heading bgColor="gray.100" borderRadius="lg" p="3" size="md">
              Mind map
            </Heading>
            <Button colorScheme="blue" onClick={onOpen}>
              View
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};
