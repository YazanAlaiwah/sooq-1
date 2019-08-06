import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import console = require('console');
import Header from '../header';
var id;
export default class Watched extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Merc: []
		};
	}

	componentWillMount() {
		AsyncStorage.getItem('userId')
			.then((value) => {
				fetch(`http://192.168.0.14:3000/watched?id=${value}`)
					.then((data) => data.json())
					.then((data) => this.setState({ Merc: data[0] }));
			})
			.catch((error) => {
				console.warn(error);
			});
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
				<Header />
				{this.state.Merc.map((item) => {
					if (id === item.id) {
						return;
					} else {
						id = item.id;
						return (
							<View key={item.id} style={{ flexDirection: 'row', flex: 1 }}>
								<TouchableOpacity onPress={this.ItemPage.bind(this, item.id)}>
									<Image
										source={{ uri: item.img }}
										style={{ width: 370, height: 200, borderRadius: 25 }}
									/>

									<View style={{ flex: 1, flexDirection: 'column' }}>
										<View
											style={{
												borderRadius: 4,
												borderWidth: 0.5,
												borderColor: '#d6d7da'
											}}
										>
											<View style={{ flex: 1, flexDirection: 'column' }}>
												<Text style={{ color: 'green', fontSize: 18 }}>Type:</Text>
												<Text style={{ fontSize: 15 }}>{item.title}</Text>

												<Text style={{ color: 'red', fontSize: 18 }}>Descrbtion:</Text>
												<Text style={{ fontSize: 15 }}>{item.descrbtion}</Text>

												<Text style={{ color: 'red', fontSize: 18 }}>Cost:</Text>
												<Text style={{ fontSize: 15 }}>{item.cost}</Text>
											</View>
										</View>
									</View>
								</TouchableOpacity>
							</View>
						);
					}
				})}
			</ScrollView>
		);
	}
}
