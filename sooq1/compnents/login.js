import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '', token: '', id: '' };
	}

	test() {
		//will check from the user email and password
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
				//will save the user id and the token in the Storage if the user email and password correct
				const saveUserId = async (userId) => {
					try {
						AsyncStorage.setItem('userId', this.state.id.toString());
						AsyncStorage.setItem('token', this.state.token);
					} catch (error) {
						console.log(error.message);
					}
					//will navigate you to main page
					Actions.home();
				};
				saveUserId();
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 40, color: 'grey' }}>Login</Text>
				<View style={styles.containerInfo}>
					<Text>email</Text>
					<TextInput
						style={{ height: 40, width: 210, borderColor: 'gray', borderWidth: 1, borderRadius: 10 }}
						onChangeText={(email) => this.setState({ email })}
						placeholder="EX.email@gmail.com"
					/>
					<Text>password</Text>
					<TextInput
						style={{ height: 40, width: 210, borderColor: 'gray', borderWidth: 1, borderRadius: 10 }}
						onChangeText={(password) => this.setState({ password })}
						placeholder="********"
					/>
					{/* when you click the text will navigate you to signup page */}
					<Text style={{ color: 'blue', fontSize: 15 }} onPress={() => Actions.signup()}>
						signup
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
		backgroundColor: '#ffffff',
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
