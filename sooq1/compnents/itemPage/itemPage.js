import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import Header from '../header';
import Footer from '../footer';

var arr = [];
export default class ItemPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			img: []
		};
	}
	componentWillMount() {
		fetch(`http://192.168.0.14:3000/imageitem?id=${this.props.id}`).then((images) => images.json()).then((imgs) => {
			// console.warn(imgs);
			for (var i = 0; i < imgs.length; i++) {
				var obj = { url: imgs[i].img };
				arr.push(obj);
			}
			this.setState({
				img: arr
			});
			return;
		});
		// console.warn(this.state.img);
	}

	render() {
		return (
			<View>
				<Header />
				<ScrollView>{/* <Slideshow dataSource={this.state.img} /> */}</ScrollView>
				<Footer />
			</View>
		);
	}
}
