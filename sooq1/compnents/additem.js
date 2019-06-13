import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from './header';
import { ImagePicker } from 'expo';
export default class AddItem extends Component {
	constructor(props) {
		super(props);
	}
	onChooseImageUploud = async () => {
		let result = await ImagePicker.launchCameraAsync();
		// let result = await ImagePicker.launchImageLibraryAsync();

		if (!result.cancelled) {
			this.uploudImage(result.uri, 'test-image')
				.then(() => {
					Alert.alert('good');
				})
				.catch((err) => {
					Alert.alert(err);
				});
		}
	};

	uploudImage = async (uri, imageName) => {
		const response = await fetch(uri);
		const blob = await response.blob();

		var ref = firebase.storage().ref().child('items/' + imageName);
		return ref.put(blob);
	};

	render() {
		return (
			<View>
				<Header />
				<Button title="chosee image.." onPress={this.onChooseImageUploud} />
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
