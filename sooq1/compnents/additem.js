import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from './header';
import { ImagePicker } from 'expo';
import { dbh } from '../server/database/apikeycnfig';
// import console = require('console');
export default class AddItem extends Component {
	constructor(props) {
		super(props);
	}
	onChooseImageUploud = async () => {
		console.warn('camer');
		// let result = await ImagePicker.launchCameraAsync();
		let result = await ImagePicker.launchImageLibraryAsync();

		if (!result.cancelled) {
			console.warn('if');
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

		if (blob) {
			var uploadTask = dbh.ref(`items/${uri.name}`).put(blob);
			console.warn(blob, imageName);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					console.warn(snapshot, 'dsflkdsfl');
					//progress function ....
					//   const progress = Math.round(
					//     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					//   );
					//   this.setState({ progress });
				},
				(error) => {
					// error function ....
					console.warn(error);
				},
				() => {
					console.warn('kfjkjkjkj');
					// complete function ....
					storage.ref('images').child(image.name).getDownloadURL().then((imgUrl) => {
						setTimeout(() => {
							this.setState({ imgUrl, progress: 0 }, () => this.props.changeImg(this.state.imgUrl));
						}, 2000);
					});
				}
			);
		}
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
