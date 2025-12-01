import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getServiceByIdApi, updateServiceApi } from "../api/kamiApi";

const PINK = "#f25287";

export default function EditServiceScreen({ route, navigation }) {
  const { id } = route.params;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load data ban đầu
  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    try {
      const data = await getServiceByIdApi(id);

      setName(data.name);
      setPrice(String(data.price));
    } catch (err) {
      console.log("Load detail error:", err);
      Alert.alert("Error", "Cannot load service information.");
    } finally {
      setLoading(false);
    }
  };

  // Update service
  const handleUpdate = async () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert("Warning", "Please fill out all required fields!");
      return;
    }

    setSaving(true);

    try {
      await updateServiceApi(id, name.trim(), Number(price));

      Alert.alert("Success", "Service updated successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      console.log("Update failed:", e);
      Alert.alert("Error", "Cannot update service!");
    } finally {
      setSaving(false);
    }
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

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Service</Text>

        <View style={{ width: 26 }} /> 
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Text style={styles.label}>Service name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter service name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Price *</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleUpdate}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Update</Text>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 100,
    backgroundColor: PINK,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  form: {
    padding: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
  },

  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginTop: 8,
  },

  saveBtn: {
    backgroundColor: PINK,
    paddingVertical: 14,
    marginTop: 30,
    borderRadius: 8,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
