import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Header from '../header';
import Footer from '../footer';
import Sections from './secctions';
export default class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = { email: 'Ss', password: '123' };
	}

	render() {
		return (
			<View style={styles.continer}>
				<ScrollView>
					<View>
						<Header />
						<Sections />
					</View>
				</ScrollView>
				<Footer />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	continer: {
		flex: 1,
		justifyContent: 'space-around',
		flexDirection: 'column'
	}
});
