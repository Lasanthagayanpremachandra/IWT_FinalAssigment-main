import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.circleContainer}>
        <View style={styles.accentCircle} />
      </View>

      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <View style={styles.iconBox}>
            <Ionicons name="ticket" size={32} color="#07131F" />
          </View>
          <Text style={styles.logoText}>Velora<Text style={styles.logoAccent}> Events</Text></Text>
        </View>

        <Text style={styles.title}>Welcome to Velora Events</Text>
        <Text style={styles.subtitle}>Your gateway to unforgettable experiences.</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>Login</Text>
          <Ionicons name="arrow-forward" size={20} color="#07131F" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1020' },
  circleContainer: { position: 'absolute', top: -120, right: -120 },
  accentCircle: { width: 320, height: 320, borderRadius: 160, backgroundColor: '#5EEAD4', opacity: 0.15 },
  content: { flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center' },
  logoWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  iconBox: { backgroundColor: '#5EEAD4', padding: 8, borderRadius: 12, marginRight: 12 },
  logoText: { fontSize: 32, fontWeight: '900', color: '#F5F7FF' },
  logoAccent: { color: '#F7C873' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#B7C1D9', marginBottom: 30, textAlign: 'center' },
  primaryButton: { backgroundColor: '#5EEAD4', height: 60, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, boxShadow: '0px 5px 15px rgba(94,234,212,0.25)', elevation: 5 },
  primaryButtonText: { color: '#07131F', fontSize: 18, fontWeight: 'bold' },
  buttonIcon: { marginLeft: 10 },
});

export default HomeScreen;
