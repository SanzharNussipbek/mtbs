import React from "react";
import { Pressable, View, Text } from "native-base";
import { LayoutAnimation, Platform, UIManager } from "react-native";

import { styles } from "./accordion.styles";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  id: number;
  title: string;
  body: string;
  expanded: boolean;
  onToggle: (id: number) => void;
};

const Accordion: React.FC<Props> = ({
  id,
  title,
  body,
  expanded,
  onToggle,
}) => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const handleClick = () => {
    onToggle(id);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.row} onPress={handleClick}>
        <Text color="secondary.500" style={styles.title} isTruncated>
          {title}
        </Text>
        <FontAwesome
          size={20}
          name={expanded ? "chevron-up" : "chevron-down"}
          color={"#db2777"}
        />
      </Pressable>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.child}>
          <Text color="white">{body}</Text>
        </View>
      )}
    </View>
  );
};

export default Accordion;
