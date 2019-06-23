import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, AsyncStorage } from 'react-native';
import Footer from '../footer';
import Header from '../header';
import UserMerc from './userMerc';
import UserImage from './userImage';
import UserInfo from './userInfo';
// import console = require('console');
export default class UserPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '1',
			name: '',
			img: '',
			location: '',
			Merc: []
		};
	}
	componentWillMount() {
		AsyncStorage.getItem('userId')
			.then((value) => {
				fetch(`http://192.168.0.14:3000/seeUserInfo?id=${value}`)
					.then((data) => data.json())
					.then((data) => console.warn(data)),
					fetch(`http://192.168.0.14:3000/seeUserMerc?id=${value}`)
						.then((data) => data.json())
						.then((data) => {
							console.warn(data);
							this.setState({ Merc: data });
						});
			})
			.catch((error) => {
				console.warn(error);
			});
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
				<Header />
				<ScrollView>
					<UserImage image={this.state.img} />

					<UserInfo data={this.state} />
					<UserMerc data={this.state.Merc} />
					<View />
				</ScrollView>
				<Footer />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
