import React, { useState } from "react";
import { Heading } from "native-base";
import { useQuery } from "@apollo/client";
import { Alert, ScrollView } from "react-native";

import { Faq } from "../../types/types";
import { GET_ALL_FAQ } from "../../utils/gql";
import { RootStackScreenProps } from "../../types";

import Loader from "../../components/loader/loader.component";
import Accordion from "../../components/accordion/accordion.component";

import { styles } from "./FaqScreen.styles";

export default function FaqScreen(props: RootStackScreenProps<"FAQ">) {
  const [expanded, setExpanded] = useState("");
  const [faqList, setFaqList] = useState<Faq[]>([]);

  const { called, loading } = useQuery(GET_ALL_FAQ, {
    onCompleted(data) {
      setFaqList(data?.getFaqs);
    },
    onError(err) {
      Alert.alert("ERROR", err.message);
    },
  });

  const handleToggle = (id: string) => {
    setExpanded(expanded === id ? "" : id);
  };

  return (
    <ScrollView style={styles.container}>
      <Heading textAlign="center" color="secondary.500" mb={4}>
        FAQ
      </Heading>
      {called && loading ? (
        <Loader />
      ) : (
        faqList.map(({ id, title, body }, index) => (
          <Accordion
            key={index}
            id={id}
            title={title}
            body={body}
            onToggle={handleToggle}
            expanded={expanded === id}
          />
        ))
      )}
    </ScrollView>
  );
}
