import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });



const [request, response, promptAsync] = Google.useAuthRequest({
  expoClientId: "1001291115613-3ck13ia8nmlkthalv9cfa944amk29k0g.apps.googleusercontent.com",
  webClientId: "1001291115613-f1gvndajl0ul6ge23e5316grklu7auq8.apps.googleusercontent.com",
  iosClientId: "1001291115613-d14erd8lpq9eg79m2r2gohhclklh96c3.apps.googleusercontent.com",
    responseType: "id_token",
    redirectUri,
});

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        if (!id_token) {
          setError("Google authentication failed: No ID token returned");
          return;
        }
        try {
          setLoadingGoogle(true);
          const credential = GoogleAuthProvider.credential(id_token);
          await signInWithCredential(auth, credential);
          router.replace("/");
        } catch (err) {
          setError("Firebase login failed: " + err.message);
        } finally {
          setLoadingGoogle(false);
        }
      } else if (response?.type === "error") {
        setError("Google authentication error");
      }
    };
    handleGoogleLogin();
  }, [response]);

  const validateInputs = () => {
    if (!email.trim() || !password.trim()) {
      setError("Both inputs are required");
      return false;
    }
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleEmailLogin = async () => {
    if (!validateInputs()) return;
    try {
      setLoadingEmail(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.btn} onPress={handleEmailLogin} disabled={loadingEmail}>
        <Text style={styles.btnText}>{loadingEmail ? "Logging in..." : "Log In"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
        disabled={!request || loadingGoogle}
        onPress={() => promptAsync({ useProxy: true })}
        style={[styles.btn, { backgroundColor: '#4285F4', marginTop: 15 }]}
        >
        <Text style={styles.btnText}>{loadingGoogle ? "Logging in..." : "Sign in with Google"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>


      
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 25, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginVertical: 5, borderRadius: 8 },
  btn: { backgroundColor: "#007AFF", padding: 14, borderRadius: 8, marginTop: 15, alignItems: "center" },
  btnText: { color: "white", textAlign: "center", fontWeight: "600" },
  error: { color: "red", marginTop: 10, textAlign: "center" },
    link: { color: "#007AFF", marginTop: 20, textAlign: "center" },
});