import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import console = require('console');
let id;
export default class Items extends React.Component {
	constructor(props) {
		super(props);
	}

	ItemPage(id) {
		AsyncStorage.getItem('userId')
			.then((value) => {
				fetch('http://192.168.0.14:3000/itemClicked', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({ itemId: id, userId: value })
				});
			})
			.catch((error) => {
				console.warn(error);
			});

		Actions.itempage({ id });
	}

	render() {
		return (
			<ScrollView>
				{/* <View style={{ flexDirection: 'row' }}> */}
				<View style={{ flex: 1, flexDirection: 'column' }}>
					{this.props.data.map((item, index) => {
						if (id === item.item.id) {
							return;
						} else {
							id = item.item.id;
							return (
								<View key={item.item.id} style={{ flexDirection: 'row', flex: 1 }}>
									<TouchableOpacity onPress={this.ItemPage.bind(this, item.item.id)}>
										<Image
											source={{ uri: item.img }}
											style={{ width: 175, height: 160, borderRadius: 25 }}
										/>
										{/* <View
											style={{
												flexDirection: 'row',
												justifyContent: 'center',
												alignItems: 'center'
											}}
										> */}
										<View style={{ flex: 1, flexDirection: 'column' }}>
											<View
												style={{
													borderRadius: 4,
													borderWidth: 0.5,
													borderColor: '#d6d7da'
												}}
											>
												<View style={{ flex: 1, flexDirection: 'column' }}>
													<Text style={{ color: 'green', fontSize: 15 }}>Type:</Text>
													<Text>{item.item.title}</Text>

													<Text style={{ color: 'red', fontSize: 15 }}>Descrbtion:</Text>
													<Text>{item.item.descrbtion}</Text>

													<Text style={{ color: 'red', fontSize: 15 }}>Cost:</Text>
													<Text>{item.item.cost}</Text>
												</View>
											</View>
										</View>
										{/* </View> */}
									</TouchableOpacity>
								</View>
							);
						}
					})}
				</View>
				{/* </View> */}
			</ScrollView>
		);
	}
}
