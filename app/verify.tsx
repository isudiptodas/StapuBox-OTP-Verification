import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import '@/global.css';
import { useRouter } from 'expo-router';
import { OtpInput } from 'react-native-otp-entry';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

const Verify = () => {

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const [timer, setTimer] = useState(0);
    const params = useLocalSearchParams();
    const mobile = params.mobile;

    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);


    const verifyOTP = async (code: string) => {
        const key = process.env.EXPO_PUBLIC_API_KEY as string;

        try {
            setVisible(false);
            const res = await axios.post(`https://stapubox.com/trial/verifyOtp?mobile=${mobile}&otp=${code}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Token': key
                }
            });

            if (res.data.status === 'failed') {
                setError("Invalid OTP");
                setVisible(true);
            }

            if (res.data.status === 'success') {
                router.replace('/success');
            }

        } catch (err) {
            console.log(err);
            setError("Invalid OTP");
            setVisible(true);
        }
    }

    const resendOTP = async () => {
        const key = process.env.EXPO_PUBLIC_API_KEY as string;

        try {
            setVisible(false);
            const res = await axios.post(`https://stapubox.com/trial/resendOtp?mobile=${mobile}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Token': key
                }
            });

            if (res.status === 200) {
                setTimer(60);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView>
            <View className='h-screen flex flex-col justify-start items-center relative bg-[#2D2E2F]'>
                <MaterialIcons onPress={() => router.back()} name="arrow-back-ios" size={20} color="white" className='bg-[#3d3d3d] p-3 rounded-full flex justify-center items-center text-center absolute top-8 left-5' />
                <Text className='mt-10 font-bold text-white text-2xl'>Phone Verification</Text>
                <Text className='mt-16 font-semibold text-start w-full text-white text-xl px-5'>Enter 4 digit OTP sent to your phone number</Text>
                <View className='mt-10 w-[75%] flex flex-col justify-start items-start'>
                    <OtpInput onFilled={(code) => { verifyOTP(code) }} onTextChange={(text) => setOtp(text)} autoFocus={true} focusColor='white' numberOfDigits={4} />
                    <Text className={`w-full mt-5 text-start text-red-500 ${visible ? "block" : "hidden"}`}>{error}</Text>
                    {timer === 0 && <Text onPress={resendOTP} className={`w-full px-5 mt-5 text-start text-blue-500 font-semibold`}>Resend OTP</Text>}
                    {timer !== 0 && <Text className={`w-full px-5 mt-5 text-start text-white font-semibold`}> Resend OTP in {timer}s</Text>}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Verify