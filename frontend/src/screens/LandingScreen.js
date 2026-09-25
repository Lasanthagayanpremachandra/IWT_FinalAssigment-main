import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LandingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={[styles.glow, { top: -100, right: -100, backgroundColor: '#5EEAD433' }]} />
            <View style={[styles.glow, { bottom: -150, left: -150, backgroundColor: '#F7C87322' }]} />

            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoIcon}>
                        <Ionicons name="flash" size={30} color="#07131F" />
                    </View>
                    <Text style={styles.logoText}>Velora<Text style={{ color: '#5EEAD4' }}> Events</Text></Text>
                </View>

                <View style={styles.heroSection}>
                    <Text style={styles.heroTitle}>{`Discover\nCurated Experiences`}</Text>
                    <Text style={styles.heroSubtitle}>Premium events, elevated experiences, and unforgettable nights designed for modern audiences.</Text>
                </View>

                <View style={styles.features}>
                    <View style={styles.featureItem}>
                        <Ionicons name="ticket-outline" size={24} color="#5EEAD4" />
                        <Text style={styles.featureText}>Fast Booking</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Ionicons name="shield-checkmark-outline" size={24} color="#5EEAD4" />
                        <Text style={styles.featureText}>Trusted Access</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.loginButton} 
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.registerButton} 
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.registerButtonText}>Create New Account</Text>
                        <Ionicons name="chevron-forward" size={18} color="#F7C873" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B1020',
    },
    glow: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.8,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 40,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        backgroundColor: '#8B5CF6',
        padding: 10,
        borderRadius: 14,
        marginRight: 12,
    },
    logoText: {
        color: '#F5F7FF',
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -1,
    },
    heroSection: {
        marginTop: 60,
    },
    heroTitle: {
        color: '#FFFFFF',
        fontSize: 46,
        fontWeight: 'bold',
        lineHeight: 56,
        letterSpacing: -1,
    },
    heroSubtitle: {
        color: '#B7C1D9',
        fontSize: 18,
        lineHeight: 28,
        marginTop: 20,
        maxWidth: '90%',
    },
    features: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 30,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    featureText: {
        color: '#F5F7FF',
        fontSize: 14,
        fontWeight: '600',
    },
    footer: {
        marginTop: 'auto',
    },
    loginButton: {
        backgroundColor: '#8B5CF6',
        height: 65,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    registerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        gap: 8,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default LandingScreen;
