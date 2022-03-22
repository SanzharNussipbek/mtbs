import React from "react";
import CountDown from "react-native-countdown-component";
import { SafeAreaView, StyleSheet, View } from "react-native";

type Props = {
  onFinish: () => void;
  duration?: number;
};

const Timer: React.FC<Props> = ({ onFinish, duration }) => {
  const totalDuration = duration ?? 300;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CountDown
          until={totalDuration}
          timeToShow={["M", "S"]}
          onFinish={onFinish}
          size={25}
          showSeparator
          digitStyle={{
            backgroundColor: "#be185d",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Timer;
