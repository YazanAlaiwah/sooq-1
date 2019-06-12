import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
var arr = require('../data/sections.js');
import Header from './header';
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { email: 'Ss', password: '123' };
		// this.cato = this.cato.bind(this);
	}
	_menu = null;

	setMenuRef = (ref) => {
		this._menu = ref;
	};

	hideMenu = () => {
		console.warn(arr);
		this._menu.hide();
	};

	showMenu = () => {
		this._menu.show();
	};
	cato(e) {
		// console.warn(e);
		fetch(`http://192.168.0.14:3000/spaceficCategory?type=${e}`).then((data) => data.json()).then((data) => {
			Actions.spacficCategory({ text: data });
		});
	}

	render() {
		return (
			<ScrollView>
				<View>
					<Header />
					<View style={styles.maincontainer}>
						{arr.map((item) => {
							return (
								<TouchableOpacity
									name="dsfdsf"
									onPress={this.cato.bind(this, item.section)}
									style={styles.container1}
									key={item.section}
								>
									<View style={styles.container1}>
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
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	containerInfo: {
		backgroundColor: '#FDFEE8'
	},
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
		padding: 10,
		marginLeft: 16,
		marginRight: 16,
		marginTop: 8,
		marginBottom: 8,
		borderRadius: 5,
		backgroundColor: '#FFF',
		elevation: 2
	},
	title: {
		fontSize: 30,
		color: '#000'
	},
	container_text: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: 12,
		justifyContent: 'center'
	},
	description: {
		fontSize: 11,
		fontStyle: 'italic'
	},
	photo: {
		height: 130,
		width: 130
	}
});
