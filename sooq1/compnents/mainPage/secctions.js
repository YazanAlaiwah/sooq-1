import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
var arr = require('../../data/sections.js');

export default class Sections extends Component {
	constructor(props) {
		super(props);
		this.state = { email: 'Ss', password: '123' };
	}

	cato(e) {
		// console.warn(e);
		fetch(`http://192.168.0.14:3000/spaceficCategory?type=${e}`).then((data) => data.json()).then((data) => {
			// console.warn(data);
			Actions.spacficCategory({ text: data });
		});
	}

	render() {
		return (
			<View style={styles.maincontainer}>
				{arr.map((item) => {
					return (
						<TouchableOpacity
							name="dsfdsf"
							onPress={this.cato.bind(this, item.section)}
							style={styles.container1}
							key={item.section}
						>
							<View style={styles.container_map}>
								<Image
									source={{
										uri: item.uri
									}}
									style={styles.photo}
								/>
								<View style={styles.container_text}>
									<Text style={styles.title}>{item.section}</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	maincontainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		flex: 1
	},
	container1: {
		marginTop: 100,
		flex: 1,
		flexDirection: 'row',

		marginLeft: 16,
		marginRight: 16,
		marginTop: 8,
		marginBottom: 8,
		borderRadius: 20,
		backgroundColor: '#FFF',
		elevation: 2
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
		width: 150
	},
	container_map: {
		flexDirection: 'row',
		flex: 1,
		borderRadius: 20,
		backgroundColor: '#FEFBF1'
	}
});
