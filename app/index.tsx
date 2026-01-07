import { Text, View, TextInput, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import axios from 'axios';
import '@/global.css';

const Index = () => {

  const [phoneNumber, setNumber] = useState<string | null>('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const sendOTP = async () => {

    if (!phoneNumber) {
      setError("Mobile number required");
      setVisible(true);
      return;
    }

    if (phoneNumber.toString().length !== 10) {
      setError("Mobile number should be 10");
      setVisible(true);
      return;
    }

    const key = process.env.EXPO_PUBLIC_API_KEY as string;

    try {
      const res = await axios.post(`https://stapubox.com/trial/sendOtp`, {
        "mobile": phoneNumber
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Token': key
        }
      });

      if (res.status === 200) {
        router.push({pathname: '/verify', params: {
          mobile: phoneNumber
        }});
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView>
      <View className="h-full justify-center items-center flex flex-col bg-[#2D2E2F]">
        <Text className="text-2xl font-bold text-white">Login to Your Account</Text>
        <View className="w-full mt-5 flex flex-row justify-between items-center px-5">
          <Text className="p-3 border border-zinc-500 rounded-lg text-white text-xl">+91</Text>
          <TextInput onChangeText={(e) => setNumber(e)} placeholder="9999999999" keyboardType="numeric" className="p-3 py-4 text-white w-[80%] outline-white border border-zinc-500 rounded-lg" />
        </View>
        <TouchableOpacity onPress={sendOTP} activeOpacity={0.7} className="w-[90%]"><Text className={`mt-5 text-center rounded-lg ${phoneNumber === '' ? "bg-[#3d3d3d] text-gray-500" : "text-white bg-blue-500"} text-white font-bold py-4`}>Send OTP</Text></TouchableOpacity>
        <Text className="text-white mt-5">Don't have account ? <Link className="text-blue-500" href='/register'>Create Account</Link></Text>
      </View>
    </SafeAreaView>
  );
}

export default Index
