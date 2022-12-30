import React, { Component, useState } from 'react'
import { Button, Text, StyleSheet, View, Dimensions, SafeAreaView, Alert, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);


export default class Before extends Component {

    constructor() {
        super();

        this.state = {
            isLoading: false,
            list: []
        }
    }

    backToToday = () => {
        this.setState({
            isLoading: true
        })

        setTimeout(() => {
            this.props.navigation.push('Home')
            this.setState({
                isLoading: false
            })
        }, 2000);
    }

    render() {

        var date0 = this.props.route.params.date

        var year = Number(date0.substr(0, 4))
        var month = Number(date0.substr(4, 2))
        var day = Number(date0.substr(6, 2))

        day = day - 1
        if (day === 0) {
            if (month === 2 || month === 4 || month === 6 || month === 8 || month === 9 || month === 11) {
                month = month - 1
                day = 31
            }
            else if (month === 1) {
                year = year - 1
                month = 12
                day = 31
            }
            else if (month === 5 || month === 7 || month === 10 || month === 12) {
                month = month - 1
                day = 30
            }
            else {
                if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
                    month = month - 1
                    day = 29
                }
                else {
                    month = month - 1
                    day = 28
                }
            }
        }

        year = year.toString()
        month = month.toString()
        day = day.toString()

        if (month.length === 1) {
            month = "0" + month
        }

        if (day.length === 1) {
            day = "0" + day
        }

        var theDay = [year, month, day]
        var date = theDay[0] + theDay[1] + theDay[2]

        var api = 'https://news-at.zhihu.com/api/3/news/before/' + date0;

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
                    refreshing={this.state.isLoading}
                    onRefresh={this.backToToday}
                />
                <Text style={[styles.dateFoot]} > {theDay[1]}月{theDay[2]}日 </Text>
                <Button
                    title='查看昨日新闻'
                    onPress={() => this.props.navigation.push('Before', {
                        date: date,
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