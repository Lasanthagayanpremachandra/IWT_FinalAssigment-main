import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axiosInstance from '../api/axios';
import StatusModal from '../components/StatusModal';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [statusModal, setStatusModal] = useState({ visible: false, type: '', title: '', message: '' });

    const handleLogin = async () => {
        if (!email || !password) {
            setStatusModal({ visible: true, type: 'error', title: 'Missing Info', message: 'Please enter both email and password.' });
            return;
        }

        setLoading(true);
        try {
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
            const response = await axiosInstance.post('/auth/login', { 
                email: trimmedEmail, 
                password: trimmedPassword 
            });
            const { token, user } = response.data;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'admin') {
                navigation.replace('AdminPortal');
            } else {
                navigation.replace('UserPortal');
            }
        } catch (error) {
            console.error('Login Error:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Check your internet connection';
            setStatusModal({ visible: true, type: 'error', title: 'Login Failed', message: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Enter your credentials to continue</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={20} color="#8AA0C5" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="name@example.com"
                                    placeholderTextColor="#7A86A7"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="lock-closed-outline" size={20} color="#8AA0C5" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    placeholderTextColor="#7A86A7"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#5EEAD4" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.forgotPass}>
                            <Text style={styles.forgotPassText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.loginBtn} 
                            onPress={handleLogin} 
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator color="#07131F" />
                            ) : (
                                <Text style={styles.loginBtnText}>Sign In</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.signupPrompt}>
                            <Text style={styles.promptText}>New here? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.signupLink}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <StatusModal 
                visible={statusModal.visible}
                type={statusModal.type}
                title={statusModal.title}
                message={statusModal.message}
                onClose={() => setStatusModal({ ...statusModal, visible: false })}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0B1020' },
    scrollContent: { flexGrow: 1, padding: 30 },
    backButton: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: '#121B2E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        borderWidth: 1,
        borderColor: '#24314F',
    },
    header: { marginBottom: 40 },
    title: { fontSize: 36, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#B7C1D9' },
    form: { flex: 1 },
    inputGroup: { marginBottom: 25 },
    label: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginBottom: 10, marginLeft: 4 },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#121B2E',
        borderRadius: 18,
        paddingHorizontal: 18,
        height: 65,
        borderWidth: 1,
        borderColor: '#24314F',
    },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, color: '#FFFFFF', fontSize: 16 },
    forgotPass: { alignSelf: 'flex-end', marginBottom: 35 },
    forgotPassText: { color: '#5EEAD4', fontSize: 14, fontWeight: '600' },
    loginBtn: {
        backgroundColor: '#8B5CF6',
        height: 65,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        elevation: 6,
    },
    loginBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    signupPrompt: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
    promptText: { color: '#B7C1D9', fontSize: 15 },
    signupLink: { color: '#5EEAD4', fontSize: 15, fontWeight: 'bold' }
});

export default LoginScreen;
