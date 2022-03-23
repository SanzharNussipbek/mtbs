import React from "react";
import { format } from "date-fns";
import { Pressable, Text, View } from "native-base";

import { isInOneHour, isInPast } from "../../utils/date";

import { styles } from "./session-time-item.styles";

type Props = {
  datetime: number;
  onClick: () => void;
};

const SessionTimeItem: React.FC<Props> = ({ datetime, onClick }) => {
  const isDisabled = isInPast(datetime) || isInOneHour(datetime);

  const handleClick = () => {
    if (isDisabled) return;
    onClick();
  };

  return (
    <Pressable
      onPress={handleClick}
      style={
        isDisabled
          ? [styles.sessionTimeItem, styles.past]
          : [styles.sessionTimeItem, styles.future]
      }
    >
      <Text color={isDisabled ? "muted.300" : "white"} style={styles.text}>
        {format(new Date(datetime * 1000), "HH:mm")}
      </Text>
      {isDisabled ? null : <View style={styles.circle} />}
    </Pressable>
  );
};

export default SessionTimeItem;
