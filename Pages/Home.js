import React, { Component, useState } from 'react'
import { Button, Text, StyleSheet, View, Dimensions, SafeAreaView, Alert, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);


export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            list: []
        }
    }

    backToToday = () => {
        this.setState = {
            isLoading: true
        }
        this.props.navigation.push('Home')
        this.setState = {
            isLoading: false
        }
    }

    //获取当前日期
    getmyDate() {
        var date = new Date();

        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        var day = date.getDate().toString();

        if (month.length === 1) {
            month = "0" + month
        }

        if (day.length === 1) {
            day = "0" + day
        }

        var theDay = [year, month, day];

        return theDay;
    };

    render() {
        var api = 'https://news-at.zhihu.com/api/3/stories/latest';

        fetch(api).then((response) => response.json()).then((result) => {
            this.setState({
                list: result.stories
            })
        })
            .catch(function (error) {
                console.log(error);
            });

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('News', {
                        url: item.url,
                        id: item.id,
                    })}
                >
                    <View style={[styles.container]}>
                        <View style={{ flex: 2.8 }}>
                            <Text style={[styles.title]}
                                numberOfLines={2}
                            >
                                {item.title}
                            </Text>
                            <Text style={[styles.hint]}> {item.hint} </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={[styles.images]}
                                source={{ uri: item.images[0] }}
                            />
                        </View>
                    </View>
                    <View style={[styles.separate]}></View>
                </TouchableOpacity>
            )
        }

        var theDay = this.getmyDate()
        var day = theDay[0] + theDay[1] + theDay[2]

        return (
            <SafeAreaView style={{ backgroundColor: 'white', height: 750 }}>
                <View style={{ height: 50, flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View>
                        <Text style={[styles.dateHeadDay]}> {theDay[2]} </Text>
                        <Text style={[styles.dateHeadMonth]}> {theDay[1]}月 </Text>
                    </View>
                    <View>
                        <Text style={[styles.header]}> 知乎日报 </Text>
                    </View>
                </View>
                <View style={[styles.separate]}></View>
                <FlatList
                    data={this.state.list}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    //下拉刷新，回到今日新闻
                    refreshing={this.state.isLoading}
                    onRefresh={this.backToToday}
                //下拉加载，查看昨日新闻
                //onEndReachedThreshold我试的时候好像很敏感，0.01都会直接触发，0完全不触发，没用明白，所以底部用了个按钮代替
                // onEndReachedThreshold={0.1}      //距离底部的百分比
                // onEndReached={this.props.navigation.navigate('Before', { date: day })}
                />
                <Text style={[styles.dateFoot]} > {theDay[1]}月{theDay[2]}日 </Text>
                <Button
                    title='查看昨日新闻'
                    onPress={() => this.props.navigation.navigate('Before', {
                        date: day,
                    })}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        width: Dimensions.get('window').width,
    },

    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    hint: {
        fontSize: 15,
        color: 'grey',
    },

    dateHeadDay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    dateHeadMonth: {
        fontSize: 15,
        color: 'black',
    },

    dateFoot: {
        fontSize: 20,
        color: 'grey',
    },

    images: {
        height: 100,
        width: 100,
    },

    separate: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        height: 30,
        width: 400
    },

    end: {
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontStyle: 'italic',
        color: 'black'
    }
})