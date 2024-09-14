import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager } from 'react-native-fbsdk-next'
import { cartEmpty, isLoading, isLogin, updateUser } from '../../redux/silces/Silces'
import ButtonBottom from '../../component/Button/Button'
import Loading from '../../component/Loading/Loading'
import { HEIGHT, PADDING_HORIZONTAL, PADDING_TOP, WIDTH } from '../../utilities/utility'

const AccountScreen = ({ navigation }: any) => {
  const isUser = useSelector((state: any) => state.SlicesReducer.user._idUser);
  const dispatch = useDispatch();

  const handleLogout = async ({ navigation }: any) => {
    dispatch(isLoading(true));
    await GoogleSignin.signOut();
    await LoginManager.logOut();
    navigation.navigate('Home', { screen: 'HomesScreen' });
    setTimeout(async () => {
      dispatch(updateUser({ _id: '', _idUser: '', email: '', userName: '', cartItem: [], avatar: '', gender: '', birthDay: '', address: null, phone: '' }));
      dispatch(isLoading(false));
    }, 1000);
  }

  const handleLogin = () => {
    dispatch(isLogin(true));
  }

  return (
    <View style={styles.container}>
      <Loading />
      <Text style={styles.title}>Tài Khoản</Text>
      <View style={styles.line}></View>
      <View style={styles.accountInfo}>
        <Icon name="person-circle" size={60} color="#fff" />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Chào mừng bạn!</Text>
          <Text style={styles.headerSubText}>Quản lý tài khoản của bạn ở đây.</Text>
        </View>
      </View>
      <View>
        {data.map((item) =>
          <TouchableOpacity
            disabled={!isUser}
            style={styles.button}
            key={item.id}
            onPress={() => navigation?.navigate(item.screen)}>
            <Icon name={item.icon} size={25} color={'#525252'} />
            <Text style={styles.txtbtn}>{item.name}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Pressable
        onPress={isUser ? () => handleLogout({ navigation }) : handleLogin}
        style={styles.actionButton}>
        <ButtonBottom title={isUser ? 'Đăng Xuất' : 'Đăng Nhập'} />
      </Pressable>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    paddingTop: PADDING_TOP,
    paddingHorizontal: PADDING_HORIZONTAL,
    backgroundColor: '#f0f4f7',
  },
  title: {
    color: '#223263',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,
    marginBottom: 20,
  },
  line: {
    height: 2,
    backgroundColor: '#ADA8A8',
    width: '120%',
    marginVertical: 20,
  },
  accountInfo: {
    backgroundColor: '#00bfff',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  txtbtn: {
    color: '#223263',
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 15,
  },
  actionButton: {
    width: '100%',
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
  },
});

const data = [
  {
    id: 1,
    name: 'Hồ sơ',
    icon: 'person-sharp',
    screen: 'ProfileScreen'
  },
  {
    id: 2,
    name: 'Đơn hàng',
    icon: 'bag-check-sharp',
    screen: 'OrderScreen'
  },
  {
    id: 3,
    name: 'Địa chỉ',
    icon: 'location-sharp',
    screen: 'AddressScreen'
  }
];
