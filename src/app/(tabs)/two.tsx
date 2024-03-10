import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { router } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";

export default function TabTwoScreen() {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  setTimeout(() => {
    if (!session) router.navigate("/login");
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{profile?.email || "Hello User"}</Text>
      <Pressable onPress={() => supabase.auth.signOut()}>
        <Text style={styles.textButton}>Sign out</Text>
      </Pressable>
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
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
