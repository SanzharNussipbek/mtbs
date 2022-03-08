import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Heading, Text, View } from "native-base";

import { RootStackScreenProps } from "../../types";

import { styles } from "./FaqScreen.styles";
import Accordion from "../../components/accordion/accordion.component";

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
  const [expanded, setExpanded] = useState(0);

  const handleToggle = (id: number) => {
    setExpanded(expanded === id ? 0 : id);
  };

  return (
    <ScrollView style={styles.container}>
      <Heading textAlign="center" color="secondary.500" mb={4}>
        FAQ
      </Heading>
      {list.map(({ id, title, body }) => (
        <Accordion
          key={id}
          id={id}
          title={title}
          body={body}
          onToggle={handleToggle}
          expanded={expanded === id}
        />
      ))}
    </ScrollView>
  );
}
