import { StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect } from "expo-router";
import { useCreateMessage, useReadMessages } from "@/src/api/messages/create";
import { useState } from "react";
import Button from "@/src/components/Button";

export default function TabOneScreen() {
  const { session } = useAuth();
  const { data: fetchedMessages, isLoading } = useReadMessages();
  const { mutate: sendMsg } = useCreateMessage();
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    sendMsg(message);
    setMessage("");
  };

  console.log("hii", session?.user.email);
  console.log(fetchedMessages);

  setTimeout(() => {
    if (!session) return <Redirect href={"/login"} />;
  }, 0);

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
