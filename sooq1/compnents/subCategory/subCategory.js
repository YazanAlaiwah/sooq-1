import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Header from '../header';
import Footer from '../footer';
import Category from './category';

export default class SubCategory extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<Header />

					<Category data={this.props.text} />
				</ScrollView>
				<Footer />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'space-around', flexDirection: 'column' }
});
