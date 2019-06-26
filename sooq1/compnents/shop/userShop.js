import React, { Component } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../header';
import Footer from '../footer';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AddItemShop from './addItemShop';
// import console = require('console');
let id;
export default class UserShop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopId: '4',
			img: '',
			name: '',
			location: '',
			phonenumber: '',
			saturday: '',
			sunday: '',
			monday: '',
			tuseday: '',
			wednesday: '',
			thursday: '',
			friday: '',
			descrbtion: '',
			type: '',
			data: []
		};
	}

	componentWillMount() {
		AsyncStorage.getItem('userId')
			.then((value) => {
				fetch(`http://192.168.0.14:3000/shopinfo?id=${value}`).then((data) => data.json()).then((data) => {
					this.setState({
						shopId: data.id,
						img: data.img,
						name: data.name,
						location: data.location,
						phonenumber: data.phonenumber,
						saturday: data.saturday,
						sunday: data.sunday,
						monday: data.monday,
						tuseday: data.tuseday,
						wednesday: data.wednesday,
						thursday: data.thursday,
						friday: data.friday,
						descrbtion: data.descrbtion,
						type: data.type
					});
				});
			})
			.catch((error) => {
				console.warn(error);
			});
		fetch(`http://192.168.0.14:3000/seeShopMerc?id=${this.state.shopId}`)
			.then((data) => data.json())
			.then((data) => {
				console.warn(data);
				this.setState({ data: data });
			});
	}

	render() {
		return (
			<View>
				<Header />

				<View style={{ flexDirection: 'column', flex: 1 }}>
					<Image source={{ uri: this.state.img }} style={styles.img} />
					<View style={{ flexDirection: 'row', flex: 1 }}>
						<View>
							<Text>name of the shop:</Text>
							<Text>location:</Text>
							<Text>phonenumber:</Text>
							<Text>descrbtion:</Text>
							<Text>type:</Text>
						</View>
						<View>
							<Text>{this.state.name}</Text>
							<Text>{this.state.location}</Text>
							<Text>{this.state.phonenumber}</Text>
							<Text>{this.state.descrbtion}</Text>
							<Text>{this.state.type}</Text>
						</View>
					</View>
				</View>
				<Button title="add item" onPress={() => Actions.additemshop({ shopId: this.state.shopId })} />
				<View style={{ height: 300, width: '90%' }} />
				{this.state.data.map((item) => {
					// console.warn('hellosdkjfl', item.title);
					if (id === item.itemId) {
						// console.warn('baby');
						return;
					} else {
						// console.warn('no');
						id = item.itemId;
						return (
							<View
								key={item.id}
								style={{
									flexDirection: 'row',
									width: 200,
									height: 200
								}}
							>
								<Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />
								<View>
									<Text style={{ color: 'red' }}>Title:</Text>
									<Text style={{ color: 'red' }}>Descrbtion:</Text>
									<Text style={{ color: 'red' }}>Cost:</Text>
								</View>
								<View>
									<Text>{item.title}</Text>
									<Text>{item.descrbtion}</Text>

									<Text>{item.cost}</Text>
								</View>
								<View style={{ height: 5 }} />
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
											.then((data) => alert(`you have ${data.clicked} watches`));
									}}
								/>
							</View>
						);
					}
				})}
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
	},
	img: { width: '100%', height: 250 }
});
