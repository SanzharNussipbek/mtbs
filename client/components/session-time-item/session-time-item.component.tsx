import React from "react";
import { format } from "date-fns";
import { Pressable, Text, View } from "native-base";

import { styles } from "./session-time-item.styles";

type Props = {
  datetime: number;
  onClick: () => void;
};

const SessionTimeItem: React.FC<Props> = ({ datetime, onClick }) => {
  const inFuture = new Date(datetime * 1000) > new Date();
  return (
    <Pressable
      onPress={onClick}
      style={
        inFuture
          ? [styles.sessionTimeItem, styles.future]
          : [styles.sessionTimeItem, styles.past]
      }
    >
      <Text color={inFuture ? "white" : "muted.300"} style={styles.text}>
        {format(new Date(datetime * 1000), "HH:mm")}
      </Text>
      {inFuture ? <View style={styles.circle} /> : null}
    </Pressable>
  );
};

export default SessionTimeItem;
