import React, { useState, useEffect } from "react";
import { Text } from "native-base";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Alert, FlatList, useWindowDimensions } from "react-native";

import { View } from "../Themed";
import { Ticket } from "../../types/types";
import { useAppSelector } from "../../hooks";
import { isInFuture, isInPast } from "../../utils/date";
import { GET_TICKETS_BY_USER_ID } from "../../utils/gql";
import { selectUser } from "../../redux/user/user.selector";

import Loader from "../loader/loader.component";
import TicketListItem from "../ticket-list-item/ticket-list-item.component";

import { styles } from "./ticket-list.styles";

const TicketList: React.FC = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const user = useAppSelector(selectUser);

  const [index, setIndex] = useState(0);
  const [userId, setUserId] = useState(user?.id);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [routes] = useState([
    { key: "first", title: "Upcoming" },
    { key: "second", title: "Used" },
  ]);

  const { called, loading, refetch } = useQuery(GET_TICKETS_BY_USER_ID, {
    onCompleted(data) {
      setTickets(data?.getTicketsByUserId);
    },
    onError(err) {
      Alert.alert("ERROR", err.message);
    },
    variables: {
      userId,
    },
  });

  useEffect(() => {
    if (user) {
      setUserId(user?.id);
      return;
    }
    navigation.navigate("Login");
  }, [user]);

  const UpcomingTicketsRoute = () =>
    called && tickets?.length ? (
      <FlatList
        data={tickets
          .filter((t) => isInFuture(t.session.datetime))
          .sort(function (a, b) {
            return (
              new Date(b.session.datetime * 1000).valueOf() -
              new Date(a.session.datetime * 1000).valueOf()
            );
          })}
        style={styles.list}
        renderItem={({ item, index }) => (
          <TicketListItem ticket={item} key={index} onDelete={onDeleteTicket} />
        )}
        keyExtractor={(ticket: Ticket) => ticket.id}
      />
    ) : (
      <View
        style={{
          justifyContent: "center",
          width: "100%",
          marginTop: 16,
        }}
      >
        <Text
          color="white"
          size="full"
          fontSize={18}
          width="100%"
          textAlign={"center"}
        >
          No upcoming tickets
        </Text>
      </View>
    );

  const UsedTicketsRoute = () =>
    called && tickets?.length ? (
      <FlatList
        data={tickets
          .filter((t) => isInPast(t.session.datetime))
          .sort(function (a, b) {
            return (
              new Date(b.session.datetime * 1000).valueOf() -
              new Date(a.session.datetime * 1000).valueOf()
            );
          })}
        style={styles.list}
        renderItem={({ item, index }) => (
          <TicketListItem ticket={item} key={index} onDelete={onDeleteTicket} />
        )}
        keyExtractor={(ticket: Ticket) => ticket.id}
      />
    ) : (
      <View
        style={{
          justifyContent: "center",
          width: "100%",
          marginTop: 16,
        }}
      >
        <Text
          color="white"
          size="full"
          fontSize={18}
          width="100%"
          textAlign={"center"}
        >
          No used tickets
        </Text>
      </View>
    );

  const onDeleteTicket = (id: string) => {
    setTickets(tickets.filter((t) => t.id !== id));
    refetch();
  };

  return called && loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderScene={SceneMap({
          first: UpcomingTicketsRoute,
          second: UsedTicketsRoute,
        })}
        renderTabBar={(props: any) => (
          <TabBar
            {...props}
            activeColor="#9d174d"
            inactiveColor="#a3a3a3"
            indicatorStyle={{ backgroundColor: "#9d174d" }}
            style={{ backgroundColor: "transparent" }}
          />
        )}
      />
    </View>
  );
};

export default TicketList;
