import React from "react";
import { ScrollView} from "react-native";

import { RootStackScreenProps } from "../../types";
import { Session } from "../../types/types";

import NotFoundScreen from "../NotFoundScreen";
import SessionSeatList from "../../components/session-seat-list/session-seat-list.componenent";
import SessionPageHeader from "../../components/session-page-header/session-page-header.component";

import { styles } from "./SessionScreen.styles";

export default function SessionScreen(props: RootStackScreenProps<"Session">) {
  const session: Session = props?.route?.params?.session;

  return session ? (
    <ScrollView style={styles.container}>
      <SessionPageHeader session={session} />
      <SessionSeatList sessionSeats={session.seats} />
    </ScrollView>
  ) : (
    NotFoundScreen
  );
}
