import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
var t = require('tcomb-form-native');

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '', phonenumber: '', location: '', name: '' };
	}

	test() {
		console.warn('clicked', this.state.email, this.state.password);
		fetch(`http://192.168.0.14:3000/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(this.state)
		})
			.then((data) => {
				// console.warn(data);
				return data.json();
			})
			.then((data) => {
				// console.log('hello')
				console.warn(data);
			})
			.catch(function(error) {
				console.warn('There has been a problem with your fetch operation: ' + error.message);
				// ADD THIS THROW error
				throw error;
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.containerInfo}>
					<Text>email</Text>
					<TextInput
						style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
						onChangeText={(email) => this.setState({ email })}
						placeholder="EX.email@gmail.com"
					/>
					<Text>password</Text>
					<TextInput
						style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
						onChangeText={(password) => this.setState({ password })}
						placeholder="********"
					/>
					<Text>phonenumber</Text>
					<TextInput
						style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
						onChangeText={(phonenumber) => this.setState({ phonenumber })}
						placeholder="0785523"
					/>
					<Text>location</Text>
					<TextInput
						style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
						onChangeText={(location) => this.setState({ location })}
						placeholder="amman"
					/>
					<Text>username</Text>
					<TextInput
						style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
						onChangeText={(name) => this.setState({ name })}
						placeholder="amman"
					/>
					<Text style={{ color: 'blue' }} onPress={() => Actions.login()}>
						login
					</Text>

					<Button onPress={this.test.bind(this)} title="login" />
				</View>
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
	}
});
