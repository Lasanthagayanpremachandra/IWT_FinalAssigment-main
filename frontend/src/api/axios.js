import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getApiUrl = () => {
    if (Platform.OS === 'web') {
        return process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5001/api';
    }

    const hostUri = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoGo?.debuggerHost;
    const host = hostUri ? hostUri.split(':')[0] : '192.168.1.5';
    return `http://${host}:5001/api`;
};

const API_URL = getApiUrl();

const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            await AsyncStorage.clear();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
