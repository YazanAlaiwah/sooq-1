import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, Picker, ScrollView, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../header';
import { ImagePicker } from 'expo';
import { dbh } from '../../server/database/apikeycnfig';
import Footer from '../footer';

export default class AddItemShop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopId: '',
			img:
				'https://firebasestorage.googleapis.com/v0/b/mobishop-ffcff.appspot.com/o/items%2Fqury.png?alt=media&token=a30d14fe-888b-4158-b0d0-473a6f9f7f73',
			type: 'others',
			specficArr: [],
			specfic: '',
			checked: false,
			descrbtion: '',
			title: '',
			cost: '',
			showSpecfic: false
		};
	}

	componentWillMount() {
		this.setState({
			shopId: this.props.shopId
		});
	}
	select(itemValue) {
		this.setState({
			type: itemValue,
			showSpecfic: !this.state.showSpecfic
		});
		// console.warn(itemValue);
		fetch(`http://192.168.0.14:3000/seeSpicfic?type=${itemValue}`).then((data) => data.json()).then((data) => {
			var arr = [];
			for (let i = 0; i < data.length; i++) {
				arr.push({ label: data[i].specfic, value: data[i].specfic });
			}
			// console.warn(data);
			// console.warn(this.state.specfic);
			this.setState({
				specficArr: arr
			});
		});
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
				(snapshot) => {},
				(error) => {},
				() => {
					dbh.ref('items').child(blob._data.name).getDownloadURL().then((imgUrl) => {
						this.setState({
							img: imgUrl
						});
					});
				}
			);
		}
	};

	done() {
		fetch('http://192.168.0.14:3000/additemshop', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(this.state)
		})
			.then((data) => data.json())
			.then((data) => console.warn(data));
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
				<ScrollView>
					<Header />
					<View>
						<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
							{/* <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}> */}
							<View style={{ height: 300 }}>
								<Image source={{ uri: this.state.img }} style={{ width: '100%', height: 300 }} />
							</View>
							<View style={{ flex: 1, flexDirection: 'row' }}>
								<View style={{ fex: 1, flexDirection: 'row' }}>
									<View
										style={{
											width: '50%',
											height: 20,
											borderRadius: 10,
											borderWidth: 1,
											borderColor: '#fff'
										}}
									>
										<Button title="take image.." onPress={this.onChooseImageUploud} color="black" />
									</View>
									<View
										style={{
											width: '50%',
											height: 20,
											borderRadius: 90,
											borderWidth: 1,
											borderColor: '#fff'
										}}
									>
										<Button
											title="chosee image.."
											onPress={this.onChooseImageUploud2}
											color="black"
										/>
									</View>
								</View>
							</View>
							{/* </View> */}
							<View style={{ height: 20 }} />
							<View
								style={{
									width: 300,
									flex: 1
								}}
							>
								<TextInput
									placeholder="      discrbtion"
									onChangeText={(text) => this.setState({ discrbtion: text })}
									style={{
										borderRadius: 20,
										borderColor: 'gray',
										borderWidth: 1,
										height: 30,
										marginBottom: 10
									}}
								/>

								<TextInput
									placeholder="     title"
									onChangeText={(text) => this.setState({ title: text })}
									style={{
										marginBottom: 10,
										borderColor: 'gray',
										borderWidth: 1,
										borderRadius: 20,
										height: 30
									}}
								/>
								<TextInput
									name="cost"
									placeholder="      cost"
									onChangeText={(text) => this.setState({ cost: text })}
									style={{
										marginBottom: 10,
										borderColor: 'gray',
										borderRadius: 20,
										borderWidth: 1,
										height: 30
									}}
								/>
							</View>
						</View>

						<Button
							title="done"
							onPress={this.done.bind(this)}
							style={{
								margin: 5,
								borderRadius: 100
							}}
						/>
					</View>
				</ScrollView>
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
	}
});
