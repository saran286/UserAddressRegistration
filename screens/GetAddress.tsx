import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import axios from 'axios';

import firestore from '@react-native-firebase/firestore';

import {StackNavigationProp} from '@react-navigation/stack';

type StackParams = {
  GetAddress: {
    username: string;
    password: string;
  };
};

type AddressProps = {
  route: {
    params: {
      username: string;
      password: string;
    };
  };
  navigation: any;
};

const GetAddress: React.FC<AddressProps> = ({navigation, route}) => {
  const [Address, setSelectedAddress] = useState('');
  const [initialLocation, setInitialLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleUpdateAddress = async () => {
    try {
      if (Address) {
        const usersCollection = firestore().collection('users');
        await usersCollection.add({
          username: route.params.username,
          password:route.params.password,
          Address,
        });
        navigation.navigate('AddressList');
        console.log('Address updated successfully');
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  useEffect(() => {
    // Request location permission
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            console.log('latitude, longitude', latitude, longitude);
            setInitialLocation({latitude, longitude});
          },
          error => {
            console.error(error);
          },
        );
      } else {
        console.log('Location permission denied.');
      }
    });
  }, []);

  const getLocation = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${initialLocation?.latitude}&lon=${initialLocation?.longitude}&zoom=18&addressdetails=1`,
      );
      if (response.data) {
        const {address} = response.data;
        const formattedAddress: any = {
          street: address.road || '',
          city:
            address.city ||
            address.county ||
            address.state_district ||
            address.neighbourhood,
          state: address.state || '',
          postalCode: address.postcode || '',
          country: address.country || '',
        };
        const formattedString = `${formattedAddress?.street} ${formattedAddress?.city} ${formattedAddress?.state} ${formattedAddress?.country} ${formattedAddress?.postalCode}`;
        setSelectedAddress(formattedString.toUpperCase());
      }
      return null;
    } catch (error) {
      console.error('Geocoding Error:', error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Add your address</Text>
          <Text style={styles.subtitle}>
            {/* Enter your primary residence address */}
            Click get Location to register your address
          </Text>
        </View>

        <TouchableOpacity 
        onPress={()=>getLocation()}
        style={styles.getButton}>
          <Text style={styles.getText}>Get Location</Text>
        </TouchableOpacity>
        <Text></Text>
        {initialLocation && (
          <Text>{Address}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateAddress}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
  },
  topContent: {
    justifyContent: 'flex-start', 
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2B64F0',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  getButton:{
    height:50,
    width:"60%",
    borderWidth:0.5,
    alignItems:"center",
    alignContent:"center",
    alignSelf:"center",
    justifyContent:"center",
    borderRadius:20,
  },
  getText:{
    fontSize:14,
    fontWeight:"500"
  },
});

export default GetAddress;
