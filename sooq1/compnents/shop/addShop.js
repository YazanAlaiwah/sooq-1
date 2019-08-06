import React from 'react';
import Header from '../header';
import RadioForm from 'react-native-simple-radio-button';
import { ImagePicker } from 'expo';
import { dbh } from '../../server/database/apikeycnfig';
import {
	View,
	Text,
	Button,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ScrollView,
	Picker,
	TextInput,
	AsyncStorage
} from 'react-native';

export default class AddShop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			img:
				'https://firebasestorage.googleapis.com/v0/b/mobishop-ffcff.appspot.com/o/items%2Fadd.png?alt=media&token=149c9514-d41c-47eb-a775-28f09c46a984',
			type: 'others',
			specficArr: [],
			showSpecfic: false,
			specfic: '',
			checked: false,
			descrbtion: '',
			saturday: '',

			name: '',
			location: '',
			phonenumber: '',

			sunday: '',

			monday: '',

			tuesday: '',

			wednesday: '',

			thuresday: '',

			friday: ''
		};
	}
	/// this part to have days of work from days input
	onChange(name, text) {
		this.setState({
			[name]: text
		});
	}
	//this part to have the supCategory of the shop
	supCategory(v) {
		this.setState({
			specfic: v
		});
	}
	//this part to have the type of the shop
	select(itemValue) {
		this.setState({
			type: itemValue,
			showSpecfic: true
		});
		fetch(`http://192.168.0.14:3000/seeSpicfic?type=${itemValue}`).then((data) => data.json()).then((data) => {
			var arr = [];
			for (let i = 0; i < data.length; i++) {
				arr.push({ label: data[i].specfic, value: data[i].specfic });
			}
			this.setState({
				specficArr: arr
			});
		});
	}
	// this part to save the image of the shop from the camera or from the gallary
	alertImage() {
		Alert.alert(
			'MobiShop',
			'from where you want the image',
			[
				{
					text: 'cancel',

					style: 'cancel'
				},
				{
					text: 'gallery',
					onPress: () => this.onChooseImageUploud2()
				},
				{
					text: 'camera',
					onPress: () => this.onChooseImageUploud()
				}
			],
			{ cancelable: false }
		);
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
	// this part to save the image in the database
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
						// this part to save the image url in the state
						this.setState({
							img: imgUrl
						});
					});
				}
			);
		}
	};
	// this part to save all the info of the shop in the database
	done() {
		AsyncStorage.getItem('userId')
			.then((value) => {
				fetch('http://192.168.0.14:3000/addshop', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({ data: this.state, userId: value })
				});
			})
			.catch((error) => {
				console.warn(error);
			});
	}
	render() {
		return (
			<View>
				<ScrollView>
					<Header />
					<View style={styles.contanir}>
						<TouchableOpacity style={styles.contanir} onPress={() => this.alertImage()}>
							<View style={styles.contanir}>
								<Image source={{ uri: this.state.img }} style={styles.img} />
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<Picker
							selectedValue={this.state.type}
							style={styles.picker_style}
							onValueChange={(itemValue, itemIndex) => this.select(itemValue)}
							enabled={true}
						>
							<Picker.Item label="cars and vehicle" value="cars and vehicle" />
							<Picker.Item label="mobels and tablets" value="mobels and tablets" />
							<Picker.Item label="electronic devices" value="electronic devices" />
							<Picker.Item label="games" value="games" />
							<Picker.Item label="others" value="others" />
						</Picker>
						<View style={styles.contenar_radios}>
							{this.state.showSpecfic && (
								<View style={{ flex: 1 }}>
									<ScrollView>
										<RadioForm
											labelColor={'#50C900'}
											radio_props={this.state.specficArr}
											initial={-1}
											buttonColor={'#50C900'}
											onPress={(value) => {
												this.supCategory(value);
												this.setState({
													specfic: value,
													showSpecfic: false
												});
											}}
										/>
									</ScrollView>
								</View>
							)}
						</View>
						<View style={styles.continer_input}>
							<TextInput
								placeholder="    name of the shop...."
								onChangeText={(text) => this.onChange('name', text)}
								style={styles.input}
							/>

							<TextInput
								placeholder="    discrbtion..."
								onChangeText={(text) => this.onChange('descrbtion', text)}
								style={styles.input}
							/>
							<TextInput
								name="cost"
								placeholder="      location..."
								onChangeText={(text) => this.onChange('location', text)}
								style={styles.input}
							/>
							<TextInput
								name="cost"
								placeholder="      phonnmber..."
								onChangeText={(text) => this.onChange('phonenumber', text)}
								style={styles.input}
							/>

							<Text>houres in the days:</Text>
							<Text>saturday:</Text>

							<TextInput onChangeText={(text) => this.onChange('saturday', text)} style={styles.input} />

							<Text>sunday:</Text>

							<TextInput onChangeText={(text) => this.onChange('sunday', text)} style={styles.input} />

							<Text>monday:</Text>

							<TextInput onChangeText={(text) => this.onChange('monday', text)} style={styles.input} />

							<Text>tuseday:</Text>

							<TextInput onChangeText={(text) => this.onChange('tuesday', text)} style={styles.input} />

							<Text>wednesday:</Text>

							<TextInput onChangeText={(text) => this.onChange('wednesday', text)} style={styles.input} />

							<Text>thuresday:</Text>

							<TextInput onChangeText={(text) => this.onChange('thuresday', text)} style={styles.input} />

							<Text>friday:</Text>

							<TextInput onChangeText={(text) => this.onChange('friday', text)} style={styles.input} />
						</View>
					</View>
					<Button title="done" onPress={() => this.done()} />
				</ScrollView>
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
	},
	contenar_radios: { flex: 1, flexDirection: 'column', alignItems: 'center' },
	picker_style: {
		height: 70,
		width: 300
	},
	input: {
		borderRadius: 20,
		borderColor: 'gray',
		borderWidth: 1,
		height: 30,
		marginBottom: 10
	},
	continer_input: {
		width: 300,
		flex: 1
	}
});
