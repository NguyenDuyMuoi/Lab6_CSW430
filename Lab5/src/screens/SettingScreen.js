import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PINK = "#f25287";

export default function SettingScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("KAMI_TOKEN");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* 🔥 HEADER CHUẨN */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Setting</Text>
      </View>

      {/* 🔥 CARD CHỨA LOGOUT */}
     
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <MaterialIcons name="logout" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf1f4",
  },

  /* ---------------- HEADER ---------------- */
  header: {
    height: 70,
    backgroundColor: PINK,
    justifyContent: "center",
    paddingHorizontal: 16,
    elevation: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop:30,
  },



  /* ---------------- BUTTON ---------------- */
  logoutButton: {
   marginTop:10,
    backgroundColor: PINK,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
