import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import db from '../config';
import ReadStory from './Story';

export default class SearchStory extends React.Component {
  state = {
    search: '',
    allStorys: [],
    lastStory: null,
    title: '',
    author: '',
    story: '',
    filteredStory: [],
  };

  //placing data
  componentDidMount = async () => {
    const Query = await db.collection('Story').limit(10).get();
    Query.docs.map((doc) => {
      this.setState({
        allStorys: [...this.state.allStorys, doc.data()],
        lastStory: doc,
      });
    });
  };

  searchStory = async (text) => {
    if (text) {
      const story = await db
        .collection('Story')
        .where('Author', '==', text)
        .limit(5)
        .get();

      story.docs.map((doc) => {
        this.setState({
          allStorys: [...this.state.allStorys, doc.data()],
          lastStory: doc,
        });
        console.log(this.state.allStorys);
      });
    } else if (!text) {
      const Query = await db.collection('Story').limit(10).get();
      Query.docs.map((doc) => {
        this.setState({
          allStorys: [...this.state.allStorys, doc.data()],
          lastStory: doc,
        });
      });
    }

    console.log(text);
  };

  fetchMoreStorys = async () => {
    var text = this.state.search;
    console.log('1' + text);

    const transaction = await db
      .collection('Story')
      .where('Author', '==', text)
      .startAfter(this.state.lastStory)
      .limit(5)
      .get();

    transaction.docs.map((doc) => {
      this.setState({
        allStorys: [...this.state.allStorys, doc.data()],
        lastStory: doc,
      });
    });
  };

  //rendering
  render() {
    const { search } = this.state;
    return (
      <View style={{ height: '100%', backgroundColor: '#000000' }}>
        <AppHeader Text="Story Hub" />
        <View style={styles.searchView}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Type Here..."
            onChangeText={(text) => {
              this.setState({
                search: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.searchStory(this.state.search);
              this.setState({
                allStorys: [],
              });
            }}>
            <Text style={{color: 'white'}}>search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.allStorys}
          renderItem={({ item }) => {
            var title = item.Title;
            var author = item.Author;
            var story = item.Story;
            return (
              <View style={styles.viewStyle}>
                <TouchableOpacity
                  style={{ borderRadius: 15, borderWidth: 1.5, backgroundColor: 'white' }}
                  onPress={() => {
                    this.props.navigation.navigate('Story', {
                      Title: title,
                      Author: author,
                      Story: story,
                    });
                  }}>
                  <Text style={{ fontWeight: 'Bold' }}>
                    {'   Title: ' + title}
                  </Text>
                  <Text style={{ fontWeight: 'Bold' }}>
                    {'  Author:   ' + author}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            index.toString();
          }}
          onEndReached={this.fetchMoreStorys}
          onEndReachedThreshold={0.7}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    margin: 10,
  },
  textInputStyle: {
    margin: 10,
    borderRadius: 15,
    height: '50%',
    width: '80%',
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderWidth: 1,
    backgroundColor: 'lightgrey',
  },
  buttonStyle: {},
  searchView: {
    flexDirection: 'row',
    height: '15%',
    width: 'auto',
    alignItems: 'center',
    marginTop: 10,
  },
});
