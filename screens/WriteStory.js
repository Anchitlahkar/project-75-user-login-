import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SearchScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      storyTitle: '',
      author: '',
      story: '',
    };
  }

  PublishStory = async () => {
    if (this.state.storyTitle) {
      if (this.state.author) {
        if (this.state.story) {
          db.collection('Story').add({
            Title: this.state.storyTitle,
            Author: this.state.author,
            Date: firebase.firestore.Timestamp.now().toDate(),
            Story: this.state.story,
          });
          alert('Your Story Has Been Published');
        } else {
          alert('Please Write Your Story');
        }
      } else {
        alert('Please Write Your Name');
      }
    } else {
      alert('Please Write Your Story Title');
    }
  };
  reset = () => {
    this.setState({
      storyTitle: '',
      author: '',
      story: '',
    });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          height: '100%',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Story Hub</Text>
        </View>
        <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 20, color:'white' }}>
          Write Your Own Story{' '}
        </Text>

        <TextInput
          style={[styles.textInputStyle, { marginTop: '7%' }]}
          placeholder="    Title Of Your Story"
          onChangeText={(text) => {
            this.setState({
              storyTitle: text,
            });
          }}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="   Author"
          onChangeText={(text) => {
            this.setState({
              author: text,
            });
          }}
        />

        <TextInput
          style={styles.StoryInput}
          placeholder="   Your Story"
          multiline={true}
          onChangeText={(text) => {
            this.setState({
              story: text,
            });
          }}
        />

        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={this.PublishStory}>
          <Text style={styles.ButtonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    margin: 10,
    borderRadius: 15,
    height: '8%',
    width: '80%',
    borderBottomWidth: 3,
    backgroundColor: 'lightgrey',
    borderColor: 'red',
  },
  textContainer: {
    backgroundColor: '#464840',
    width: '100%',
  },
  text: {
    color: 'white',
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ButtonStyle: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    margin: 7,
    width: 100,
  },
  ButtonText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  StoryInput: {
    margin: 10,
    width: '80%',
    height: '45%',
    borderRadius: 15,
    borderTopWidth: 3,
    borderBottomWidth: 5,
    backgroundColor: 'lightgrey',
    borderColor: 'red',
  },
});
