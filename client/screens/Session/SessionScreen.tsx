import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Alert, ScrollView } from "react-native";
import { Text, Flex, Button, Modal } from "native-base";
import { useNavigation } from "@react-navigation/native";

import {
  updateSession,
  updateSessionSeats,
} from "../../redux/session/session.actions";
import { useAppDispatch } from "../../hooks";
import { RootStackScreenProps } from "../../types";
import { GET_SESSION_BY_ID } from "../../utils/gql";
import { SeatType, Session, SessionSeat } from "../../types/types";

import Loader from "../../components/loader/loader.component";
import SessionSeatList from "../../components/session-seat-list/session-seat-list.componenent";
import SessionPageHeader from "../../components/session-page-header/session-page-header.component";

import { styles } from "./SessionScreen.styles";

export default function SessionScreen(props: RootStackScreenProps<"Session">) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const id = props?.route?.params?.id;

  const [showModal, setShowModal] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<SessionSeat[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [session, setSession] = useState<Session | null>(null);

  const { called, loading } = useQuery(GET_SESSION_BY_ID, {
    onCompleted(data) {
      setSession(data?.getSession);
    },
    onError(err) {
      Alert.alert("ERROR", err.message);
    },
    variables: { id: id },
  });

  useEffect(() => {
    dispatch(updateSession(session));
  }, [session]);

  const handleSelectSeats = (seats: SessionSeat[]) => {
    setSelectedSeats(seats);
  };

  const handleNext = () => {
    setSelectedSeats(
      selectedSeats.sort((a, b) => a.seat.seatNumber - b.seat.seatNumber)
    );
    let price = 0;
    for (let i = 0; i < selectedSeats.length; i++) {
      const rate: SeatType | "" = selectedSeats[i].type;
      if (rate === "") continue;
      const seatPrice = session?.rates[rate];
      if (!seatPrice) return;
      price += seatPrice;
    }
    setTotalPrice(price);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    setShowModal(false);
    dispatch(updateSessionSeats(selectedSeats));
    navigation.navigate("SessionTicket");
  };

  return called && loading ? (
    <Loader />
  ) : session ? (
    <Flex
      flex={1}
      height="100%"
      justifyContent={"space-between"}
      paddingBottom={16}
    >
      <ScrollView style={styles.container}>
        <SessionPageHeader session={session} />
        <SessionSeatList session={session} onChange={handleSelectSeats} />
      </ScrollView>
      {selectedSeats?.length > 0 ? (
        <Button colorScheme="secondary" onPress={handleNext}>
          Next
        </Button>
      ) : null}
      <Modal isOpen={showModal} onClose={handleCancel}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Please confirm selection:</Modal.Header>
          <Modal.Body>
            {selectedSeats.map((s, index) => (
              <Text key={index} mb={4} color="black">
                {`Row: ${s.seat.rowNumber}, Seat: ${s.seat.seatNumber}, Rate: ${s.type}`}
              </Text>
            ))}
            <Text mb={4} color="black">
              {`Total: HK$${totalPrice}`}
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                colorScheme="secondary"
                onPress={handleConfirm}
              >
                Confirm
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Flex>
  ) : null;
}
