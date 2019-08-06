import React from 'react';
import { Text, View, ScrollView, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import Header from '../header';
import Footer from '../footer';
import { SliderBox } from 'react-native-image-slider-box';
import { Actions } from 'react-native-router-flux';
//this var to save the images of the item
var arr = [];
export default class ItemPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			img: [],
			title: '',
			descrbtion: '',
			cost: '',
			name: '',
			location: '',
			userImg: '',
			commint: [],
			text: '',
			phonenumber: '',
			createdAt: ''
		};
	}
	componentWillMount() {
		//this part to have the images before render
		fetch(`http://192.168.0.14:3000/imageitem?id=${this.props.id}`).then((images) => images.json()).then((imgs) => {
			for (var i = 0; i < imgs.length; i++) {
				arr.push(imgs[i].img);
			}
			this.setState({
				img: arr
			});
		});
		// this part to have the item info before render
		fetch(`http://192.168.0.14:3000/itempage?id=${this.props.id}`).then((info) => info.json()).then((info) => {
			this.setState({
				userId: info.user.id,
				title: info.title,
				descrbtion: info.descrbtion,
				cost: info.cost,
				name: info.user.name,
				location: info.user.location,
				userImg: info.user.img,
				phonenumber: info.user.phonenumber,
				createdAt: info.createdAt
			});
		});
		//this part to have the comment of the item before render
		fetch(`http://192.168.0.14:3000/itemcommint?id=${this.props.id}`)
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
	//this part to write comment and save it in the database
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
			<View>
				<ScrollView>
					<Header />
					<SliderBox images={this.state.img} />
					<View style={{ flex: 1, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1 }}>
						<View style={{ width: 15 }} />
						<Text style={{ fontSize: 18 }}>marka:</Text>
						<View style={{ width: 50 }} />
						<Text style={{ fontSize: 18 }}>{this.state.title}</Text>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1 }}>
						<View style={{ width: 15 }} />
						<Text style={{ fontSize: 18 }}>location:</Text>
						<View style={{ width: 50 }} />
						<Text style={{ fontSize: 18 }}>{this.state.location}</Text>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1 }}>
						<View style={{ width: 15 }} />
						<Text style={{ fontSize: 18 }}>cost:</Text>
						<View style={{ width: 50 }} />
						<Text style={{ fontSize: 18, color: 'red' }}>{this.state.cost}</Text>
					</View>
					<View style={{ height: 5 }} />
					<View style={{ flex: 1, flexDirection: 'row' }} />
					<View>
						<Text>descrbtion:</Text>
						<Text style={{ fontSize: 15 }}>{this.state.descrbtion}</Text>
						<View style={{ height: 15 }} />
					</View>
					<TouchableOpacity
						style={{
							flex: 1,
							flexDirection: 'row',
							borderColor: 'grey',
							borderWidth: 1,
							width: 300,
							// borderRadius: 10,
							borderTopRightRadius: 10,
							borderBottomRightRadius: 10
						}}
						onPress={() => Actions.userinfo({ id: this.state.userId })}
					>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								borderColor: 'grey',
								borderWidth: 1,
								width: 300,
								// borderRadius: 10,
								borderTopRightRadius: 10,
								borderBottomRightRadius: 10
							}}
						>
							<Image source={{ uri: this.state.userImg }} style={{ width: 100, height: 100 }} />
							<View style={{ width: 10 }} />
							<View style={{ flex: 1, flexDirection: 'column' }}>
								<View style={{ height: 3 }} />
								<Text>{this.state.name}</Text>
								<View style={{ height: 5 }} />
								<Text>{this.state.phonenumber}</Text>
								<View style={{ height: 5 }} />
								<Text>{this.state.location}</Text>
							</View>
						</View>
					</TouchableOpacity>
					<View style={{ height: 20 }} />
					<Text style={{ fontSize: 20 }}>commint:</Text>
					<View style={{ width: '90%', borderColor: 'grey', borderWidth: 1, borderRadius: 10 }}>
						{(this.state.commint || []).map((item, index) => {
							return (
								<View key={index}>
									<Text>{item}</Text>
									<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }} />
								</View>
							);
						})}
						<TextInput value={this.state.text} onChangeText={(text) => this.setState({ text })} />
						<Button color="grey" title="send" onPress={this.test.bind(this)} />
					</View>
				</ScrollView>
				<Footer />
				<View style={{ height: 30 }} />
			</View>
		);
	}
}
