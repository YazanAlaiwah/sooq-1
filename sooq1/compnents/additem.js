import React, { Component } from 'react';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { StyleSheet, Text, View, Button, Alert, Image, Picker, ScrollView, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from './header';
import { ImagePicker } from 'expo';
import { dbh } from '../server/database/apikeycnfig';
// import console = require('console');

export default class AddItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '1',
			img:
				'https://firebasestorage.googleapis.com/v0/b/mobishop-ffcff.appspot.com/o/items%2Fimages.jpeg?alt=media&token=f407c561-e00d-41e5-acac-de0c0ef59fe2',
			type: 'others',
			specficArr: [],
			specfic: '',
			checked: false,
			descrbtion: '',
			title: '',
			cost: ''
		};
	}
	select(itemValue) {
		this.setState({
			type: itemValue
		});
		// console.warn(itemValue);
		fetch(`http://192.168.0.14:3000/seeSpicfic?type=${itemValue}`).then((data) => data.json()).then((data) => {
			var arr = [];
			for (let i = 0; i < data.length; i++) {
				arr.push({ label: data[i].specfic, value: data[i].specfic });
			}

			// console.warn(this.state.specfic);
			this.setState({
				specficArr: arr
			});
		});
	}
	onChooseImageUploud = async () => {
		let result = await ImagePicker.launchCameraAsync();
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
	onChooseImageUploud2 = async () => {
		let result = await ImagePicker.launchImageLibraryAsync();
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
					});
				}
			);
		}
	};

	done() {
		fetch('http://192.168.0.14:3000/addMerc', {
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
			<View>
				<ScrollView>
					<Header />
					<View>
						<View style={{ flex: 1, flexDirection: 'column' }}>
							<View style={{ flex: 1, flexDirection: 'row' }}>
								<View style={{ fex: 1, flexDirection: 'column' }}>
									<View style={{ paddingBottom: 10 }}>
										<Button title="take image.." onPress={this.onChooseImageUploud} color="black" />
									</View>
									<Button title="chosee image.." onPress={this.onChooseImageUploud2} />
								</View>
								<Image source={{ uri: this.state.img }} style={{ width: 250, height: 200 }} />
							</View>
							<View>
								<Picker
									selectedValue={this.state.type}
									style={{ height: 50, width: 200 }}
									onValueChange={(itemValue, itemIndex) => this.select(itemValue)}
									enabled={true}
								>
									<Picker.Item label="cars and vehicle" value="cars and vehicle" />
									<Picker.Item label="mobels and tablets" value="mobels and tablets" />
									<Picker.Item label="electronic devices" value="electronic devices" />
									<Picker.Item label="games" value="games" />
									<Picker.Item label="others" value="others" />
								</Picker>
								<View style={{ height: 150 }}>
									<ScrollView>
										<RadioForm
											labelColor={'#50C900'}
											radio_props={this.state.specficArr}
											initial={-1}
											buttonColor={'#50C900'}
											onPress={(value) => {
												this.setState({ specfic: value });
											}}
										/>
									</ScrollView>
								</View>
								<TextInput
									placeholder="discrbtion"
									onChangeText={(text) => this.setState({ discrbtion: text })}
									style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100 }}
								/>
								<TextInput
									placeholder="title"
									onChangeText={(text) => this.setState({ title: text })}
									style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100 }}
								/>
								<TextInput
									name="cost"
									placeholder="cost"
									onChangeText={(text) => this.setState({ cost: text })}
									style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100 }}
								/>
							</View>
						</View>
						<Button title="done" onPress={this.done.bind(this)} />
					</View>
				</ScrollView>
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
