import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import console = require('console');
import Header from '../header';

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
					.then((data) => this.setState({ Merc: data }));
			})
			.catch((error) => {
				console.warn(error);
			});
	}

	render() {
		return (
			<ScrollView>
				<Header />
				{this.state.Merc.map((item) => {
					return (
						<View key={item.id} style={{ flexDirection: 'row', flex: 1 }}>
							<TouchableOpacity onPress={this.ItemPage.bind(this, item.item.id)}>
								<Image
									source={{ uri: item.img }}
									style={{ width: 175, height: 160, borderRadius: 25 }}
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
											<Text style={{ color: 'green', fontSize: 15 }}>Type:</Text>
											<Text>{item.title}</Text>

											<Text style={{ color: 'red', fontSize: 15 }}>Descrbtion:</Text>
											<Text>{item.descrbtion}</Text>

											<Text style={{ color: 'red', fontSize: 15 }}>Cost:</Text>
											<Text>{item.cost}</Text>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					);
				})}
			</ScrollView>
		);
	}
}
