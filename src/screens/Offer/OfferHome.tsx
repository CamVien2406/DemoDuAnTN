import { StyleSheet, Text, View, ImageBackground, FlatList, Pressable, Image, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Axios/Axios';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { RootStackScreenEnumOffer } from '../../component/Root/RootStackOffer';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const OfferHome = ({ navigation }: NativeStackHeaderProps | any) => {
  const [event, setEvent] = useState<[]>([]);
  const [couponHighest, setCouponHighest] = useState<any>();
  const [refreshingOffer, setRefreshingOffer] = useState<boolean>(false);

  const isFocused = useIsFocused();

  const fetchEvent = async () => {
    const response = await AxiosInstance().get(`event/getAllEvent`);
    const coupon = await AxiosInstance().get(`promotion/getCouponHighest`);
    setCouponHighest(coupon.data);
    setEvent(response.data.filter((item: any) => {
      return new Date(item.soNgayGiamgia).getTime() > new Date().getTime();
    }));
  };

  useEffect(() => {
    if (isFocused) {
      fetchEvent();
    }
  }, [isFocused]);

  const onRefreshOffer = React.useCallback(() => {
    setRefreshingOffer(true);
    fetchEvent();
    setTimeout(() => {
      setRefreshingOffer(false);
    }, 2000);
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <Pressable onPress={() => navigation.navigate(RootStackScreenEnumOffer.OfferScreen, { item })}>
        <ImageBackground
          source={{ uri: item.eventImage }}
          style={styles.backgroundImg}>
          <Text style={styles.textBackgroundImg}>{item.eventName}</Text>
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {couponHighest ? (
        <View style={styles.coupon}>
          <Text style={styles.textCoupon}>Sử dụng “{couponHighest?.discountCode}” Mã cho phiếu giảm giá {couponHighest?.discountLevel}% off</Text>
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Image style={styles.noDataImage} source={require('../../asset/image/nodata.png')} />
          <Text style={styles.noDataText}>Hiện không có phiếu giảm giá !</Text>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={event}
        keyExtractor={(item: any) => item._id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshingOffer} onRefresh={onRefreshOffer} />
        }
      />
    </View>
  );
};

export default OfferHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F8F9FA',
  },
  coupon: {
    marginBottom: 20,
    width: '100%',
    height: 80,
    backgroundColor: '#00A9FF',
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 20,
    elevation: 2, // Adds shadow for a subtle elevation effect
  },
  textCoupon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  backgroundImg: {
    marginBottom: 20,
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  textBackgroundImg: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent background for better text visibility
    borderTopRightRadius: 8,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noDataText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1E4F5F',
    textAlign: 'center',
  },
});
