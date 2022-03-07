import { Flex, HStack, Text, VStack } from "native-base";
import React from "react";
import { View } from "react-native";

import { SessionSeat } from "../../types/types";
import SessionSeatItem from "../session-seat-item/session-seat-item.componenent";
import { styles } from "./session-seat-list.styles";

type Props = {
  sessionSeats: SessionSeat[];
};

const SessionSeatList: React.FC<Props> = ({ sessionSeats }) => {
  const rows = [
    ...new Set(sessionSeats.map((s) => s.seat.rowNumber).sort((a, b) => a - b)),
  ];
  return (
    <View style={styles.container}>
      <VStack>
        {rows.map((row) => (
          <Flex key={row} direction="row" style={styles.row}>
            <Text style={styles.rowNum} color="secondary.500">
              {row}
            </Text>
            <Flex direction="row">
              {sessionSeats
                .filter((s) => s.seat.rowNumber === row)
                .map((s) => (
                  <SessionSeatItem sessionSeat={s} key={s.id} />
                ))}
            </Flex>
          </Flex>
        ))}
      </VStack>
    </View>
  );
};

export default SessionSeatList;
