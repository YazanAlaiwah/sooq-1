import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
var arr = require('../../data/sections.js');

export default class Sections extends Component {
	constructor(props) {
		super(props);
		this.state = { email: 'Ss', password: '123' };
	}
	//this part to have the supcategory and send it to subCategory component when the user click in the secction
	cato(e) {
		fetch(`http://192.168.0.14:3000/spaceficCategory?type=${e}`).then((data) => data.json()).then((data) => {
			Actions.spacficCategory({ text: data });
		});
	}

	render() {
		return (
			<View style={styles.maincontainer}>
				<View style={{ flexDirection: 'column', flex: 1 }}>
					{arr.map((item, i) => {
						if (i % 2 === 0) {
							return (
								<TouchableOpacity
									name="dsfdsf"
									onPress={this.cato.bind(this, item.section)}
									style={styles.container1}
									key={item.section}
								>
									<View
										style={{
											borderRadius: 20,
											paddingTop: 5,
											paddingBottom: 0,
											paddingLeft: 3,
											paddingRight: 3
										}}
									>
										<ImageBackground
											imageStyle={{ borderRadius: 10 }}
											source={{ uri: item.uri }}
											style={styles.photo}
										>
											<View
												style={{
													backgroundColor: 'white',
													width: 130,
													marginLeft: 5,
													marginTop: 5,
													borderRadius: 10,
													paddingLeft: 3
												}}
											>
												<Text style={{ fontFamily: 'sans-serif-medium' }}>{item.section}</Text>
											</View>
										</ImageBackground>
									</View>
								</TouchableOpacity>
							);
						}
					})}
				</View>
				<View style={{ flexDirection: 'column', flex: 1 }}>
					{arr.map((item, i) => {
						if (i % 2 !== 0) {
							return (
								<TouchableOpacity
									name="dsfdsf"
									onPress={this.cato.bind(this, item.section)}
									style={styles.container1}
									key={item.section}
								>
									<View
										style={{
											borderRadius: 20,
											paddingTop: 5,
											paddingBottom: 0,
											paddingLeft: 5,
											paddingRight: 5
										}}
									>
										<ImageBackground
											imageStyle={{ borderRadius: 10 }}
											source={{ uri: item.uri }}
											style={styles.photo}
										>
											<View
												style={{
													backgroundColor: 'white',
													width: 130,
													marginLeft: 5,
													marginTop: 5,
													borderRadius: 10,
													paddingLeft: 3
												}}
											>
												<Text style={{ fontFamily: 'sans-serif-medium' }}>{item.section}</Text>
											</View>
										</ImageBackground>
									</View>
								</TouchableOpacity>
							);
						}
					})}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	maincontainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch',
		flex: 1
	},

	title: {
		fontSize: 35,
		color: '#000',
		fontFamily: 'Roboto'
	},
	container_text: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: 12,
		justifyContent: 'center'
	},

	photo: {
		height: 150,
		width: '100%'
	}
});
