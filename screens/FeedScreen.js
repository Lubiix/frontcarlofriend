import React from "react";
import { View, Text } from "react-native";

function FeedScreen() {
  return (
    <Box
      bg="primary.400"
      p={4}
      _text={{
        fontSize: "md",
        fontWeight: "bold",
        color: "white",
      }}
    >
      This is a Box
    </Box>
  );
}

export default FeedScreen;
