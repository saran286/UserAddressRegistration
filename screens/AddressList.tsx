import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

type User = {
    id: string;
    username: string;
    Address: string;
  };

const AddressList = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const users = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setUserList(users);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <View style={styles.listItem}>
      <Text style={{width:"10%"}}>{index + 1}</Text>
      <Text style={{width:"50%"}}>{item.username}</Text>
      <Text style={{width:"40%"}}>{item.Address}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell,{width:"10%"}]}>No</Text>
        <Text style={[styles.headerCell,{width:"50%"}]}>Name</Text>
        <Text style={[styles.headerCell,{width:"40%"}]}>Address</Text>
      </View>
      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  headerCell: {
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default AddressList;
