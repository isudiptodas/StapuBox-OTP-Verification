import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import '@/global.css';

const Success = () => {
    return (
        <SafeAreaView>
            <View className='w-full h-screen flex justify-center items-center bg-[#2D2E2F]'>
                <Text className='text-3xl text-green-600 font-semibold'>OTP Verification Successful</Text>
            </View>
        </SafeAreaView>
    )
}

export default Success