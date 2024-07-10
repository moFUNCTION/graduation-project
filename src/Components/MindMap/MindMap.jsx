import { Box } from "@chakra-ui/react";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import Tree from "react-d3-tree";
export const MindMap = forwardRef(({ orgChart, ...rest }, ref) => {
  const [translate, setTranslate] = useState({ x: 100, y: 100 });

  const handleResize = useCallback(() => {
    if (ref.current) {
      const dimensions = ref.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 4,
      });
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const customNodeStyles = {
    node: {
      circle: {
        stroke: "#000",
        strokeWidth: 1,
        fill: "#fff",
      },
      name: {
        stroke: "#000",
        strokeWidth: "0px",
      },
    },
  };

  return (
    <Box bgColor="gray.100" ref={ref} {...rest}>
      <Tree
        data={orgChart}
        translate={translate}
        orientation="vertical"
        pathFunc="diagonal"
        zoom="0.5"
        separation={{ siblings: 1.2, nonSiblings: 1.2 }}
        nodeSize={{ x: 300, y: 300 }}
        styles={customNodeStyles}
      />
    </Box>
  );
});
MindMap.displayName = "MindMap";
