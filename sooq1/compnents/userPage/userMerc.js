import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Alert } from 'react-native';
let id;
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
export default class UserMerc extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Merc: []
		};
	}
	// this part to delete item from the user items
	delete(id) {
		fetch(`http://192.168.0.14:3000/rmMerc`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: id })
		});
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'space-between'
				}}
			>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
					<View styel={{ width: 20 }} />
					<Text style={{ color: 'green' }}>You'r Merchandise:</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ width: 20 }} />
					<ScrollView style={{ flex: 1 }}>
						{this.props.data.map((item) => {
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
										<Image source={{ uri: item.img }} style={{ width: '100%', height: 150 }} />
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
														.then((data) => alert(`you have ${data.clicked} watches`));
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
		);
	}
}
