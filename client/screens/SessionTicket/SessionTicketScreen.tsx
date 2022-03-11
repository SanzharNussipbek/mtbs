import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { Text, Flex, Button, Modal, View, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { CreditCardInput } from "react-native-credit-card-input-view";
import SnackBar from "react-native-snackbar-component";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootStackScreenProps } from "../../types";
import { SeatType, Session, SessionSeat, Ticket } from "../../types/types";
import {
  CREATE_TICKET_MUTATION,
  DELETE_TICKET_BY_ID,
  GET_TICKET_BY_ID,
  PAY_FOR_TICKET_MUTATION,
  UPDATE_SESSION_SEATS_MUTATION,
} from "../../utils/gql";
import Loader from "../../components/loader/loader.component";
import { selectUser } from "../../redux/user/user.selector";
import {
  selectSession,
  selectSessionSeats,
} from "../../redux/session/session.selector";

import { styles } from "./SessionTicketScreen.styles";
import TicketListItem from "../../components/ticket-list-item/ticket-list-item.component";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayDisabled, setIsPayDisabled] = useState(true);
  const [isTicketPaid, setIsTicketPaid] = useState(false);

  const {
    loading: isGetLoading,
    error,
    data: getTicketData,
  } = useQuery(GET_TICKET_BY_ID, {
    onError(err) {
      Alert.alert("ERROR", err.message);
    },
    variables: { id: "622766e2f7a5526ecedefa25" },
  });

  // useEffect(() => {
  //   if (!getTicketData) return;
  //   setTicket(getTicketData.getTicket);
  // }, [getTicketData]);

  const [createTicket, { loading: isCreateLoading }] = useMutation(
    CREATE_TICKET_MUTATION,
    {
      update(_, { data: { createTicket: ticketData } }) {
        setTicket(ticketData);
      },
      onError(err) {
        Alert.alert("ERROR", JSON.stringify(err));
        setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
    }
  );

  const [payForTicket, { loading: isPayLoading }] = useMutation(
    PAY_FOR_TICKET_MUTATION,
    {
      update(_, { data: { payForTicket: ticketData } }) {
        setTicket(ticketData);
        setIsTicketPaid(true);
      },
      onError(err) {
        Alert.alert("ERROR", JSON.stringify(err));
        setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: { id: ticket?.id, price: ticket?.price },
    }
  );

  const [deleteTicket, { loading: isDeleteLoading }] = useMutation(
    DELETE_TICKET_BY_ID,
    {
      update(_, { data }) {
        Alert.alert("Success", "You ticket is deleted!");
      },
      onError(err) {
        Alert.alert("ERROR", err?.message);
        setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: { id: ticket?.id },
    }
  );

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardInput = (data: any) => {
    setIsPayDisabled(
      data?.status?.cvc !== "valid" ||
        data?.status?.number !== "valid" ||
        data?.status?.expiry !== "valid" ||
        !data.valid
    );
  };

  const handlePayment = () => {
    toggleModal();
    payForTicket({ variables: { id: ticket?.id, price: ticket?.price } });
  };

  const handleCancel = () => {
    deleteTicket({ variables: { id: ticket?.id } });
  };

  const handleGoHome = () => {
    navigation.navigate("Root");
  };

  return user && session && selectedSeats.length ? (
    isCreateLoading || isDeleteLoading || isPayLoading || isGetLoading ? (
      <Loader />
    ) : ticket ? (
      <VStack
        style={styles.container}
        justifyContent="space-between"
        height={"100%"}
      >
        <Flex justifyContent={"center"} alignItems="center" height={"80%"}>
          <TicketListItem ticket={ticket} hideActions />
        </Flex>
        {isTicketPaid ? (
          <Button
            size="lg"
            variant={"outline"}
            colorScheme="secondary"
            style={{ width: "100%" }}
            onPress={handleGoHome}
          >
            Go Home
          </Button>
        ) : (
          <Button.Group direction="column">
            <Button
              size="lg"
              variant={"solid"}
              colorScheme="secondary"
              style={{ width: "100%" }}
              onPress={toggleModal}
            >
              Make payment
            </Button>
            <Button
              size="lg"
              variant={"outline"}
              colorScheme="blueGray"
              style={{ width: "100%" }}
              onPress={handleCancel}
            >
              Cancel
            </Button>
          </Button.Group>
        )}
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <Modal.Content style={{ width: "100%" }}>
            <Modal.CloseButton />
            <Modal.Header>Make payment</Modal.Header>
            <Modal.Body>
              <View style={styles.card}>
                <CreditCardInput
                  allowScroll
                  cardFontFamily={null}
                  onChange={handleCardInput}
                />
              </View>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={toggleModal}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                colorScheme={isPayDisabled ? "blueGray" : "secondary"}
                onPress={handlePayment}
                disabled={isPayDisabled}
              >
                Pay
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <SnackBar
          position="top"
          autoHidingTime={3000}
          visible={isTicketPaid}
          backgroundColor={"#22c55e"}
          textMessage={"Ticket paid successfully!"}
        />
      </VStack>
    ) : (
      <View style={styles.container}>
        <Text color={"white"}>Oops...</Text>
      </View>
    )
  ) : null;
}
