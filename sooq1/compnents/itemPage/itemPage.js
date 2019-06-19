import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image, TextInput } from 'react-native';
import Header from '../header';
import Footer from '../footer';
import { SliderBox } from 'react-native-image-slider-box';
// import console = re/quire('console');
// import console = require('console');
// import console = require('console');

var arr = [];
export default class ItemPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			img: [],
			title: '',
			descrbtion: '',
			cost: '',
			name: '',
			location: '',
			userImg: '',
			commint: [],
			text: ''
		};
	}
	componentWillMount() {
		fetch(`http://192.168.0.14:3000/imageitem?id=${this.props.id}`).then((images) => images.json()).then((imgs) => {
			// console.warn(imgs);
			for (var i = 0; i < imgs.length; i++) {
				// var obj = { url: imgs[i].img };
				arr.push(imgs[i].img);
			}
			this.setState({
				img: arr
			});
		});

		fetch(`http://192.168.0.14:3000/itempage?id=${this.props.id}`).then((info) => info.json()).then((info) => {
			this.setState({
				title: info.title,
				descrbtion: info.descrbtion,
				cost: info.cost,
				name: info.user.name,
				location: info.user.location,
				userImg: info.user.img
			});
		});

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
	test() {
		var x = [ ...this.state.commint ];
		x = x.push(this.state.text);
		this.setState({
			commint: x,
			text: ''
		});
	}

	render() {
		return (
			<View>
				<Header />
				<ScrollView>
					<SliderBox images={this.state.img} />
					<Text>{this.state.name}</Text>
					<Text>{this.state.location}</Text>
					<Text>{this.state.cost}</Text>
					<Text>{this.state.descrbtion}</Text>
					<Text>{this.state.title}</Text>
					<Image source={{ uri: this.state.userImg }} style={{ width: 100, height: 100 }} />
					{(this.state.commint || []).map((item, index) => {
						return (
							<View key={index}>
								<Text>{item}</Text>
							</View>
						);
					})}
					<TextInput value={this.state.text} onChangeText={(text) => this.setState({ text })} />
					<Button title="sdfd" onPress={this.test} />
				</ScrollView>
				<Footer />
			</View>
		);
	}
}
