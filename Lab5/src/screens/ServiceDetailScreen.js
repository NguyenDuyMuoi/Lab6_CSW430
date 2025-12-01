import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { deleteServiceApi, getServiceByIdApi } from '../api/kamiApi';

const PINK = "#f25287";

export default function ServiceDetailScreen({ route, navigation }) {
  const { id } = route.params;

  // HOOKS PHẢI ĐẶT NGAY SAU ĐẦU FUNCTION
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    try {
      const data = await getServiceByIdApi(id);
      setService(data || null);
    } catch (error) {
      console.log("GET detail error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async () => {
    try {
      await deleteServiceApi(id);
      setShowWarning(false);
      navigation.goBack();
    } catch (e) {
      console.log("Delete failed", e);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PINK} />
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không tìm thấy dịch vụ.</Text>
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

        <Text style={styles.headerTitle}>Service detail</Text>

        {/* 3 chấm */}
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <MaterialIcons name="more-vert" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* MENU */}
      {showMenu && (
        <View style={styles.menuBox}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setShowMenu(false);
              navigation.navigate("EditService", { id });
            }}
          >
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setShowMenu(false);
              setShowWarning(true);
            }}
          >
            <Text style={[styles.menuText, { color: "red" }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.label}>Service name:</Text>
        <Text style={styles.text}>{service?.name}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.text}>{service?.price?.toLocaleString()} đ</Text>

        <Text style={styles.label}>Creator:</Text>
        <Text style={styles.text}>{service?.creator || "Admin"}</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.text}>{service?.createdAt}</Text>

        <Text style={styles.label}>Final update:</Text>
        <Text style={styles.text}>{service?.updatedAt}</Text>
      </View>

      {/* WARNING POPUP */}
      <Modal visible={showWarning} transparent animationType="fade">
        <View style={styles.alertOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>Warning</Text>
            <Text style={styles.alertMsg}>
              Are you sure you want to remove this service?
              {"\n"}This operation cannot be returned.
            </Text>

            <View style={styles.alertButtons}>
              <TouchableOpacity onPress={handleDeleteService}>
                <Text style={styles.deleteText}>DELETE</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowWarning(false)}>
                <Text style={styles.cancelText}>CANCEL</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: 15,
    height: 100,
    backgroundColor: PINK,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  content: { padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 15, marginBottom: 5, color: "#444" },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  menuBox: {
    position: "absolute",
    top: 90,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 6,
    width: 140,
    paddingVertical: 4,
    zIndex: 10,
  },
  menuItem: { paddingVertical: 10, paddingHorizontal: 12 },
  menuText: { fontSize: 16, color: "#333" },

  alertOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: { width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 10 },
  alertTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  alertMsg: { fontSize: 16, marginBottom: 20, color: "#444" },

  alertButtons: { flexDirection: "row", justifyContent: "flex-end", gap: 25 },
  deleteText: { color: "red", fontWeight: "bold", fontSize: 16 },
  cancelText: { color: "#333", fontWeight: "bold", fontSize: 16 },
});
