import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../header';
import Items from './itemes';
export default class ListOfItems extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Header />
				<Items data={this.props.data} />
			</View>
		);
	}
}
