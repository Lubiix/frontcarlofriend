import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextArea, SafeAreaView, Box, Stack, Button, Modal } from "native-base";

const Event = () => {
  const [showModal, setShowModal] = useState(false);

  const handleComment = () => {
    console.log("click comment");
    setShowModal(true);
  };

  const closeComment = () => {
    console.log("close comment");
    setShowModal(false);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Soirée Rock jeudi 18/08 à 21h</Text>
      {/* <SafeAreaView style={{ backgroundColor: "#62ADEB" }} />
      <Box
        p={4}
        _text={{
          fontSize: "md",
          fontWeight: "bold",
          color: "white",
        }}
        alignItems="center"
        mb={3}
        bg="#62ADEB"
      >
        <Text>Evenement</Text>
      </Box>
      <Stack space={4} w="90%" justifyContent="center">
        <TextArea h={20} placeholder="Text Area Placeholder">
          <Button
            title="Commentaires"
            color="#62ADEB"
            onPress={() => handleComment()}
          >
            Commentaires
          </Button>
          <Modal isOpen={showModal} onClose={() => closeComment()}>
            <Modal.Content width="100%">
              <Modal.CloseButton />
              <Modal.Header alignItems="center">Commentaires</Modal.Header>
              <Modal.Body>test</Modal.Body>
              <Modal.Footer>Commentaire</Modal.Footer>
            </Modal.Content>
          </Modal>
        </TextArea>
      </Stack> */}
    </View>
  );
};

export default Event;
