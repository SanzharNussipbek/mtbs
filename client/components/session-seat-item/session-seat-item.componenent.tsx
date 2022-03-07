import React, { useEffect, useState } from "react";
import { Pressable, Text, Modal, Button, View } from "native-base";

import { SeatType, SessionRates, SessionSeat } from "../../types/types";

import { styles } from "../session-seat-item/session-seat-item.styles";

type Props = {
  rates: SessionRates;
  sessionSeat: SessionSeat;
  onChange: (seat: SessionSeat, remove?: boolean) => void;
};

const SessionSeatItem: React.FC<Props> = ({ sessionSeat, rates, onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [rate, setRate] = useState<SeatType | null>(null);
  const [seat, setSeat] = useState<SessionSeat>(sessionSeat);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClear = () => {
    setShowModal(false);
    setRate(null);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChooseRate = (value: SeatType) => {
    setRate(rate === value ? null : value);
    setShowModal(false);
  };

  useEffect(() => {
    setSeat({ ...seat, type: rate === null ? "" : rate });
  }, [rate]);

  useEffect(() => {
    if (rate === null) {
      onChange(seat, true);
    } else {
      onChange(seat);
    }
  }, [seat]);

  return sessionSeat ? (
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
      <Modal isOpen={showModal} onClose={handleClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Choose the rate:</Modal.Header>
          <Modal.Body>
            <Button.Group space={2} direction="column">
              <Button
                colorScheme="secondary"
                onPress={() => handleChooseRate("ADULT")}
                variant={
                  rates.ADULT === 0
                    ? "ghost"
                    : rate === "ADULT"
                    ? "subtle"
                    : "outline"
                }
                disabled={rates.ADULT === 0}
              >
                {rates.ADULT === 0 ? "ADULT" : `ADULT $${rates.ADULT}`}
              </Button>
              <Button
                colorScheme="secondary"
                onPress={() => handleChooseRate("STUDENT")}
                variant={
                  rates.STUDENT === 0
                    ? "ghost"
                    : rate === "STUDENT"
                    ? "subtle"
                    : "outline"
                }
                disabled={rates.STUDENT === 0}
              >
                {rates.STUDENT === 0 ? "STUDENT" : `STUDENT $${rates.STUDENT}`}
              </Button>
              <Button
                colorScheme="secondary"
                onPress={() => handleChooseRate("CHILD")}
                variant={
                  rates.CHILD === 0
                    ? "ghost"
                    : rate === "CHILD"
                    ? "subtle"
                    : "outline"
                }
                disabled={rates.CHILD === 0}
              >
                {rates.CHILD === 0 ? "CHILD" : `CHILD $${rates.CHILD}`}
              </Button>
            </Button.Group>
          </Modal.Body>
          <Modal.Footer>
            {rate === null ? (
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={handleClose}
              >
                Cancel
              </Button>
            ) : (
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={handleClear}
              >
                Clear
              </Button>
            )}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Pressable>
  ) : null;
};

export default SessionSeatItem;
