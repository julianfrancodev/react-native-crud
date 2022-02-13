import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl:string = "http://192.168.10.3:8080/api";

const cafeApi = axios.create({
    baseURL: baseUrl
})

cafeApi.interceptors.request.use(
    
    async(config)=>{
        const token = await AsyncStorage.getItem('token');

        if(token){
            config.headers!['x-token'] = token;
        }

        return config;
    }

);

export default cafeApi;