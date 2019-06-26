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
				<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
					{this.props.data.map((item, index) => {
						// console.warn(item.item.descrbtion);
						if (id === item.item.id) {
							return;
						} else {
							id = item.item.id;
							return (
								<View
									key={item.item.id}
									style={{
										borderRadius: 20,
										borderWidth: 0.5,
										borderColor: '#d6d7da',
										flexDirection: 'row',
										flex: 1,
										width: '100%',
										margin: 5,
										backgroundColor: 'white'
									}}
								>
									<TouchableOpacity
										style={{ flexDirection: 'row', flex: 1 }}
										onPress={this.ItemPage.bind(this, item.item.id)}
									>
										<Image
											source={{ uri: item.img }}
											style={{ width: '50%', height: 130, borderRadius: 25 }}
										/>
										{/* <View
											style={{
												flexDirection: 'row',
												justifyContent: 'center',
												alignItems: 'center'
											}}
                    > */}
										<View style={{ width: 10 }} />
										<View style={{ flex: 1, flexDirection: 'column' }}>
											<View>
												<View style={{ flex: 1, flexDirection: 'column' }}>
													<Text style={{ fontFamily: 'notoserif', fontSize: 25 }}>
														{item.item.title}
													</Text>

													<Text>{item.item.descrbtion}</Text>

													<Text style={{ color: 'red' }}>{item.item.cost}$</Text>
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
