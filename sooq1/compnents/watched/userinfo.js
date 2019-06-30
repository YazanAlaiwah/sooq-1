import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Button,
	Image,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage,
	ImageBackground
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../header';
import Footer from '../footer';
import { SliderBox } from 'react-native-image-slider-box';
import { Actions } from 'react-native-router-flux';
// import console = require('console');
var arr = [];
var id;
export default class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '1',
			name: '',
			img: '',
			location: '',
			Merc: []
		};
	}
	componentWillMount() {
		AsyncStorage.getItem('userId')
			.then((value) => {
				fetch(`http://192.168.0.14:3000/seeUserInfo?id=${value}`).then((data) => data.json()).then((data) =>
					this.setState({
						name: data.name,
						img: data.img,
						location: data.location
					})
				),
					fetch(`http://192.168.0.14:3000/seeUserMerc?id=${value}`)
						.then((data) => data.json())
						.then((data) => {
							// console≥\.warn(data);
							this.setState({ Merc: data });
						});
			})
			.catch((error) => {
				console.warn(error);
			});
	}
	test() {
		fetch('http://192.168.0.14:3000/addcommint', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				text: this.state.text,
				id: this.props.id
			})
		});
		this.setState({
			commint: [ ...this.state.commint, this.state.text ],
			text: ''
		});
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
				<ScrollView>
					<Header />
					<View style={{ height: 200 }}>
						<ImageBackground
							source={{
								uri:
									'https://firebasestorage.googleapis.com/v0/b/mobishop-ffcff.appspot.com/o/items%2Fsun.jpeg?alt=media&token=39e0ac27-55a3-48ea-8fd3-e70390a0c2de'
							}}
							style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}
						>
							<Image
								source={{
									uri: this.state.img
								}}
								style={{ width: 150, height: 150, borderRadius: 100 }}
							/>
						</ImageBackground>
					</View>
					<View
						style={{
							width: 360,
							height: 90,
							justifyContent: 'space-around',
							flexDirection: 'row',
							alignItems: 'stretch',
							borderRadius: 6,
							borderWidth: 0.5,
							borderColor: 'black'
						}}
					>
						<View>
							<Text>you'r name:</Text>
							<Text>berthday:</Text>
							<Text>location:</Text>
						</View>
						<View>
							<Text>{this.state.name}</Text>
							<Text>26/6/1996</Text>
							<Text>{this.state.location}</Text>
						</View>
						<View />
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'column',
							// alignItems: 'center',
							justifyContent: 'space-between'
						}}
					>
						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
							<View styel={{ width: 20 }} />
							<Text style={{ color: 'green' }}>{this.state.name} Merchandise:</Text>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<View style={{ width: 20 }} />
							<ScrollView style={{ flex: 1 }}>
								{this.state.Merc.map((item) => {
									if (id === item.itemId) {
										return;
									} else {
										id = item.itemId;
										return (
											<View
												key={item.id}
												style={{
													flexDirection: 'column',
													width: '90%'
												}}
											>
												<Image
													source={{ uri: item.img }}
													style={{ width: '100%', height: 150 }}
												/>
												<View style={{ width: 100 }}>
													<Text>{item.title}</Text>
													<View style={{ height: 100 }}>
														<ScrollView>
															<Text>{item.descrbtion}</Text>
														</ScrollView>
													</View>

													<Text style={{ color: 'red' }}>{item.cost}$</Text>
												</View>
												<View style={{ flexDirection: 'row' }}>
													<AntDesign
														onPress={() =>
															Alert.alert(
																'Warning',
																'are you shure you want to delete this item',
																[
																	{
																		text: 'Cancel',
																		onPress: () => console.warn('Cancel Pressed'),
																		style: 'cancel'
																	},
																	{
																		text: 'Delete',
																		onPress: () => this.delete(item.itemId)
																	}
																],
																{ cancelable: false }
															)}
														name="delete"
														size={32}
														color="green"
													/>
													<MaterialCommunityIcons
														name="information-outline"
														size={32}
														color="green"
														onPress={() => {
															fetch(`http://192.168.0.14:3000/clicked?id=${item.itemId}`)
																.then((data) => data.json())
																.then((data) =>
																	alert(`you have ${data.clicked} watches`)
																);
														}}
													/>
												</View>
											</View>
										);
									}
								})}
							</ScrollView>
						</View>
					</View>
					<View />
				</ScrollView>
				<Footer />
			</View>
		);
	}
}
