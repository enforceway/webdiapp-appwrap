import React, { Component } from 'react';
import { ScrollView, FlatList, StyleSheet, Text, View, Alert, Button, Image, ImageBackground, Animated } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native'
import axios from 'axios'

axios.create();

declare  interface StateDeclarer {
  [index: string]: any;
}

declare interface MovieItem {
  id?: string;
  title?: string;
  score?: string;
  comment_fan_number?: string;
  releaseYear?: string;
  director?: string;
  thumb_nail?: string;
}
 
declare interface MovieItemArray {
  [index: number]: MovieItem;
}

async function requestPermission() {
  try {
      // 这里写的都是已进入软件就要获取的权限
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_NETWORK_STATE
      )
      // Alert.alert("end:" + granted);
      // const granted4 = await PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.CAMERA,
      // )
      return [granted];
  } catch (err) {
      // alert("err",err);
      console.warn(err, '错误警告')
  }
}

export default class FlatListBasics extends Component {
  state: StateDeclarer;
  navigation: any;
  constructor(props: any) {
    super(props);
    this.state = {
      movies: [],
      errorMsg: '',
      scaleAnimate: null
    };
    this.createRequest = this.createRequest.bind(this);
    this.getMovieData = this.getMovieData.bind(this);
  }

  componentDidMount() {
    // if (Platform.OS === 'android') {
      //Calling the permission function
     
      // requestPermission().then((grants) => {
        this.getMovieData();
      // })
    // } else {
        // alert('IOS device found');
    // }
  }

  createRequest(type= '1') {
    let url = 'https://www.enforceway.com/data/movies.json'

    if(type == '1') {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
          if (request.readyState !== 4) {
            return;
          }
  
          if (request.status === 200) {
            resolve(JSON.parse(request.responseText));
            // console.log('success', request.responseText);
          } else {
            let {errorMsg} = this.state;
            this.setState({
              errorMsg: request.responseText + '\n+++\n' + errorMsg
            });
            // console.warn('error');
          }
        };
        request.onerror = (error) => {
          let {errorMsg} = this.state;
          this.setState({
            errorMsg: JSON.stringify(error) + '\n~~~\n' + errorMsg
          });
        }
  
        request.open('GET', url);
        request.send();
      });
    } else {
      return fetch(url)
      .then((response) => {
        return response.json();
      }).catch((error) => {
        let {errorMsg} = this.state;
        this.setState({
          errorMsg: JSON.stringify(error) + '\n---\n' + errorMsg //{line: 132, column: 7285, sourceUrl: "index.android.bundle"}
        });
      });
    }




    // return axios.get(url)
    // .then(function (response) {
    //   return response.data;
    // })
    // .catch((error) => {
    //   this.setState({
    //     errorMsg: error.stack
    //   });
    //   return error;
    // });
  }

  getMovieData() {
    Alert.alert('~~~loading movie datas~~~');
    // this.createRequest('2');
    this.createRequest('2').then((responseJson: any) => {
      let movies: MovieItemArray = responseJson.movies;
      this.setState({
        "movies": movies
      });
      return movies;
    })
  }
  render() {
    let { movies } = this.state;
    let { errorMsg } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>{errorMsg?errorMsg:""}</Text>
        <FlatList
          data={movies}
    renderItem={({item, index}) => {
          return (<View style={styles.movieitemcontainer}>
              <Text style={styles.index}>{index}</Text>
              <Image source={{uri: item.thumb_nail}} style={styles.thumbnail}></Image>
              <View style={styles.moviedesccontainer}>
                <Text style={styles.movieitemdesc}>{item.title} / {item.releaseYear}</Text>
                <View style={styles.movieitemcontainer}>
                  <Button
                    title="item.title"
                    onPress={() => {
                      // console.log("~~~~~~~~~~~~~~~~");
                      // console.log(navigation);
                      navigation.navigate('DetailScreen');
                    }}
                  />
                  <ImageBackground style={styles.rtbg} source={{uri: `https://www.enforceway.com/data/movie/ic_rating_s@2x.png`}}>
                  </ImageBackground>
                  <Text style={styles.rtscore}>{item.score}</Text>
                </View>
              </View>
            </View>)}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 53,
    height: 81
  },
  moviedesccontainer: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  movieitemcontainer: {
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: "#eeff",
    borderStyle: "solid",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#F5FCFF"
  },
  container: {
   flex: 1,
   paddingTop: 22
  },
  rtscore: {
    transform: [
      {   //偏移效果
          translateX: 100
      }
    ],
  },
  rtbg: {
    height: 20,
    width: 100
  },
  movieitemdesc: {
    fontSize: 12,
    color: "#666"
  },
  index: {
    fontStyle: "italic",
    fontSize: 12,
    paddingLeft: 6,
    paddingRight: 8,
    paddingTop: 0
  },
})