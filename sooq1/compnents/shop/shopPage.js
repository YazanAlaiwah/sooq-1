import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { Actions } from 'react-native-router-flux';
import { View, Text, Button, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';

export default class ShopPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shops: [],
			commint: [],
			text: ''
		};
	}
	test() {
		fetch('http://192.168.0.14:3000/addcommintshop', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				text: this.state.text,
				id: this.props.shopId
			})
		});
		// .then((res) => res.json())
		// .then((res) => console.warn(res));
		this.setState({
			commint: [ ...this.state.commint, this.state.text ],
			text: '',
			Merc: []
		});
	}

	componentWillMount() {
		fetch(`http://192.168.0.14:3000/showshoppage?id=${this.props.shopId}`)
			.then((data) => data.json())
			.then((data) => {
				console.warn(data);
				this.setState({ shops: data });
			});
		fetch(`http://192.168.0.14:3000/shopcommint?id=${this.props.shopId}`)
			.then((commint) => commint.json())
			.then((commint) => {
				var comment = [];
				for (var i = 0; i < commint.length; i++) {
					comment.push(commint[i].comment);
				}
				this.setState({
					commint: comment
				});
			});
	}

	render() {
		return (
			<ScrollView style={{ flex: 1, flexDirection: 'column' }}>
				<View>
					<Header />
					<Image source={{ uri: this.state.shops.img }} style={{ width: '100%', height: 150 }} />
					<View style={{ flex: 1, flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
						<View style={{ width: 10 }} />
						<Text>shopName:</Text>
						<View style={{ width: 10 }} />
						<Text>{this.state.shops.name}</Text>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
						<View style={{ width: 10 }} />
						<Text>type:</Text>
						<View style={{ width: 10 }} />
						<Text>{this.state.shops.type}</Text>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
						<View style={{ width: 10 }} />
						<Text>location:</Text>
						<View style={{ width: 10 }} />
						<Text>{this.state.shops.location}</Text>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
						<View style={{ width: 10 }} />
						<Text>phonenumber:</Text>
						<View style={{ width: 10 }} />
						<Text>{this.state.shops.phonenumber}</Text>
					</View>
					<Text>houer days:</Text>
					<Text>saturday:</Text>
					<Text>{this.state.shops.saturday}</Text>
					<Text>sunday:</Text>
					<Text>{this.state.shops.sunday}</Text>
					<Text>monday:</Text>
					<Text>{this.state.shops.monday}</Text>
					<Text>tuseday:</Text>
					<Text>{this.state.shops.tuesday}</Text>
					<Text>tednesday:</Text>
					<Text>{this.state.shops.wednesday}</Text>
					<Text>thursday:</Text>
					<Text>{this.state.shops.thursday}</Text>
					<Text>friday:</Text>
					<Text>{this.state.shops.friday}</Text>
					<View style={{ height: 10 }} />
					<Text>commint:</Text>
					<View style={{ borderColor: 'grey', borderWidth: 1 }}>
						{(this.state.commint || []).map((item, index) => {
							return (
								<View
									key={index}
									style={{
										flex: 1,
										flexDirection: 'row',
										borderBottomColor: 'grey',
										borderBottomWidth: 1
									}}
								>
									<View style={{ width: 5 }} />
									<Text>{item}</Text>
								</View>
							);
						})}
					</View>

					<TextInput
						style={{ borderColor: 'black', borderWidth: 0.5 }}
						value={this.state.text}
						onChangeText={(text) => this.setState({ text })}
					/>
					<Button color="grey" title="sdfd" onPress={this.test.bind(this)} />
				</View>
			</ScrollView>
		);
	}
}
