// src/screens/CustomerScreen.js
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { kamiApi } from "../api/kamiApi";

const PINK = "#f25287";

const CustomerScreen = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await kamiApi.getCustomers();
      setCustomers(res.data || []);
    } catch (error) {
      console.log("Load customers error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", loadCustomers);
    return unsub;
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Customer: {item.name}</Text>
          <Text style={styles.info}>Phone: {item.phone}</Text>
          <Text style={styles.info}>Total money: 0 đ</Text>
        </View>

        <View style={styles.tag}>
          <Text style={styles.tagText}>Guest</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PINK} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔥 HEADER GIỐNG TRANSACTION */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer</Text>
      </View>

      <FlatList
        data={customers}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12, paddingBottom: 80 }}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddCustomer")}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf1f4",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ----------------- HEADER ----------------- */
  header: {
    height: 70,
    backgroundColor: PINK,
    justifyContent: "center",
    paddingHorizontal: 16,
    elevation: 4,
  },
  headerTitle: {
    paddingTop:20,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  /* ----------------- CARD -------------------- */
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  info: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  /* ----------------- TAG -------------------- */
  tag: {
    backgroundColor: "#ffc9d7",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    color: PINK,
    fontWeight: "bold",
  },

  /* ----------------- FAB -------------------- */
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PINK,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 30,
    marginTop: -4,
  },
});
