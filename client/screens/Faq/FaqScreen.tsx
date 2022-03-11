import React, { useState, useEffect } from "react";
import { Alert, ScrollView } from "react-native";
import { Heading, Text, View } from "native-base";

import { RootStackScreenProps } from "../../types";

import { styles } from "./FaqScreen.styles";
import Accordion from "../../components/accordion/accordion.component";
import { Faq } from "../../types/types";
import { GET_FAQS } from "../../utils/gql";
import { useQuery } from "@apollo/client";
import Loader from "../../components/loader/loader.component";

const list = [
  {
    id: 1,
    title: "Title 1",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quis, quod, suscipit ut nisi necessitatibus facere, ipsa vero eos modi error ullam perspiciatis dolore et doloremque dolorum aliquid odit a.",
  },
  {
    id: 2,
    title: "Title 2",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quis, quod, suscipit ut nisi necessitatibus facere, ipsa vero eos modi error ullam perspiciatis dolore et doloremque dolorum aliquid odit a.",
  },
  {
    id: 3,
    title: "Title 3",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quis, quod, suscipit ut nisi necessitatibus facere, ipsa vero eos modi error ullam perspiciatis dolore et doloremque dolorum aliquid odit a.",
  },
];

export default function FaqScreen(props: RootStackScreenProps<"FAQ">) {
  const [expanded, setExpanded] = useState("");
  const [faqList, setFaqList] = useState<Faq[]>([]);

  const { loading, error, data } = useQuery(GET_FAQS, {
    onError(err) {
      Alert.alert("ERROR", err.message);
    },
  });

  useEffect(() => {
    if (!data) return;
    setFaqList(data?.getFaqs);
  }, [data]);

  const handleToggle = (id: string) => {
    setExpanded(expanded === id ? "" : id);
  };

  return (
    <ScrollView style={styles.container}>
      <Heading textAlign="center" color="secondary.500" mb={4}>
        FAQ
      </Heading>
      {loading ? (
        <Loader />
      ) : (
        faqList.map(({ id, title, body }) => (
          <Accordion
            key={id}
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
