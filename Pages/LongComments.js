import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Dimensions, SafeAreaView, Image } from 'react-native'

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);

export default class LongComments extends Component {

    constructor() {
        super();

        this.state = {
            list: []
        }
    }

    render() {

        var api = 'https://news-at.zhihu.com/api/4/story/' + this.props.route.params.id + '/long-comments';


        fetch(api).then((response) => response.json()).then((result) => {
            this.setState({
                list: result.comments
            })
        })
            .catch(function (error) {
                console.log(error);
            });

        const renderItem = ({ item }) => {
            return (
                <SafeAreaView>
                    <View style={[styles.separate]}></View>
                    <View>
                        <View>
                            <Image
                                style={[styles.images]}
                                source={{ uri: item.avatar }}
                            />
                        </View>
                        <View>
                            <Text style={[styles.name]}> ID: {item.author} </Text>
                            <Text style={[styles.txt]}> {item.content} </Text>
                        </View>
                    </View>
                    <View style={[styles.separate]}></View>
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <FlatList
                    data={this.state.list}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => {
                        return <Text style={{ fontSize: 30 }}> 暂时还没有人评论哦，快来抢占沙发吧 </Text>
                    }}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    txt: {
        fontSize: 15,
        color: 'black',
    },

    images: {
        height: 100,
        width: 100,
    },

    separate: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        width: 400
    }
})
