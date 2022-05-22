import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput } from 'react-native';

export default function App() {

  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    fetchPosts();
    return () => {
      
    }
  }, [])

  const fetchPosts = () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/todos';
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson) => {
      setfilterData(responseJson);
      setmasterData(responseJson);
    }).catch((error) => {
      console.error(error);
    })
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() 
                  : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setsearch(text);
    } else {
      setfilterData(masterData);
      setsearch(text);
    }
  }

  const ItemView = ({item}) => {
    return (
      <Text style={styles.itemStyle}>
        {item.id}{'. '}{item.title.toUpperCase()}
      </Text>
    )
  }

  const ItemSeparatorView = () => {
    return (
      <View
        style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
      />
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        value={search}
        placeholder="Search Here"
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
      />
      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemStyle: {
    padding: 15
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'white'
  }
});
