import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import PostImage from "@/components/PostImage";
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { Link } from "expo-router";

const ipAddress = 'localhost';

interface PostItem {
  id: string; //uuid type
  uri: string;
  media_type: string;
  description: string;
  username: string;
}

export default function HomeScreen() {
  const [data, setData] = useState<PostItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(() => {
    axios.get<PostItem[]>('http://' + ipAddress + ':3000/posts')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  });

  const onRefresh = () => {
    setRefreshing(true);
    axios.get<PostItem[]>('http://' + ipAddress + ':3000/posts')
      .then(response => {
        setData(response.data);
        setRefreshing(false);
      })
      .catch(error => {
        setError(error.message);
        setRefreshing(false);
      });
  };

  return (
    <View style={styles.container}>
      {/* <Link href="/profile" style={styles.button}>Profile</Link> */}
      <FlatList
            data={data}
            renderItem={({ item }) => <PostImage img={item.uri} description={item.description} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.list}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#FEFAFF',
  },
  list: {
    paddingBottom: 20,
  },
  text: {
    color: '',
  },
  button: {
    color: '',
  }
});
