import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";

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
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import MessageBubble from "@/src/components/MessageBubble";

export default function TabOneScreen() {
  const { session } = useAuth();
  const colorScheme = useColorScheme();
  const { data: fetchedData, isLoading } = useReadMessages();
  const { mutate: sendMsg } = useCreateMessage();
  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();
  useMessageSubscription();

  const sendMessage = () => {
    if (!message) return;
    sendMsg(message);
    setMessage("");
  };

  if (!session) return <Redirect href={"/login"} />;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.messagesContainer}>
        <FlatList
          data={fetchedData}
          renderItem={(data) => (
            <MessageBubble
              message={data.item.msg}
              sender={data.item.sender}
              time={data.item.created_at}
            />
          )}
          contentContainerStyle={{
            gap: 10,
            backgroundColor: Colors[colorScheme ?? "light"].chatBackground,
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={{
            ...styles.input,
            backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
            color: Colors[colorScheme ?? "dark"].inputColor,
          }}
        />
        <Pressable onPress={sendMessage}>
          <FontAwesome
            name="send-o"
            size={24}
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].fontBackground,
              ...styles.fonticon,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderColor: "red",
    borderWidth: 2,
    marginHorizontal: 10,
  },
  messagesContainer: {
    marginBottom: 50,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  fonticon: {
    color: "white",
    padding: 10,
    borderRadius: 5,
    textAlignVertical: "center",
    margin: 1,
    height: "95%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 1,
  },
});
