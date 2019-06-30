import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { Actions } from 'react-native-router-flux';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';

export default class Shop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shops: []
		};
	}
	shoppage(id) {
		// console.warn(this.state.shops);
		Actions.shoppage({ shopId: id });
	}

	componentWillMount() {
		fetch(`http://192.168.0.14:3000/showshops`)
			.then((data) => data.json())
			.then((data) => this.setState({ shops: data }));
	}

	render() {
		return (
			<View>
				<Header />
				<Button onPress={() => Actions.addshop()} title="+ add you'r shop" color="orange" />
				{this.state.shops.map((item, index) => {
					return (
						<View
							key={item.id}
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
								onPress={Actions.shoppage({ shopId: item.id })}
							>
								<Image
									source={{ uri: item.img }}
									style={{ width: '50%', height: 130, borderRadius: 25 }}
								/>

								<View style={{ width: 10 }} />
								<View style={{ flex: 1, flexDirection: 'column' }}>
									<View>
										<View style={{ flex: 1, flexDirection: 'column' }}>
											<View style={{ height: 10 }} />
											<Text style={{ fontFamily: 'notoserif', fontSize: 25 }}>{item.name}</Text>
											<View style={{ height: 10 }} />
											<Text>{item.location}</Text>
											<View style={{ height: 10 }} />
											<Text>{item.type}</Text>
											<View style={{ height: 10 }} />
											<Text style={{ color: 'red' }}>{item.phonenumber}$</Text>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					);
				})}
			</View>
		);
	}
}
