import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { CreditCardInput } from "react-native-credit-card-input-view";
import {
  Text,
  Flex,
  Button,
  Modal,
  View,
  VStack,
  AlertDialog,
} from "native-base";

import {
  CREATE_TICKET,
  DELETE_TICKET,
  PAY_FOR_TICKET,
  GET_SESSION_BY_ID,
  GET_TICKETS_BY_USER_ID,
} from "../../utils/gql";
import {
  selectSession,
  selectSessionSeats,
} from "../../redux/session/session.selector";
import { RootStackScreenProps } from "../../types";
import { SeatType, Ticket } from "../../types/types";
import { selectUser } from "../../redux/user/user.selector";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openSnackbar } from "../../redux/loading/loading.slice";

import Timer from "../../components/timer/timer.component";
import Loader from "../../components/loader/loader.component";
import TicketListItem from "../../components/ticket-list-item/ticket-list-item.component";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayDisabled, setIsPayDisabled] = useState(true);
  const [isTicketPaid, setIsTicketPaid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cancelRef = React.useRef(null);

  const [createTicket, { called: isCreateCalled, loading: isCreateLoading }] =
    useMutation(CREATE_TICKET, {
      update(_, { data: { createTicket: ticketData } }) {
        setTicket(ticketData);
        setIsLoading(false);
      },
      onError(err) {
        Alert.alert("ERROR", JSON.stringify(err));
        setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      refetchQueries: [
        { query: GET_SESSION_BY_ID, variables: { id: session?.id } },
        { query: GET_TICKETS_BY_USER_ID, variables: { userId: user?.id } },
      ],
    });

  const [payForTicket, { loading: isPayLoading }] = useMutation(
    PAY_FOR_TICKET,
    {
      update(_, { data: { payForTicket: ticketData } }) {
        setTicket(ticketData);
        setIsTicketPaid(true);
        dispatch(
          openSnackbar({
            severity: "success",
            message: "Ticket paid successfully!",
          })
        );
      },
      onError(err) {
        Alert.alert("ERROR", JSON.stringify(err));
        setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: { id: ticket?.id, price: ticket?.price },
      refetchQueries: [
        { query: GET_SESSION_BY_ID, variables: { id: session?.id } },
        { query: GET_TICKETS_BY_USER_ID, variables: { userId: user?.id } },
      ],
    }
  );

  const [deleteTicket, { loading: isDeleteLoading }] = useMutation(
    DELETE_TICKET,
    {
      update(_, { data }) {
        dispatch(
          openSnackbar({
            severity: "success",
            message: "Booking stopped successfully!",
          })
        );
        navigation.navigate("Root");
      },
      onError(err) {
        Alert.alert("ERROR", err?.message);
        setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      refetchQueries: [
        { query: GET_SESSION_BY_ID, variables: { id: session?.id } },
        { query: GET_TICKETS_BY_USER_ID, variables: { userId: user?.id } },
      ],
      variables: { id: ticket?.id },
    }
  );

  useEffect(() => {
    if (!user || !session || !selectedSeats.length || isCreateCalled) return;

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
    setShowAlert(true);
  };

  const handleConfirm = () => {
    setShowAlert(false);
    deleteTicket({ variables: { id: ticket?.id } });
  };

  const handleGoHome = () => {
    navigation.navigate("Root");
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const onTimerFinish = () => {
    deleteTicket({ variables: { id: ticket?.id } });
  };

  return user && session && selectedSeats.length ? (
    isCreateLoading || isLoading ? (
      <Loader text="Creating your ticket..." />
    ) : isDeleteLoading ? (
      <Loader text="Deleting your ticket..." />
    ) : isPayLoading ? (
      <Loader text="Performing transaction..." />
    ) : ticket ? (
      <VStack
        style={styles.container}
        justifyContent="space-between"
        height={"100%"}
      >
        {!isTicketPaid ? (
          <>
            <Text
              color="white"
              fontSize={20}
              width="100%"
              textAlign={"center"}
              mb={10}
            >
              Time for payment:
            </Text>
            <Timer onFinish={onTimerFinish} />
          </>
        ) : null}
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
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={showAlert}
          onClose={handleCloseAlert}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Stop booking</AlertDialog.Header>
            <AlertDialog.Body>
              Are you sure you want to stop booking ?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={handleCloseAlert}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={handleConfirm}>
                  Confirm
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </VStack>
    ) : (
      <View style={styles.container}>
        <Flex justifyContent="space-between" height="100%">
          <Text color={"white"}>Oops... Error</Text>
          <Button
            size="lg"
            variant={"outline"}
            colorScheme="secondary"
            style={{ width: "100%" }}
            onPress={handleGoHome}
          >
            Go Home
          </Button>
        </Flex>
      </View>
    )
  ) : null;
}
