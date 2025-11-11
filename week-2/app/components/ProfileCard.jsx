import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import React from 'react'

const ProfileCard = () => {
  return (
    <View style={styles.card}>
      <Text>ProfileCard</Text>
      <ScrollView style={styles.scrollWrapper}>
      <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
      </ScrollView>
      {/* <Button title="Click me"></Button> */}
      <TouchableOpacity onPress={() =>{console.log('clicked')}}>
        <Text style={styles.btn}>Follow</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 5,
        boxShadow: '4px 4px 6px rgba(0,0,0,0.2)', // shadow per ios
        elevation: 4, // shadow per android

    },
    scrollWrapper: {
        maxHeight: 120,
        width: '100%',
        padding: 10
    },
    btn: {
        width: 150,
        height: 40,
        backgroundColor:'yellow',
        color: 'black',
        textAlign: 'center',
    }
})