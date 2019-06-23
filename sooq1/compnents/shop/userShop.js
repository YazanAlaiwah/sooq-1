import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../header';
import Footer from '../footer';

export default class UserShop extends Component {
	constructor(props) {
		super(props);
		this.state = { email: 'Ss', password: '123', token: '', id: '' };
	}

	test() {
		console.warn('clicked', this.state.email, this.state.password);
		return fetch(`http://192.168.0.14:3000/signin?email=${this.state.email}&&password=${this.state.password}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then((data) => data.json())
			.then((data) => {
				this.setState({
					token: data.token,
					id: data.data.id
				});
				console.warn(data.data.id);
				var id = data.data.id;
				const saveUserId = async (userId) => {
					try {
						AsyncStorage.setItem('userId', this.state.id.toString());
						AsyncStorage.setItem('token', this.state.token);
					} catch (error) {
						console.log(error.message);
					}
					Actions.home();
				};
				saveUserId();
			});
	}

	test1() {
		AsyncStorage.getItem('token').then((value) => {}).catch((error) => {
			console.warn(error);
		});
	}

	render() {
		return (
			<View>
				<Header />
				<Image source={{ uri: this.state.img }} style={styles.img} />
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
	},
	containerInfo: {
		backgroundColor: '#FDFEE8'
	},
	img: { width: '100%', height: 300 }
});
