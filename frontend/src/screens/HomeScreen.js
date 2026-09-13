import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Abstract background */}
      <View style={styles.circleContainer}>
        <View style={styles.yellowCircle} />
      </View>

      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <View style={styles.iconBox}>
            <Ionicons name="ticket" size={32} color="#000" />
          </View>
          <Text style={styles.logoText}>Event<Text style={styles.logoAccent}>Pass</Text></Text>
        </View>

        <Text style={styles.title}>Welcome to EventPass</Text>
        <Text style={styles.subtitle}>Your gateway to unforgettable events.</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>Login</Text>
          <Ionicons name="arrow-forward" size={20} color="#000" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  circleContainer: { position: 'absolute', top: -120, right: -120 },
  yellowCircle: { width: 300, height: 300, borderRadius: 150, backgroundColor: '#FFD301', opacity: 0.15 },
  content: { flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center' },
  logoWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  iconBox: { backgroundColor: '#FFD301', padding: 8, borderRadius: 12, marginRight: 12 },
  logoText: { fontSize: 32, fontWeight: '900', color: '#FFFFFF' },
  logoAccent: { color: '#FFD301' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#A0A0A0', marginBottom: 30, textAlign: 'center' },
  primaryButton: { backgroundColor: '#FFD301', height: 60, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, boxShadow: '0px 5px 15px rgba(255,211,1,0.2)', elevation: 5 },
  primaryButtonText: { color: '#000000', fontSize: 18, fontWeight: 'bold' },
  buttonIcon: { marginLeft: 10 },
});

export default HomeScreen;
