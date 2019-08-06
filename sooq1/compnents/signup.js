import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '', phonenumber: '', location: '', name: '' };
	}
	//this part to send the email, password, phonenumber, location, and name of the user to sign up
	test() {
		fetch(`http://192.168.0.14:3000/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(this.state)
		})
			.then((data) => {
				return data.json();
			})
			.catch(function(error) {
				console.warn('There has been a problem with your fetch operation: ' + error.message);
				throw error;
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 40, color: 'grey' }}>Signup</Text>
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
		backgroundColor: '#DCDCDC',
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 10,
		padding: 10
	}
});
