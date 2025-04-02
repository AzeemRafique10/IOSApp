import { View, Text, StyleSheet } from "react-native";
import CSVFile from "./CSV/csv";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CSVFile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});