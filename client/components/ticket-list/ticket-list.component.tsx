import React, { useState, useEffect } from "react";
import { Alert, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { View } from "../Themed";
import { Ticket } from "../../types/types";
import { useAppSelector } from "../../hooks";
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

  const { loading, error, data } = useQuery(GET_TICKETS_BY_USER_ID, {
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

  useEffect(() => {
    if (!error) return;
    Alert.alert("ERROR", error?.message);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    setTickets(data?.getTicketsByUserId);
  }, [data]);

  const UpcomingTicketsRoute = () => (
    <FlatList
      data={tickets
        .filter(
          (t) =>
            new Date(t.session.datetime * 1000).valueOf() > new Date().valueOf()
        )
        .sort(function (a, b) {
          return (
            new Date(b.session.datetime * 1000).valueOf() -
            new Date(a.session.datetime * 1000).valueOf()
          );
        })}
      style={styles.list}
      renderItem={({ item, index }) => (
        <TicketListItem ticket={item} key={index} />
      )}
      keyExtractor={(ticket: Ticket) => ticket.id}
    />
  );

  const UsedTicketsRoute = () => (
    <FlatList
      data={tickets
        .filter(
          (t) =>
            new Date(t.session.datetime * 1000).valueOf() < new Date().valueOf()
        )
        .sort(function (a, b) {
          return (
            new Date(b.session.datetime * 1000).valueOf() -
            new Date(a.session.datetime * 1000).valueOf()
          );
        })}
      style={styles.list}
      renderItem={({ item, index }) => (
        <TicketListItem ticket={item} key={index} />
      )}
      keyExtractor={(ticket: Ticket) => ticket.id}
    />
  );

  return loading ? (
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
