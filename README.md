import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import db from '../config';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allStory: [],
      lastStory: null,
      search: '',
    };
  }

  componentDidMount = async () => {
    const Query = await db.collection('Story').limit(10).get();
    Query.docs.map((doc) => {
      this.setState({
        allStory: [],
        lastStory: doc,
      });
    });
  };

  searchTransactions = async (text) => {
    var enteredText = text.split('');
    console.log(enteredText);

    if (enteredText[0].toUpperCase() === 'B') {
      const transaction = await db
        .collection('Story')
        .where('Title', '==', text)
        .limit(10)
        .get();

      transaction.docs.map((doc) => {
        this.setState({
          allStory: [...this.state.allStory, doc.data()],
          lastStory: doc,
        });
      });
    } else if (enteredText[0].toUpperCase() === 'S') {
      const transaction = await db
        .collection('Story')
        .where('Title', '==', text)
        .limit(10)
        .get();

      transaction.docs.map((doc) => {
        this.setState({
          allStory: [...this.state.allStory, doc.data()],
          lastStory: doc,
        });
      });
    }
  };

  fetchMoreTransactions = async () => {
    var text = this.state.search;
    var enteredText = text.split('');
    console.log(enteredText);

    if (enteredText[0].toUpperCase() === 'B') {
      const transaction = await db
        .collection('Story')
        .where('Title', '==', text)
        .startAfter(this.state.lastStory)
        .limit(10)
        .get();

      transaction.docs.map((doc) => {
        this.setState({
          allStory: [...this.state.allStory, doc.data()],
          lastStory: doc,
        });
      });
    } else if (enteredText[0].toUpperCase() === 'S') {
      const transaction = await db
        .collection('Story')
        .where('Title', '==', text)
        .startAfter(this.state.lastStory)
        .limit(10)
        .get();

      transaction.docs.map((doc) => {
        this.setState({
          allStory: [...this.state.allStory, doc.data()],
          lastStory: doc,
        });
      });
    }
  };

  render() {
    return (
      <View style={styles.contaner}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.textSearch}
            placeholder="Enter Book/Student ID"
            onChangeText={(text) => {
              this.setState({
                search: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({
                allStory: []
              })
            }}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.allStorys}
          renderItem={({ item }) => {
            var title = item.Title
            return (
              <View style={styles.viewStyle}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      title: title,
                    });

                    this.props.navigation.navigate('Story');
                  }}>
                  <Text style={{ fontWeight: 'Bold' }}>
                    {'Title: ' + title}
                  </Text>
                  <Text style={{ fontWeight: 'Bold' }}>
                    {'Author:   ' + item.Author}
                  </Text>
                  
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            index.toString();
          }}
          onEndReached={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    margin: 10,
  },
  contaner: {
    flex: 1,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    width: 'auto',
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    marginTop: 10,
  },
  textSearch: {
    borderWidth: 2,
    height: 30,
    width: 300,
    paddingLeft: 10,
    borderRadius: 15,
    margin: 5,
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
    margin: 5,
  },
});
