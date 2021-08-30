import React from "react";
import { Badge, Center, NativeBaseProvider } from "native-base";

function FeedScreen() {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Example />
      </Center>
    </NativeBaseProvider>
  );
}

export default FeedScreen;
