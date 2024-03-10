import { StyleSheet, Text, View, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { useAuth } from "../providers/AuthProvider";

function formatAMPM(date: Date) {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function formatMail(mail: string) {
  const pivot = mail.indexOf("@");
  return mail.substring(0, pivot);
}

export default function (item: any) {
  const colorScheme = useColorScheme();
  const { profile } = useAuth();

  const {
    message: msg,
    sender: { email: sender },
    time: timeString,
  } = item;

  const time = formatAMPM(new Date(timeString));
  const username = formatMail(sender);
  const isSend = sender === profile?.email;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: isSend ? "row-reverse" : "row",
      flex: 1,
    },
    bubble: {
      maxWidth: "80%",
      display: "flex",
      flexDirection: "column",
      paddingHorizontal: 10,
      marginHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 10,
      borderBottomLeftRadius: 0,
      backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
    },
    bubbleSelf: {
      maxWidth: "80%",
      display: "flex",
      flexDirection: "column",
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginHorizontal: 5,
      borderRadius: 10,
      borderBottomRightRadius: 0,
      backgroundColor: Colors[colorScheme ?? "light"].fontBackground,
    },
    username: {
      fontSize: 14,
      fontWeight: "700",
      color: Colors[colorScheme ?? "light"].inputColor,
    },
    message: {
      fontSize: 16,
      color: isSend ? "#fff" : Colors[colorScheme ?? "light"].text,
    },
    time: {
      alignSelf: "flex-end",
      padding: 5,
      fontSize: 10,
      color: Colors[colorScheme ?? "light"].inputColor,
    },
  });

  return (
    <View style={styles.container}>
      <View style={isSend ? styles.bubbleSelf : styles.bubble}>
        {isSend ? null : <Text style={styles.username}>{username}</Text>}
        <Text style={styles.message}>{msg}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}
