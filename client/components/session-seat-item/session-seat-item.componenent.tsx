import React, { useState } from "react";
import { Pressable, Text, Modal, Button, View } from "native-base";

import { SessionSeat } from "../../types/types";

import { styles } from "../session-seat-item/session-seat-item.styles";

type Props = {
  sessionSeat: SessionSeat;
};

const RATES = ["ADULT", "STUDENT", "KID"];

const SessionSeatItem: React.FC<Props> = ({ sessionSeat }) => {
  const [showModal, setShowModal] = useState(false);
  const [rate, setRate] = useState<string | null>(null);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleChooseRate = (value: string) => {
    if (rate === value) {
      setRate(null);
    } else {
      setRate(value);
    }
    setShowModal(false);
  };

  return (
    <Pressable onPress={handleClick} style={styles.container}>
      <View
        style={{
          width: 25,
          height: 25,
          marginRight: 8,
          borderWidth: 1,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
          borderColor: rate?.length ? "#831843" : "grey",
          backgroundColor: rate?.length ? "#9d174d" : "transparent",
        }}
      >
        <Text color="white" style={styles.seatNum}>
          {sessionSeat?.seat?.seatNumber}
        </Text>
      </View>
      <Modal isOpen={showModal} onClose={handleCancel}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Choose the rate:</Modal.Header>
          <Modal.Body>
            <Button.Group space={2} direction="column">
              {RATES.map((value) => (
                <Button
                  variant={value === rate ? "subtle" : "outline"}
                  colorScheme="secondary"
                  onPress={() => handleChooseRate(value)}
                >
                  {value}
                </Button>
              ))}
            </Button.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={handleCancel}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Pressable>
  );
};

export default SessionSeatItem;
