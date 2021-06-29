/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet, Dimensions, ScrollView,SafeAreaView, ImageBackground, TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons, FontAwesome,SimpleLineIcons, Foundation } from '@expo/vector-icons';

const {width, height} = Dimensions.get('screen');
const {Marker} = MapView;

const campings = [
  {
    id: 1,
    type: 'rv',
    name: 'Camping Paradise',
    description: 'Popular spot for trekkers',
    ratings: 4.9,
    distance: 2.9,
    price: 'Free',
    image:'https://images.unsplash.com/photo-1500220959218-81a28e9292d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
    latlng:{
      latitude: 37.78825,
      longitude: -122.4324,
    }
  },
  {
    id: 2,
    type: 'tent',
    name: 'Lake Florida',
    description: 'For all sunset lovers',
    ratings: 4.9,
    distance: 2.9,
    price: 'Free',
    image:'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
    latlng:{
      latitude: 37.79865,
      longitude: -122.4324,
    }
  },
];

export default class Campings extends Component {
  static navigationOptions={
    headerShown: false
  }

  state={
    active: 'all',
    campings: campings,
  }

  handleTab=(tabKey)=>{

    let newCampings = campings;
    if (tabKey !== 'all'){
      newCampings = campings.filter((camping) => camping.type === tabKey);
    }
    this.setState({active: tabKey, campings: newCampings});
  }

  renderHeader(){
    return(
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{flex: 2, flexDirection:'row'}}>
            <View style={styles.settings}>
              <View style={styles.location}>
                <FontAwesome name='location-arrow' size={14} color="white"/>
              </View>
            </View>

            <View style={styles.option}>
              <Text style={{fontSize: 12, color: 'grey', marginBottom: 5}}> Detected Location  </Text>
              <Text style={{fontSize: 14, fontWeight: '300'}}> Accra Ghana () </Text>
            </View>
          </View>
          <View style={styles.settings}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Settings')}>
              <Ionicons name='ios-settings' size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {this.renderTabs()}
      </View>
    );
  }

  renderMap(){
    const campingMarker = ({type}) => (
      <View style={[styles.marker, styles[`${type}Marker`]]}>
        {type === 'rv' ? <FontAwesome name="truck" size={18} color='#FFF'/> :
          <Foundation name="mountains" size={18}  color='#FFF'/>
        }
      </View>
    );
    return(
      <View style={styles.map}>
        <MapView
          showsMyLocationButton
          style={{ flex: 1, height: height * 0.5, width }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.campings.map((marker) => (
            <Marker key={`marker-${marker.id}`} coordinate={marker.latlng}
            >
              {campingMarker(marker)}
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }



  renderTabs(){
    const {active } = this.state;
    return(
      <View style={styles.tabs}>
        <View style={[styles.tab, active === 'all' ? styles.activeTab : null]}>
          <Text style={[styles.tabTitle, active === 'all' ? styles.activeTabTitle : null]} onPress={()=> this.handleTab( 'all')}>All Spots</Text>
        </View>

        <View style={[styles.tab, active === 'tent' ? styles.activeTab : null]}>
          <Text style={[styles.tabTitle, active === 'tent' ? styles.activeTabTitle : null]} onPress={()=> this.handleTab( 'tent')}>Tenting</Text>
        </View>

        <View style={[styles.tab, active === 'rv' ? styles.activeTab : null]}>
          <Text style={[styles.tabTitle, active === 'rv' ? styles.activeTabTitle : null]} onPress={()=> this.handleTab( 'rv')}>RV Camping</Text>
        </View>

      </View>
    );
  }

  renderList(){


    return(
      this.state.campings.map((camping) => {
        return(
          <View key={`camping-${camping.id}`} style={styles.camping}>
            {/*  <View style={{flex: 1, borderRadius: 14}}> */}
            <ImageBackground
              style={styles.campingImage}
              imageStyle={styles.campingImage}
              source={{uri:camping.image}}/>
            {/*  </View> */}

            <View style={styles.campingDetails}>
              <View style={{flex: 1, flexDirection: 'column', justifyContent:'center'}}>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  {camping.name}
                </Text>
                <Text style={{fontSize: 12, color: 'grey', paddingTop:5}}>
                  {camping.description}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.campingInfo} >
                  <FontAwesome name='star' color='orange' size={12}/>
                  <Text style={{marginLeft: 4, color:'orange'}}> {camping.ratings} </Text>
                </View>
                <View style={styles.campingInfo} >
                  <FontAwesome name='location-arrow' color='red' size={12}/>
                  <Text style={{marginLeft: 4, color:'red'}}> {camping.distance} miles </Text>
                </View>
                <View style={styles.campingInfo} >
                  <Ionicons name='md-pricetag' color='black' size={12}/>
                  <Text style={{marginLeft: 4, color:'black'}}> {camping.price} </Text>
                </View>
              </View>
            </View>
            <View style={{flex: 0.2, justifyContent: 'center'}}>
              <SimpleLineIcons name='options-vertical' color='grey' size={24}/>
            </View>
          </View>
        );
      })

    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>
          {this.renderMap()}
          {this.renderList()}
        </ScrollView>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map:{
    flex:1
  },
  headerContainer:{
    //zIndex: 2,
    //backgroundColor: '#fff',
    //position: 'absolute',
    //left:0,
    //right:0,
    top:0,
    height: height * 0.15,
    width: width

  },
  header:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.15,
    //backgroundColor: 'pink',
    paddingHorizontal: 14
  },
  location:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
    backgroundColor: 'blue',
    borderRadius: 16
  },
  marker:{
    width: 36,
    height: 36,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF'
  },
  rvMarker:{
    backgroundColor: 'orange',
  },
  tentMarker:{
    backgroundColor: 'blue',
  },
  settings:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  option:{
    flex: 1,
    paddingHorizontal: 14
  },
  tabs:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    //height: height * 0.04
  },
  tab:{
    paddingHorizontal: 14,
    marginHorizontal: 10
  },
  tabTitle:{
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10
  },
  activeTab:{
    borderBottomColor: 'blue',
    borderBottomWidth: 2
  },
  activeTabTitle:{
    color: 'blue'
  },
  camping: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.5,
    padding: 20
  },
  campingDetails:{
    flex: 2,
    paddingLeft: 14,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  campingInfo:{

    flexDirection: 'row',
    alignItems:'center',
    marginRight: 14
  },
  campingImage:{
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 8
  }
});
