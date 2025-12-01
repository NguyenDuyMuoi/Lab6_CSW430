// src/screens/TransactionDetailScreen.js
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { kamiApi } from "../api/kamiApi";

const PINK = "#f25287";

const TransactionDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDetail = async () => {
    try {
      setLoading(true);
      const res = await kamiApi.getTransactionById(id);
      setTransaction(res.data);
    } catch (error) {
      console.log("Load detail error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [id]);

  const formatMoney = (value) =>
    `${(value || 0).toLocaleString("vi-VN")} đ`;

  const formatDate = (str) => {
    if (!str) return "";
    if (str.includes("/") && str.includes(":")) return str;
    try {
      return new Date(str).toLocaleString("vi-VN");
    } catch {
      return str;
    }
  };

  if (loading || !transaction) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PINK} />
      </View>
    );
  }

  const services = transaction.services || [];
  const servicesTotal = services.reduce(
    (sum, s) => sum + (s.price || 0) * (s.quantity || 1),
    0
  );

  const amount =
    transaction.amount ||
    transaction.totalAmount ||
    transaction.price ||
    transaction.totalCost ||
    servicesTotal;

  const discount = transaction.discount || 0;
  const totalPayment = amount - discount;

  const code = transaction.id || transaction.code || transaction._id?.slice(-8);
  const customerName =
    transaction.customer?.name ||
    transaction.customerName ||
    transaction.customer ||
    "";
  const customerPhone =
    transaction.customer?.phone || transaction.customerPhone || "";
  const dateStr =
    transaction.dateTime ||
    transaction.createdAt ||
    transaction.creationTime ||
    "";

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* General information */}
        <Text style={styles.sectionTitle}>General information</Text>
        <View style={styles.card}>
          <Row label="Transaction code" value={code} />
          <Row
            label="Customer"
            value={`${customerName}${customerPhone ? " - " + customerPhone : ""}`}
          />
          <Row label="Creation time" value={formatDate(dateStr)} />
        </View>

        {/* Services list */}
        <Text style={styles.sectionTitle}>Services list</Text>
        <View style={styles.card}>
          {services.map((s, index) => (
            <View key={index} style={styles.serviceRow}>
              <Text style={styles.serviceName}>{s.name}</Text>
              <Text style={styles.serviceQty}>x{s.quantity || 1}</Text>
              <Text style={styles.servicePrice}>
                {formatMoney(s.price || 0)}
              </Text>
            </View>
          ))}

          {/* Total row */}
          <View style={styles.serviceRow}>
            <Text style={[styles.serviceName, { fontWeight: "bold" }]}>
              Total
            </Text>
            <Text style={styles.serviceQty} />
            <Text style={[styles.servicePrice, { fontWeight: "bold" }]}>
              {formatMoney(servicesTotal)}
            </Text>
          </View>
        </View>

        {/* Cost */}
        <Text style={styles.sectionTitle}>Cost</Text>
        <View style={styles.card}>
          <Row label="Amount of money" value={formatMoney(amount)} />
          <Row label="Discount" value={formatMoney(discount)} />
        </View>

        {/* Total payment */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total payment</Text>
          <Text style={styles.totalValue}>{formatMoney(totalPayment)}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "f6f6f6ff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6ff",
  },
  content: {
    backgroundColor:"PINK",
    padding: 12,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e53935",
    marginTop: 10,
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  rowLabel: {
    fontSize: 13,
    color: "#555",
  },
  rowValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222",
    textAlign: "right",
    flexShrink: 1,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  serviceName: {
    flex: 1,
    fontSize: 13,
    color: "#333",
  },
  serviceQty: {
    width: 30,
    textAlign: "center",
    fontSize: 12,
    color: "#333",
  },
  servicePrice: {
    minWidth: 90,
    textAlign: "right",
    fontSize: 12, // nhỏ hơn chút để không xuống dòng
    color: "#333",
  },
  totalRow: {
    marginTop: 18,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#e53935",
  },
});
