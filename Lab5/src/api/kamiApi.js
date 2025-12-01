// src/api/kamiApi.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://kami-backend-5rs0.onrender.com";
const TOKEN_KEY = "KAMI_TOKEN";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Gắn token (nếu có) vào header
instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers["x-login-token"] = token;
  }
  return config;
});

export const kamiApi = {
  // ❌ KHÔNG còn login ở server
  // login được xử lý local trong AuthViewModel

  // CUSTOMER ---------------------------------
  getCustomers: () => instance.get("/customers"),

  addCustomer: async (name, phone) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return instance.post("/customers", {
      name,
      phone,
      token, // theo đề yêu cầu param login token
    });
  },

  // TRANSACTION ------------------------------
  getTransactions: () => instance.get("/transactions"),

  getTransactionById: (id) => instance.get(`/transactions/${id}`),
};
