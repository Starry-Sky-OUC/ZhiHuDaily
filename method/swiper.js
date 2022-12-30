import React, { Component } from 'react'
import { Text, StyleSheet, Image, View, ScrollView, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'

export default class App extends Component {
    render() {
        return (
            <ScrollView>
                <Swiper
                    style={{ height: 200 }}
                    showsButtons={true}
                    autoplay={true}
                >
                    <Image
                        style={[styles.img]}
                        source={require('./image/1.png')}
                    />
                    <Image
                        style={[styles.img]}
                        source={require('./image/2.png')}
                    />
                    <Image
                        style={[styles.img]}
                        source={require('./image/3.png')}
                    />
                </Swiper>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        height: 200,
        width: Dimensions.get('window').width
    }
})
