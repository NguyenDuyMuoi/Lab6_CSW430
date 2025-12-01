import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { kamiApi } from "../api/kamiApi";

export default function AddCustomerScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const onAdd = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await kamiApi.addCustomer(name.trim(), phone.trim());
      Alert.alert("Success", "Customer added", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert("Error", "Add customer failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Input your customer's name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Phone *</Text>
      <TextInput
        style={styles.input}
        placeholder="Input phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.btn} onPress={onAdd}>
        <Text style={styles.btnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF1F4", padding: 16 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 12 },
  input: {
    marginTop: 6,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffb6c1",
  },
  btn: {
    marginTop: 30,
    backgroundColor: "#E91E63",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 30,
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
