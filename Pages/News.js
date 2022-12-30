import React, { Component } from 'react'
import { Button, Text, StyleSheet, View, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class News extends Component {

    constructor() {
        super();

        this.state = {
            list: {}
        }
    }

    render() {

        var api = 'https://news-at.zhihu.com/api/3/story-extra/' + this.props.route.params.id;

        fetch(api).then((response) => response.json()).then((result) => {
            this.setState({
                list: result
            })
        })
            .catch(function (error) {
                console.log(error);
            });

        return (
            <>
                <WebView
                    source={{ uri: this.props.route.params.url }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Ionicons
                        name="chatbox"
                        size={40}
                        onPress={() => this.props.navigation.push('ShortComments', {
                            id: this.props.route.params.id,
                        })}
                    >
                        {this.state.list.short_comments}
                    </Ionicons>
                    <Ionicons
                        name="chatbox-ellipses"
                        size={40}
                        onPress={() => this.props.navigation.push('LongComments', {
                            id: this.props.route.params.id,
                        })}
                    >
                        {this.state.list.long_comments}
                    </Ionicons>
                </View>

            </>
        )
    }
}

const styles = StyleSheet.create({})
