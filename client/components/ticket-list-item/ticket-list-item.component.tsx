import React, { useState } from "react";
import { format } from "date-fns";
import { Skeleton, Text } from "native-base";
import { TouchableOpacity, Image } from "react-native";

import { View } from "../Themed";
import { Ticket } from "../../types/types";

import { styles } from "./ticket-list-item.styles";

type Props = {
  ticket: Ticket;
};

const TicketListItem: React.FC<Props> = ({ ticket }) => {
  const [loading, setLoading] = useState(true);

  const onPress = () => {};

  return ticket ? (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.ticket}>
        {loading ? (
          <View style={styles.skeletonContainer}>
            <Skeleton style={styles.skeleton} />
          </View>
        ) : null}
        <Image
          style={styles.img}
          source={{ uri: ticket?.session?.movie?.imgUrl, cache: "force-cache" }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onLoad={() => setLoading(false)}
        />
      </View>
      <View style={styles.text}>
        <Text style={styles.title} isTruncated color="white">
          {ticket?.session?.movie?.name}
        </Text>
        <Text style={styles.body} noOfLines={4} isTruncated color="white">
          {`Date & Time: ${format(
            new Date(ticket.session.datetime * 1000),
            "dd.MM.yyyy HH:mm"
          )}`}
        </Text>
        <Text style={styles.body} noOfLines={4} isTruncated color="white">
          {`Hall: ${ticket.session.hall.name}`}
        </Text>
        <Text style={styles.body} noOfLines={4} isTruncated color="white">
          {`Seats: ${ticket.seats.map((s) => s.seat.seatNumber).join(", ")}`}
        </Text>
      </View>
      <View style={styles.circle} />
      <View style={styles.endCircle} />
    </TouchableOpacity>
  ) : null;
};

export default TicketListItem;
