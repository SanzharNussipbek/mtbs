import React, { useState } from "react";
import { View } from "react-native";
import { Flex, Text, VStack } from "native-base";

import { Session, SessionSeat } from "../../types/types";

import SessionSeatItem from "../session-seat-item/session-seat-item.componenent";

import { styles } from "./session-seat-list.styles";

type Props = {
  session: Session;
  onChange: (seats: SessionSeat[]) => void;
};

const SessionSeatList: React.FC<Props> = ({ session, onChange }) => {
  const [selectedSeats, setSelectedSeats] = useState<SessionSeat[]>([]);

  const rows = [
    ...new Set(
      session?.seats.map((s) => s.seat.rowNumber).sort((a, b) => a - b)
    ),
  ];

  const handleSelectSeat = (seat: SessionSeat, remove?: Boolean) => {
    let newSelectedSeats = selectedSeats;
    if (remove) {
      newSelectedSeats = selectedSeats.filter((s) => s.id !== seat.id);
    } else if (selectedSeats.findIndex((s) => s.id === seat.id) !== -1) {
      newSelectedSeats = selectedSeats.map((s) =>
        s.id === seat.id ? seat : s
      );
    } else {
      newSelectedSeats = [...selectedSeats, seat];
    }
    setSelectedSeats(newSelectedSeats);
    onChange(newSelectedSeats);
  };

  return session ? (
    <View style={styles.container}>
      <VStack>
        {rows.map((row, index) => (
          <Flex key={index} direction="row" style={styles.row}>
            <Text style={styles.rowNum} color="secondary.500">
              {row}
            </Text>
            <Flex direction="row">
              {session?.seats
                .filter((s) => s.seat.rowNumber === row)
                .map((s, idx) => (
                  <SessionSeatItem
                    totalSelectedSeatsNum={selectedSeats?.length}
                    sessionSeat={s}
                    rates={session?.rates}
                    key={idx}
                    onChange={handleSelectSeat}
                  />
                ))}
            </Flex>
          </Flex>
        ))}
      </VStack>
    </View>
  ) : null;
};

export default SessionSeatList;
