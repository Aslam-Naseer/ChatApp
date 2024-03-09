import { FlatList, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/src/components/Themed";
import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect } from "expo-router";
import {
  useCreateMessage,
  useMessageSubscription,
  useReadMessages,
} from "@/src/api/messages/create";
import { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export default function TabOneScreen() {
  const { session } = useAuth();
  const { data: fetchedData, isLoading } = useReadMessages();
  const { mutate: sendMsg } = useCreateMessage();
  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();
  useMessageSubscription();

  const sendMessage = () => {
    sendMsg(message);
    setMessage("");
  };

  const fetchedMessages = fetchedData?.map((data) => data.msg);
  console.log(fetchedMessages);

  if (!session) return <Redirect href={"/login"} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="jon@gmail.com"
        style={styles.input}
      />
      <Button text="Send" onPress={sendMessage} disabled={message === ""} />
      <Text>{fetchedData?.length}</Text>
      <FlatList
        data={fetchedMessages}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
