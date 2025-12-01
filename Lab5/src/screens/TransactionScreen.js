// src/screens/TransactionScreen.js
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

const TransactionScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const res = await kamiApi.getTransactions();
      setTransactions(res.data || []);
    } catch (error) {
      console.log("Load transactions error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", loadTransactions);
    return unsub;
  }, [navigation]);

  const formatMoney = (value) =>
    `${(value || 0).toLocaleString("vi-VN")} đ`;

  const formatDate = (str) => {
    if (!str) return "";

    if (str.includes("/") && str.includes(":")) return str;
    try {
      const d = new Date(str);
      return d.toLocaleString("vi-VN");
    } catch {
      return str;
    }
  };

  const renderItem = ({ item }) => {
    const code = item.id || item.code || item._id?.slice(-8);
    const dateStr =
      item.dateTime || item.createdAt || item.creationTime || "";
    const isCancelled =
      item.status === "cancelled" ||
      item.status === "Canceled" ||
      item.isCancelled;

    const shortTitle = item.title || item.serviceName || item.note || "Dịch vụ";
    const subTitle =
      item.description ||
      item.shortDescription ||
      "- Gội đầu dưỡng sinh trọn gói tất cả dịch vụ trong 1 combo này";

    const money =
      item.totalPayment ||
      item.total ||
      item.price ||
      item.totalCost ||
      0;

    const customerName =
      item.customer?.name || item.customerName || item.customer || "";

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("TransactionDetail", { id: item._id })
        }
        activeOpacity={0.7}
      >
        <View style={{ flex: 1 }}>
          {/* code + date */}
          <Text style={styles.code}>
            {code} - {formatDate(dateStr)}
            {isCancelled && <Text style={styles.cancelInline}>  -  Cancelled</Text>}
          </Text>

          {/* dòng 1 */}
          <Text style={styles.mainLine}>- {shortTitle}</Text>

          {/* dòng 2 (mô tả) */}
          <Text style={styles.descLine} numberOfLines={1}>
            {subTitle}
          </Text>

          {/* customer */}
          <Text style={styles.customerLine}>Customer: {customerName}</Text>
        </View>

        {/* tiền bên phải */}
        <Text style={styles.amount}>{formatMoney(money)}</Text>
      </TouchableOpacity>
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
      {/* Header custom giống hình */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12, paddingBottom: 80 }}
      />

      {/* Nút + tròn hồng (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {

        }}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",

  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },
  header: {
    height: 70,
    backgroundColor: PINK,
    justifyContent: "center",
    paddingHorizontal: 16,
    elevation: 4,

  },
  headerTitle: {
    marginTop: 25,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  code: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333",
  },
  cancelInline: {
    color: "#e53935",
    fontWeight: "bold",
  },
  mainLine: {
    fontSize: 13,
    color: "#333",
  },
  descLine: {
    fontSize: 12,
    color: "#555",
  },
  customerLine: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  amount: {
    marginLeft: 8,
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#e53935",
  },
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
    marginTop: -3,
  },
});
