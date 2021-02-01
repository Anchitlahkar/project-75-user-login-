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
import AppHeader from '../components/AppHeader'

export default class ReadStory extends React.Component {
  constructor() {
    super();

    this.state = {
      storyTitle: '',
      author: '',
      story: '',
    };
  }

  render() {
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: 'smokeWhite',
        }}>
        <AppHeader Text="Story Hub" />
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {this.props.navigation.getParam('Title')}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            By : {this.props.navigation.getParam('Author')}
          </Text>
          <Text style={{ fontWeight: 'bold' }}> </Text>
          <Text style={{ fontWeight: 'bold' }}>
            {this.props.navigation.getParam('Story')}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={() => {
            this.props.navigation.navigate('TabNavigator');
          }}>
          <Text style={styles.ButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
