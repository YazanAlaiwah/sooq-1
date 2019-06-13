import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image } from 'react-native';
// import Login from './compnents/login';
// import Signup from './compnents/signup';
// import Home from './compnents/homePage';
// import SpacficCategory from './compnents/spacficCategoty';
import { Actions } from 'react-native-router-flux';
import Footer from './footer';
// import { Router, Scene } from 'react-native-router-flux';

export default class UserPage extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
				<View style={{ backgroundColor: 'green', height: 23 }} />

				<ScrollView>
					<View style={{ backgroundColor: 'black', width: 360, height: 70 }} />
					<View style={{ height: 200 }}>
						<ImageBackground
							source={{
								uri:
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxkGrpFSI8Qea8heiy5ouyzNyZWbTVXG1Xkjk4_ArpAtvaWKQpog'
							}}
							style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}
						>
							<Image
								source={{
									uri:
										'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxkGrpFSI8Qea8heiy5ouyzNyZWbTVXG1Xkjk4_ArpAtvaWKQpog'
								}}
								style={{ width: 150, height: 150, borderRadius: 100 }}
								// blurRadius={100}
							/>
						</ImageBackground>
					</View>

					<View
						style={{
							// backgroundColor: 'red',
							width: 360,
							height: 90,
							justifyContent: 'space-around',
							flexDirection: 'row',
							alignItems: 'stretch',
							borderRadius: 6,
							borderWidth: 0.5,
							borderColor: 'black'
						}}
					>
						<View>
							<Text>you'r name:</Text>
							<Text>berthday:</Text>
							<Text>location:</Text>
						</View>
						<View>
							<Text>Yazan aliwah</Text>
							<Text>26/6/1996</Text>
							<Text>amman</Text>
						</View>
						<View>
							<Text>dsfaf</Text>
						</View>
					</View>
					<View />
				</ScrollView>
				<Footer />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
