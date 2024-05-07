import {
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from "react-native";
import React, { Component } from "react";
import { mapStyle } from "../global/mapStyle";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors, parameters } from "../global/styles";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Icon } from "react-native-elements";
import { carTypeData } from "../global/data";
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class MapComponent extends Component {
  constructor() {
    super();
    this.state = {};

    this._map = React.createRef(35);
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.props.userDestination.latitude !== null) {
        this._map.current.fitToCoordinates(
          [this.props.userOrigin, this.props.userDestination],
          {
            edgePadding: { top: 450, right: 50, left: 50, bottom: 350 },
            animated: true,
          }
        );
      }
    }, 500);
  }

  render() {
    return (
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={
            this.props.userOrigin.latitude != null &&
            this.props.userDestination.latitude !== null
              ? styles.mapHalfScreen
              : styles.mapFullScreen
          }
          customMapStyle={mapStyle}
          ref={this._map}
        >
          {this.props.userOrigin.latitude != null && (
            <Marker
              coordinate={this.props.userOrigin}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <Image
                style={styles.markerOrigin2}
                resizeMode="cover"
                source={require("../../assets/location.png")}
              />
            </Marker>
          )}

          {this.props.userDestination.latitude != null && (
            <Marker
              coordinate={this.props.userDestination}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <Image
                style={styles.markerDestination}
                resizeMode="cover"
                source={require("../../assets/location.png")}
              />
            </Marker>
          )}
          {this.props.userDestination.latitude !== null && (
            <MapViewDirections
              origin={this.props.userOrigin}
              destination={this.props.userDestination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={6}
              strokeColor={"#32404c"}
            />
          )}
        </MapView>

        {this.props.userOrigin.latitude != null &&
          this.props.userDestination.latitude !== null && (
            <ScrollView bounces={true}>
              <View>
                <View style={styles.view3}>
                  <View style={styles.view6}>
                    <View style={styles.view7}>
                      <Icon
                        type="material-community"
                        name="map-marker"
                        color={colors.black}
                        size={22}
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: 18, color: colors.black }}>
                       Distance to destination
                      </Text>
                      <Text style={{ color: colors.grey3 }}>
                        Kimathi Street
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Icon
                      type="material-community"
                      name="chevron-right"
                      color={colors.grey}
                      size={26}
                    />
                  </View>
                </View>
                <FlatList
                  numRows={4}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={carTypeData}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => {
                        //navigation.navigate("RequestScreen");
                      }}
                    >
                      <View style={styles.card}>
                        <View style={styles.view2}>
                          <Image style={styles.image2} source={item.image} />
                        </View>
                        <View>
                          <Text style={{ color: colors.black, fontSize: 16, borderBottomColor:colors.grey4,
    borderBottomWidth: 1, }}>
                            {item.name}
                          </Text>
                          <Text style={{fontSize: 12}}>{item.title} <Text style={{fontStyle:'italic'}}>/= {(14*item.price).toFixed(2)}</Text></Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </ScrollView>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapHalfScreen: {
    height: "58%",
    width: "100%",
  },

  mapFullScreen: {
    height: "100%",
    width: "100%",
  },

  markerWrapOrigin: {
    //  alignItems: "center",
    // justifyContent: "center",
    width: 40,
    height: 20,
    // marginTop:0
  },
  markerOrigin: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },

  destination: {
    width: 20,
    height: 20,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  view1: {
    width: 7,
    height: 7,
    backgroundColor: colors.white,
  },
  markerDestination: {
    width: 16,
    height: 16,
  },

  markerOrigin2: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  car: {
    paddingTop: 0,
    width: 40,
    height: 20,
  },

  view2: {
    position: "absolute",
    top: 10,
    right: 12,
    backgroundColor: colors.white,
    height: 40,
    width: 180,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    zIndex: 8,
  },
  view3: {
    flexDirection: "row",
    alignItems: "center",
    //marginRight:15,
    //backgroundColor:"white",
    //paddingHorizontal:2,
    paddingVertical: 2,
    //borderRadius:20
  },

  view4: {
    position: "absolute",
    top: 50,
    left: 12,
    backgroundColor: colors.white,
    height: 40,
    width: 140,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    zIndex: 8,
  },

  location: {
    width: 20,
    height: 20,
    borderRadius: 9,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    // flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 145,
    paddingTop: parameters.statusBarHeight,
  },
  header: {
    backgroundColor: colors.blue,
    height: parameters.headerHeight,
    alignItems: "flex-start",
  },

  image1: {
    height: 100,
    width: 100,
  },
  image2: { height: 60, width: 60, borderRadius: 30 },

  home: {
    backgroundColor: colors.blue,
    paddingLeft: 20,
  },

  text1: {
    color: colors.white,
    fontSize: 21,
    paddingBottom: 20,
    paddingTop: 20,
  },

  text2: {
    color: colors.white,
    fontSize: 16,
  },
  view1: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 30,
  },

  button1: {
    height: 40,
    width: 150,
    backgroundColor: colors.black,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  button1Text: {
    color: colors.white,
    fontSize: 17,
    marginTop: -2,
  },

  view2: { marginBottom: 5, borderRadius: 15, backgroundColor: colors.grey6 },

  title: {
    color: colors.black,
    fontSize: 16,
  },
  view3: {
    flexDirection: "row",
    marginTop: 5,
    height: 50,
    backgroundColor: colors.grey6,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  text3: { marginLeft: 15, fontSize: 20, color: colors.black },

  view4: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },
  view5: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 25,
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderBottomColor: colors.grey4,
    borderBottomWidth: 1,
    flex: 1,
  },

  view6: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
  },
  view7: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  text4: {
    fontSize: 20,
    color: colors.black,
    marginLeft: 20,
    marginBottom: 20,
  },
  card: {
    alignItems: "center",
    margin: SCREEN_WIDTH / 22,
  },
  icon1: { marginLeft: 10, marginTop: 5 },

  view8: { flex: 4, marginTop: -25 },
  carsAround: {
    width: 28,
    height: 14,
  },
  location: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  view9: { width: 4, height: 4, borderRadius: 2, backgroundColor: "white" },
});
