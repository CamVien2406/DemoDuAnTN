import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, Pressable, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../component/Header/Header';
import { PropsAccount } from '../../component/Navigation/Props';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import ButtonBottom from '../../component/Button/Button';
import AxiosInstance from '../../Axios/Axios';
import { useIsFocused } from '@react-navigation/native';
import Order_Detail from './Order_Detail';
import StatusDeliver from './StatusDeliver';
import { NumericFormat } from 'react-number-format';
import { HEIGHT, WIDTH } from '../../utilities/utility';

const OrderScreen = ({ navigation }: PropsAccount) => {
    const isFocus = useIsFocused();
    const [dateStatus, setDateStatus] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');
    const [_idOrder, set_idOrder] = useState<string>('');
    const user = useSelector((state: any) => state.SlicesReducer.user);
    const [listOrder, setListOrder] = useState<any[]>([]);
    const [nameModal, setNameModal] = useState<string>('');
    const [refreshingOrder, setRefreshingOrder] = useState<boolean>(false);

    const fetchListOrder = async () => {
        const response = await AxiosInstance().get(`order/getOrderByIdUser/${user._id}`);
        setListOrder(response.data);
    };

    useEffect(() => {
        if (isFocus) {
            fetchListOrder();
        }
    }, [isFocus]);

    const onRefreshOrder = React.useCallback(() => {
        setRefreshingOrder(true);
        fetchListOrder();
        setTimeout(() => {
            setRefreshingOrder(false);
        }, 2000);
    }, []);

    const RenderItem = ({ item }: { item: any }) => {
        const date = new Date(item.bookingDate);

        return (
            <View
                style={styles.box}
             >
                <View style={styles.itemContent}>
                    <Text style={styles.MaCode}>{item.orderCode}</Text>
                    <Text style={styles.title}>
                        Ngày đặt hàng: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                    </Text>
                    <View style={styles.boxBottom}>
                        <Text style={styles.title}>Sản Phẩm:</Text>
                        <Text style={styles.content}>{item.listProduct.length} sản phẩm</Text>
                    </View>
                    <View style={styles.boxBottom}>
                        <Text style={styles.title}>Giá:</Text>
                        <NumericFormat
                            displayType={'text'}
                            value={Number(item.totalPrice)}
                            thousandSeparator=","
                            renderText={(formattedValue: any) => (
                                <Text style={styles.price}>{formattedValue}đ</Text>
                            )}
                        />
                    </View>
                    <View style={styles.boxBottom}>
                        <Text style={styles.title}>Trạng thái giao hàng</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(true);
                                setStatus(item.status);
                                setDateStatus(
                                    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                                );
                                setNameModal('StatusDeliver');
                            }}>
                            <Icon name="chevron-forward-outline" size={25} color="#6C6C6C" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Modal
                transparent={false}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContent}>
                    {nameModal === 'StatusDeliver' ? (
                        <StatusDeliver state={{ dateStatus, status }} />
                    ) : (
                        <Order_Detail state={{ _idOrder }} />
                    )}
                    <Animatable.View
                        animation="bounceIn"
                        style={styles.modalButtonContainer}>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <ButtonBottom title="Thoát" />
                        </Pressable>
                    </Animatable.View>
                </View>
            </Modal>
            <Header title="Order" navigation={navigation} />
            <View style={styles.line} />
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
                data={listOrder?.reverse()}
                renderItem={RenderItem}
                keyExtractor={(item) => item._id}
                refreshControl={
                    <RefreshControl refreshing={refreshingOrder} onRefresh={onRefreshOrder} />
                }
            />
        </View>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#F8F8F8',
    },
    box: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 15,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
    },
    itemContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    boxBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    price: {
        color: '#FF5722',
        fontSize: 16,
        fontWeight: '700',
    },
    content: {
        color: '#333333',
        fontSize: 14,
    },
    title: {
        color: '#555555',
        fontSize: 14,
        fontWeight: '500',
    },
    MaCode: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },
    line: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginTop: 20,
        marginBottom: 10,
    },
    flatList: {
        flex: 1,
        marginBottom: 100,
    },
    modalContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    modalButtonContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
});
