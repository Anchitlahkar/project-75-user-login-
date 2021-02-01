import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import db from '../config';
import firebase from 'firebase'

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  login = async(email,password)=>{
    console.log(email +' : '+ password)

    if(email && password){
      try{
       const response = await firebase.auth().signInWithEmailAndPassword(email, password)
         console.log(response)
       if(response){
         this.props.navigation.navigate('Write_Story')
       }
      }
      catch(error){
        switch(error.code){
          case 'auth/user-not-found': alert("User Doesn't Exist") 
          break;
          case 'auth/invalid-email': alert("Incorrect Email/Password")
          break;
          default: console.log(error)
        }
      }
    }
    else{
      alert("Enter Email And Password")
    }
  }

  render() {
    return (
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          backgroundColor: 'smokeWhite',
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Story Hub</Text>
        </View>

        <Image
          style={{ width: "100%", height: '50%' }}
          source={require('../assets/login.jpg')}
        />

        <TextInput
          style={[styles.textInputStyle, { marginTop: '10%' }]}
          placeholder="    Email ID"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({
              email: text,
            });
          }}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="    Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />

        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={() => {
            this.login(this.state.email, this.state.password);
          }}>
          <Text style={styles.ButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    margin: 15,
    borderRadius: 15,
    height: '9%',
    width: '80%',
    borderBottomWidth: 5,
    backgroundColor: 'lightgrey',
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
    margin: 10,
    width: 100,
  },
  ButtonText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
