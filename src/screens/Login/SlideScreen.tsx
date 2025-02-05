import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import LoginNavigation from '../../component/Navigation/LoginNavigation';
import { RootStackParamListLogin, RootStackScreenEnumLogin } from '../../component/Root/RootStackLogin';
import { BG_COLOR, PADDING_HORIZONTAL, PADDING_TOP } from '../../utilities/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTab from '../../component/BottomNavigation/BottomTabNavigator';

type navigationProps = StackNavigationProp<RootStackParamListLogin, RootStackScreenEnumLogin>

const SlideScreen = (props: any) => {
    const navigation = useNavigation<navigationProps>();
    const [loadLoginScreen, setloadLoginScreen] = useState<boolean>(false)
    const [step, setStep] = useState<number>(1);
    const setData = async () => {
        await AsyncStorage.setItem('checkSlide', 'true');
        setloadLoginScreen(true);

    }

    return (
        !loadLoginScreen ?
            <View style={{ paddingHorizontal: PADDING_HORIZONTAL, width: '100%', height: '100%', backgroundColor: "white" }}>
                <View style={{ marginTop: '40%' }}>
                    <Image style={styles.imageSlide1} source={step === 1 ? require('../../asset/image/bag2.png') : step === 2 ? require('../../asset/image/bag1.png') : require('../../asset/image/bag3.png')} />
                </View>
                <View style={{ marginTop: 96 }}>
                    <Text style={styles.textTitle}>{step === 1 ? 'Thời Trang Đỉnh Cao' : step === 2 ? 'Túi Xách Sang Trọng' : 'Lata sẽ đồng hành'}</Text>
                    <Text style={styles.textDescription}>{step === 1 ? 'Sự Lựa Chọn Hoàn Hảo Cho Phụ Nữ Hiện Đại' : step === 2 ? 'Nâng tầm phong cách ' : 'Cùng bạn...'}</Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <TouchableOpacity style={styles.nextBTN} onPress={() => { step < 3 ? setStep(step + 1) : setData() }}>
                        <Image source={require('../../asset/image/NextButton.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <View style={step === 1 ? styles.slideFocus : styles.slideUnfocus} />
                    <View style={step === 2 ? styles.slideFocus : styles.slideUnfocus} />
                    <View style={step === 3 ? styles.slideFocus : styles.slideUnfocus} />
                </View>
            </View> : <BottomTab />
    )
}

export default SlideScreen

const styles = StyleSheet.create({
    slideUnfocus: {
        width: 16,
        height: 6,
        backgroundColor: '#46CAF3',
        borderRadius: 10,
        marginHorizontal: 2
    },
    slideFocus: {
        width: 16,
        height: 6,
        backgroundColor: '#2F2E41',
        borderRadius: 10,
        marginHorizontal: 2
    },
    nextBTN: {
        position: 'absolute',
        top: -25,
        right: 20
    },
    textDescription: {
        color: '#252525',
        fontSize: 24,
        fontFamily: 'Montserrat',
        fontWeight: '300',
        marginLeft: 5
    },
    textTitle: {
        width: '100%',
        color: '#252525',
        fontSize: 40,
        fontFamily: 'Montserrat',
        fontWeight: '700',
    },
    imageSlide1: {
        justifyContent: 'center',
        width: "100%",
        height: 300
    }
})