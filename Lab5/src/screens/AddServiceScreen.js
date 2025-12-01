import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { addServiceApi } from "../api/kamiApi";

const PINK = "#f25287";

export default function AddServiceScreen({ navigation }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [loading, setLoading] = useState(false);

  const onAdd = async () => {
    if (!name.trim()) return alert("Nhập tên dịch vụ!");
    if (!price) return alert("Nhập giá!");

    try {
      setLoading(true);
      await addServiceApi(name, Number(price));

      alert("Thêm dịch vụ thành công!");
      navigation.goBack(); // trở lại HomeScreen
    } catch (err) {
      console.log("ADD ERROR:", err);
      alert("Không thể thêm dịch vụ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" color="#fff" size={26} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Service</Text>
        <View style={{ width: 30 }}></View>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Text style={styles.label}>Service name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Input a service name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Price *</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity
          style={styles.addBtn}
          onPress={onAdd}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.addText}>Add</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 110,
    backgroundColor: PINK,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  headerTitle: { fontSize: 18, color: "#fff", fontWeight: "bold" },

  form: { padding: 20 },
  label: { fontWeight: "bold", marginBottom: 6, fontSize: 15 },

  input: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f2f2f7",
    marginBottom: 20,
  },

  addBtn: {
    backgroundColor: PINK,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  addText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
