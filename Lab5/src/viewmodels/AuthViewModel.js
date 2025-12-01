// src/viewmodels/AuthViewModel.js
import { useEffect, useState } from "react";
import { getToken, removeToken, saveToken } from "../utils/storage";

export const useAuthViewModel = (onLoginSuccess) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSavedToken = async () => {
      const token = await getToken();
      if (token && onLoginSuccess) onLoginSuccess(token);
    };
    checkSavedToken();
  }, []);

  const handleLogin = async () => {
    if (!phone || !password) {
      setError("Vui lòng nhập đầy đủ Phone và Password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cleanPhone = phone.trim();
      const cleanPassword = password.trim();

      // ✅ Login LOCAL đúng theo đề
      if (cleanPhone !== "0373007856" || cleanPassword !== "123") {
        throw new Error("INVALID_CREDENTIALS");
      }

      // Tạo token giả & lưu vào AsyncStorage
      const fakeToken = "KAMI_" + Date.now().toString();
      await saveToken(fakeToken);

      if (onLoginSuccess) onLoginSuccess(fakeToken);
    } catch (err) {
      console.log("Login error:", err.message);
      setError("Sai số điện thoại hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await removeToken();
    setPhone("");
    setPassword("");
  };

  return {
    phone,
    setPhone,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
    handleLogout,
  };
};
