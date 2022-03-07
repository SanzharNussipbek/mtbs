import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Flex, Text, VStack } from "native-base";

import { SessionSeat } from "../../types/types";
import { setSession } from "../../redux/session/session.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectSession } from "../../redux/session/session.selector";

import SessionSeatItem from "../session-seat-item/session-seat-item.componenent";

import { styles } from "./session-seat-list.styles";

type Props = {
  onChange: (seats: SessionSeat[]) => void;
};

const SessionSeatList: React.FC<Props> = ({ onChange }) => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);

  const [selectedSeats, setSelectedSeats] = useState<SessionSeat[]>([]);

  const rows = [
    ...new Set(
      session?.seats.map((s) => s.seat.rowNumber).sort((a, b) => a - b)
    ),
  ];

  const handleSelectSeat = (seat: SessionSeat, remove?: Boolean) => {
    if (remove) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else if (selectedSeats.findIndex((s) => s.id === seat.id) !== -1) {
      setSelectedSeats(selectedSeats.map((s) => (s.id === seat.id ? seat : s)));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  useEffect(() => {
    onChange(selectedSeats);
  }, [selectedSeats]);

  useEffect(() => {
    dispatch(setSession(null));
  }, []);

  return session ? (
    <View style={styles.container}>
      <VStack>
        {rows.map((row) => (
          <Flex key={row} direction="row" style={styles.row}>
            <Text style={styles.rowNum} color="secondary.500">
              {row}
            </Text>
            <Flex direction="row">
              {session?.seats
                .filter((s) => s.seat.rowNumber === row)
                .map((s) => (
                  <SessionSeatItem
                    sessionSeat={s}
                    rates={session?.rates}
                    key={s.id}
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
