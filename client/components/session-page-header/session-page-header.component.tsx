import React from "react";
import { format } from "date-fns";
import { Flex, Text, View } from "native-base";

import { Session } from "../../types/types";

import { styles } from "./session-page-header.styles";

type Props = {
  session: Session;
};

const SessionPageHeader: React.FC<Props> = ({ session }) => {
  const date = new Date(
    new Date(session.datetime * 1000).toLocaleString("en-US", {
      timeZone: "Asia/Hong_Kong",
    })
  );

  return (
    <View style={styles.container} mb={4}>
      <Flex alignItems={"center"}>
        <Text
          fontSize={24}
          fontWeight="bold"
          color={
            session.hall.name === "Green" ? "emerald.300" : "secondary.700"
          }
          mb={2}
          textTransform="uppercase"
        >{`${session.hall.name} hall`}</Text>
        <Text
          fontSize={24}
          fontWeight="bold"
          color="white"
          mb={2}
          textTransform="uppercase"
        >
          {session.movie.name}
        </Text>
        <Text fontSize={16} color="secondary.300" mb={2}>
          {format(date, "dd.MM.yyyy")}
        </Text>
        <Text fontSize={16} color="secondary.300" mb={3}>
          {format(date, "HH:mm")}
        </Text>
        <Text fontSize={12} color="muted.300" mb={1}>
          Screen
        </Text>
        <View style={styles.screen} />
      </Flex>
    </View>
  );
};

export default SessionPageHeader;
