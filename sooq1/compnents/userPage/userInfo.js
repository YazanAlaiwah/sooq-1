import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.data.name,
			img: '',
			location: ''
		};
	}

	render() {
		return (
			<View
				style={{
					width: 360,
					height: 90,
					justifyContent: 'space-around',
					flexDirection: 'row',
					alignItems: 'stretch',
					borderRadius: 6,
					borderWidth: 0.5,
					borderColor: 'black'
				}}
			>
				<View>
					<Text>you'r name:</Text>
					<Text>berthday:</Text>
					<Text>location:</Text>
				</View>
				<View>
					<Text>{this.props.data.name}</Text>
					<Text>26/6/1996</Text>
					<Text>{this.props.data.location}</Text>
				</View>
				<View />
			</View>
		);
	}
}
