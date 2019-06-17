import React, { Component } from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import { ImagePicker } from 'expo';
import { dbh } from '../../server/database/apikeycnfig';

export default class UploudImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img:
				'https://firebasestorage.googleapis.com/v0/b/mobishop-ffcff.appspot.com/o/items%2Fqury.png?alt=media&token=a30d14fe-888b-4158-b0d0-473a6f9f7f73'
		};
	}

	onChooseImageUploud = async () => {
		let result = await ImagePicker.launchCameraAsync();
		if (!result.cancelled) {
			this.uploudImage(result.uri, 'test-image');
		}
	};
	onChooseImageUploud2 = async () => {
		let result = await ImagePicker.launchImageLibraryAsync();
		if (!result.cancelled) {
			this.uploudImage(result.uri, 'test-image');
		}
	};

	uploudImage = async (uri, imageName) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		if (blob) {
			var uploadTask = dbh.ref(`items/${blob._data.name}`).put(blob);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// console.warn(snapshot, 'dsflkdsfl');
					//progress function ....
					//   const progress = Math.round(
					//     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					//   );
					//   this.setState({ progress });
				},
				(error) => {
					// error function ....
					// console.warn(error);
				},
				() => {
					dbh.ref('items').child(blob._data.name).getDownloadURL().then((imgUrl) => {
						this.setState({
							img: imgUrl
						});
						this.props.UploudImage(imgUrl);
					});
				}
			);
		}
	};

	render() {
		return (
			<View style={styles.contanir}>
				<Image source={{ uri: this.state.img }} style={styles.img} />

				<View style={styles.button_contanir}>
					<View style={styles.button_contanir1}>
						<View style={styles.button}>
							<Button title="take image.." onPress={this.onChooseImageUploud} color="black" />
						</View>
						<View style={styles.button}>
							<Button title="chosee image.." onPress={this.onChooseImageUploud2} color="black" />
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	contanir: { flex: 1, flexDirection: 'column', alignItems: 'center', width: '100%' },
	img: { width: '100%', height: 300 },
	button_contanir: { flex: 1, flexDirection: 'row' },
	button_contanir1: { flex: 1, flexDirection: 'row' },
	button: {
		width: '50%',
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff'
	}
});
