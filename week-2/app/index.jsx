import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import Logo from '../assets/icon.png'
import ProfileCard from './components/ProfileCard'
const Home = () => {
    return (
        <View style={styles.container}>
            <ProfileCard />
            {/* <Text style={styles.title}>Home</Text> */}
            {/* <ImageBackground source={Logo} style={styles.img}>
                <Text>Hello</Text>
                </ImageBackground> */}
            {/* <Image source={{uri: 'https://images.unsplash.com/photo-1750535135451-7c20e24b60c1?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}} style={{width: 200, height:200}}/> */}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'lightblue',
        padding:20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        color: 'orange',
        fontWeight: 'bold'
    },
    img: {
        width: 400,
        height: 400,
        borderRadius: 10,
        marginTop: 10
    }
})