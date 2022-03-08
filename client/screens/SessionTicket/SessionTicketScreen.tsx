import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { useMutation } from "@apollo/client";
import { Text, Flex, Button, Modal, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootStackScreenProps } from "../../types";
import { SeatType, Session, SessionSeat, Ticket } from "../../types/types";
import {
  CREATE_TICKET_MUTATION,
  UPDATE_SESSION_SEATS_MUTATION,
} from "../../utils/gql";
import Loader from "../../components/loader/loader.component";
import { selectUser } from "../../redux/user/user.selector";
import {
  selectSession,
  selectSessionSeats,
} from "../../redux/session/session.selector";

import NotFoundScreen from "../NotFoundScreen";

import { styles } from "./SessionTicketScreen.styles";

export default function SessionTicketScreen(
  props: RootStackScreenProps<"SessionTicket">
) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const user = useAppSelector(selectUser);
  const session = useAppSelector(selectSession);
  const selectedSeats = useAppSelector(selectSessionSeats);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const [errors, setErrors] = useState<any>(null);
  const [createTicket, { loading }] = useMutation(CREATE_TICKET_MUTATION, {
    update(_, { data: { createTicket: ticketData } }) {
      setTicket(ticketData);
    },
    onError(err) {
      Alert.alert("ERROR", JSON.stringify(err));
    },
  });

  useEffect(() => {
    if (!user || !session || !selectedSeats.length) return;

    const seatIds = selectedSeats.map((s) => s.id);

    let price = 0;
    for (let i = 0; i < selectedSeats.length; i++) {
      const rate: SeatType | "" = selectedSeats[i].type;
      if (rate === "") continue;
      const seatPrice = session?.rates[rate];
      if (!seatPrice) return;
      price += seatPrice;
    }

    const createTicketData = {
      sessionId: session?.id,
      seatIds: seatIds,
      userId: user.id,
      price: price,
    };
    createTicket({ variables: createTicketData });
  }, [user, selectedSeats, session]);

  return user && session && selectedSeats.length ? (
    loading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        <Text color={"white"}>Session: {session.id}</Text>
        <Text color={"white"}>
          Seats: {selectedSeats.map((s) => s.seat.seatNumber).join(", ")}
        </Text>
      </View>
    )
  ) : null;
}
