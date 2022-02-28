import React, { useEffect, useState } from "react";
import { View } from "../Themed";
import { styles } from "./session-list.styles";
import { GET_SESSIONS_BY_MOVIE_ID } from "../../utils/gql";
import { useQuery } from "@apollo/client";
import { Session, Hall } from "../../types/types";
import { Flex, Heading, Text } from "native-base";
import Loader from "../loader/loader.component";
import SessionTimeItem from "../session-time-item/session-time-item.component";

type Props = {
  movieId: string;
};

const SessionList: React.FC<Props> = ({ movieId }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);

  const { loading, error, data } = useQuery(GET_SESSIONS_BY_MOVIE_ID, {
    variables: {
      movieId,
    },
  });

  useEffect(() => {
    if (!error) return;
    console.log(JSON.stringify(error, null, 2));
    // Alert.alert(error.graphQLErrors[0].message);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    const sessions: Session[] = data.getSessionsByMovieId;
    setSessions(sessions);
    setHalls([...new Set(sessions.map((s) => s.hall))]);
  }, [data]);

  const handleClick = (session: Session) => {
    if (new Date(session.datetime * 1000) < new Date()) return;
    console.log(session);
  };

  return loading ? (
    <Loader />
  ) : halls.length > 0 && sessions.length > 0 ? (
    <View style={styles.sessionList}>
      <Heading color={"white"} mb={4} style={styles.title}>
        Sessions
      </Heading>
      <View style={styles.main}>
        {halls.map((hall: Hall) => {
          const hallSessions: Session[] = sessions.filter(
            (s) => s.hall.id === hall.id
          );
          return (
            <Flex direction="column" mb={8} style={styles.group}>
              <Heading
                size="md"
                color={"white"}
                style={styles.groupTitle}
                mb={4}
              >
                {hall.name} hall
              </Heading>
              <Flex direction="row" style={styles.groupBody}>
                {hallSessions.map((session: Session) => (
                  <SessionTimeItem
                    datetime={session.datetime}
                    onClick={() => handleClick(session)}
                  />
                ))}
              </Flex>
            </Flex>
          );
        })}
      </View>
    </View>
  ) : null;
};

export default SessionList;
