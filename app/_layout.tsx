import { Stack } from "expo-router";
import { Button, Text, TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "CSV File Export",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}