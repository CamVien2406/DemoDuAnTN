import { StyleSheet, Text, View, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header/Header';
import Button from '../../component/Button/Button';
import { PropsAccount } from '../../component/Navigation/Props';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { HEIGHT, PADDING_HORIZONTAL, WIDTH } from '../../utilities/utility';
import { RootStackScreenEnumAccount } from '../../component/Root/RootStackAccount';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress } from '../../redux/silces/Silces';
import AxiosInstance from '../../Axios/Axios';
import { Modal, Provider } from '@ant-design/react-native';
import Add_Address from './Add_Address';
import * as Animatable from 'react-native-animatable';
import ButtonBottom from '../../component/Button/Button';

interface Account {
    id: number;
    name: string;
    address: string;
    phone: string;
}



const AddressScreen = ({ navigation }: NativeStackHeaderProps) => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const listData = useSelector((state: any) => {
        return state.SlicesReducer.user.address;
    });
    const user = useSelector((state: any) => {
        return state.SlicesReducer.user;
    });
    const dispatch = useDispatch();
    const handleRemove = async (position: number) => {
        dispatch(deleteAddress(position))
        const response = await AxiosInstance().post(`users/updateAddressUser`, {
            _idUser: user._idUser,
            typeUpdate: 'delete',
            position: position,
        });
    }

    const RenderItem = (props: any): React.JSX.Element => {
        const { data, navigation } = props;
        const { item } = data;

        const address = `${item.street}, ${item.ward}, ${item.district}, ${item.city}`
        return <View style={styles.box}>
            <View>
                <Text style={styles.txtName}>Địa chỉ số {item.position}</Text>
                <Text style={styles.txtContent}>{address}</Text>
                <View style={{ alignSelf: 'flex-end', paddingVertical: 10, }}>
                    <TouchableOpacity onPress={() => handleRemove(item.position)} style={{ justifyContent: 'center'}}><Icon name='trash' size={25} color={'#ff0000'}/></TouchableOpacity>
                </View>
            </View>
        </View >;
    };
    return (
        <Provider>
            <View style={styles.container}>
                <Modal
                    transparent={false}
                    visible={modalVisible}
                    animationType="slide-up"
                    onRequestClose={() => true}
                >
                    <View style={{ height: '100%' }}>
                        <Add_Address action={{ setModalVisible }} />
                        <Animatable.View animation={'bounceIn'} style={{ paddingHorizontal: PADDING_HORIZONTAL, position: 'relative', bottom: 10 }}>
                            <Pressable onPress={() => { setModalVisible(false) }}>
                                <ButtonBottom title='Hủy' />
                            </Pressable>
                        </Animatable.View>
                    </View>
                </Modal>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.navigate(RootStackScreenEnumAccount.AccountScreen)}>
                        <Icon name='chevron-back-outline' size={25} color={'#9098B1'} />
                    </Pressable>
                    <Text style={{
                        color: '#223263',
                        fontSize: 19,
                        fontFamily: 'Poppins',
                        fontWeight: '700',
                        lineHeight: 24,
                        letterSpacing: 0.50,
                    }}>Địa chỉ</Text>
                </View>
                <View style={styles.line}></View>
                <FlatList
                    style={{ maxHeight: '80%' }}
                    data={listData}
                    renderItem={(item) => <RenderItem navigation={navigation} data={item}></RenderItem>}
                    showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity style={{ position: 'absolute', width: '100%', alignSelf: 'center', bottom: 20 }} onPress={() => setModalVisible(true)}>
                    <Button title='Thêm Địa Chỉ' />
                </TouchableOpacity>
            </View>
        </Provider>
    )
}

export default AddressScreen

const styles = StyleSheet.create({
    txtEdit: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '700',
        lineHeight: 25.2,
        letterSpacing: 0.5,
    },
    btnEdit: {
        backgroundColor: '#000',
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 25,
    },
    txtContent: {
        color: '#6c757d',
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '400',
        lineHeight: 21.6,
        letterSpacing: 0.5,
        paddingVertical: 10,
    },
    txtName: {
        color: '#343a40',
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '700',
        lineHeight: 21,
        letterSpacing: 0.5,
        paddingVertical: 10,
    },
    box: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        padding: 20,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '100%',
        alignSelf: 'center',
    },
    line: {
        height: 1,
        backgroundColor: '#e0e0e0',
        width: '100%',
        marginVertical: 20,
    },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backIcon: {
        marginRight: 10,
    },
    headerText: {
        color: '#343a40',
        fontSize: 19,
        fontFamily: 'Poppins',
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: 0.5,
    },
    addButton: {
        position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        bottom: 20,
    },
});
