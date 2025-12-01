import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getServicesApi } from '../api/kamiApi';

const PINK = '#f25287';

export default function HomeScreen({ navigation }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getServicesApi();
      setServices(data);
    } catch (error) {
      console.log("GET services error:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() =>
        navigation.navigate("ServiceDetail", { id: item._id || item.id })
      }
    >
      <Text style={styles.serviceName} numberOfLines={1}>
        {item.name}
      </Text>

      <Text style={styles.price}>
        {(item.price || 0).toLocaleString()} đ
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HUYỀN TRINH</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Setting")}
          style={styles.avatarContainer}
        >
          <Image
            source={require("../assets/avatar.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/kami_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* TITLE + ADD BUTTON */}
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Danh sách dịch vụ</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddService")}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* LIST SERVICES */}
      <FlatList
        data={services}
        keyExtractor={(item) => item._id || item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {

    height: 100,
    backgroundColor: PINK,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    elevation: 4,
  },
  headerTitle: {
    marginTop: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
avatarContainer: {
  marginTop: 20,
  width: 32,
  height: 32,
  borderRadius: 16,
  overflow: 'hidden',
  borderWidth: 2,
  borderColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
},

avatar: {
 
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},

  logoContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
  logo: {
    width: 200,
    height: 70,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: PINK,
    padding: 6,
    borderRadius: 20,
  },

  serviceCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 15,
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontWeight: "bold",
    color: "#333",
  },
});
