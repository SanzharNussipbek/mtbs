import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Alert, useWindowDimensions } from "react-native";
import { Flex, Heading, HStack, Switch, Text } from "native-base";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { View } from "../Themed";
import { Session, Hall } from "../../types/types";
import { GET_SESSIONS_BY_MOVIE_ID } from "../../utils/gql";

import Loader from "../loader/loader.component";
import SessionTimeItem from "../session-time-item/session-time-item.component";

import { styles } from "./session-list.styles";

type Props = {
  movieId: string;
};

const SessionList: React.FC<Props> = ({ movieId }) => {
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  const [routes] = useState([
    { key: "first", title: "Today" },
    { key: "second", title: "Tomorrow" },
  ]);

  const { called, loading, error, data } = useQuery(GET_SESSIONS_BY_MOVIE_ID, {
    onError(err) {
      Alert.alert("ERROR", err.message);
    },
    variables: {
      movieId,
    },
  });

  useEffect(() => {
    if (!error) return;
    Alert.alert("ERROR", error?.message);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    const sessions: Session[] = data.getSessionsByMovieId;
    setSessions(sessions);
    setHalls([...new Set(sessions.map((s) => s.hall))]);
  }, [data]);

  const handleClick = (session: Session) => {
    if (new Date(session.datetime * 1000) < new Date()) return;
    navigation.navigate("Session", { id: session?.id });
  };

  const handleToggleSwitch = () => {
    setChecked((value) => !value);
  };

  useEffect(() => {
    if (checked) {
      setSessions(sessions.filter((s) => s.hall.name === "Green"));
    } else {
      if (!data) return;
      setSessions(data.getSessionsByMovieId);
    }
  }, [checked]);

  return called && loading ? (
    <Loader />
  ) : (
    <View style={styles.sessionList}>
      <View style={styles.header}>
        <Heading color={"white"} style={styles.title}>
          Sessions
        </Heading>
        <HStack alignItems="center" space={2}>
          {checked ? <Text color={"emerald.300"}>COVID Free</Text> : null}
          <Switch
            size={"sm"}
            colorScheme={"emerald"}
            offTrackColor={"#a7f3d0"}
            isChecked={checked}
            onToggle={handleToggleSwitch}
          />
        </HStack>
      </View>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderScene={SceneMap({
          first: () => null,
          second: () => null,
        })}
        renderTabBar={(props: any) => (
          <TabBar
            {...props}
            activeColor="#9d174d"
            inactiveColor="#a3a3a3"
            indicatorStyle={{ backgroundColor: "#9d174d" }}
            style={{ backgroundColor: "transparent", marginBottom: 16 }}
          />
        )}
      />
      <View style={styles.main}>
        {sessions.filter((s) =>
          index === 0
            ? format(new Date(s.datetime * 1000), "dd.MM.yyyy") ===
              format(new Date(), "dd.MM.yyyy")
            : format(new Date(s.datetime * 1000), "dd.MM.yyyy") ===
              format(new Date().setDate(new Date().getDate() + 1), "dd.MM.yyyy")
        )?.length ? (
          halls.map((hall: Hall) => {
            const hallSessions: Session[] = sessions
              .filter((s) =>
                index === 0
                  ? s.hall.id === hall.id &&
                    format(new Date(s.datetime * 1000), "dd.MM.yyyy") ===
                      format(new Date(), "dd.MM.yyyy")
                  : s.hall.id === hall.id &&
                    format(new Date(s.datetime * 1000), "dd.MM.yyyy") ===
                      format(
                        new Date().setDate(new Date().getDate() + 1),
                        "dd.MM.yyyy"
                      )
              )
              .sort(function (a, b) {
                return a.datetime - b.datetime;
              });
            return hallSessions?.length ? (
              <Flex
                direction="column"
                mb={8}
                style={styles.group}
                key={hall.id}
              >
                <Heading
                  size="sm"
                  color={hall.type === "Green" ? "emerald.300" : "white"}
                  style={styles.groupTitle}
                  mb={4}
                >
                  {`${hall.name} hall (${hall.type})`}
                </Heading>
                <Flex direction="row" style={styles.groupBody}>
                  {hallSessions.map((session: Session) => (
                    <SessionTimeItem
                      key={session.id}
                      datetime={session.datetime}
                      onClick={() => handleClick(session)}
                    />
                  ))}
                </Flex>
              </Flex>
            ) : null;
          })
        ) : (
          <Heading size="sm" color={"muted.300"} mb={4} textAlign="center">
            {`No ${checked ? "COVID Free " : ""}sessions ${
              index === 0 ? "today" : "tomorrow"
            }`}
          </Heading>
        )}
      </View>
    </View>
  );
};

export default SessionList;
