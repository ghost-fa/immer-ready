import React, {Component, Fragment} from 'react'
import   {View,TextInput, Text} from "react-native";
import { Ionicons, Octicons,AntDesign, FontAwesome } from '@expo/vector-icons';


export default class GetContact extends Component{
  render(){

    return (
          <View>
      <View>
      <FontAwesome name="caret-up" size={350}  style={{marginLeft: 80, marginBottom:0}}/>
      </View>

      <TextInput
               style={{marginLeft: 110, marginBottom:0}}
               placeholder="Immer Ready!"

             />


  <View>
   <FontAwesome name="caret-down" size={350}    style={{marginLeft: 80, marginTop:0}}/>
</View>
  </View>
    )
  }
}
