import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { UsageEntry } from "./types";

export default function CSVFile() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [usageData, setUsageData] = useState<UsageEntry[]>([]);

  useEffect(() => {
    setStartTime(Date.now());
    return () => {
      logUsageTime();
    };
  }, []);

  const logUsageTime = () => {
    if (!startTime) return;
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    setUsageData((prevData) => [...prevData, { startTime, endTime, duration }]);
  };

  const exportToCSV = async () => {
    logUsageTime();

    setTimeout(async () => {
      if (usageData.length === 0) {
        Alert.alert("No usage data available");
        return;
      }

      const csvData =
        "Start Time,End Time,Duration (seconds)\n" +
        usageData
          .map(
            ({ startTime, endTime, duration }) =>
              `${new Date(startTime).toISOString()},${new Date(
                endTime
              ).toISOString()},${duration}`
          )
          .join("\n");

      const fileUri = FileSystem.documentDirectory + "usage_data.csv";
      await FileSystem.writeAsStringAsync(fileUri, csvData, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Sharing is not available on this device");
      }
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Usage Tracker</Text>
      <Button title="Export Usage Data" onPress={exportToCSV} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});