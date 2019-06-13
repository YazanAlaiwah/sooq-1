import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from './header';
import Footer from './footer';
import { Actions } from 'react-native-router-flux';
// import console = require('console');

export default class SpacficCategory extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
				<ScrollView>
					<Header />

					<View>
						{this.props.text.map((item) => {
							return (
								<TouchableOpacity key={item.id} name="dsfdsf" style={styles.container1}>
									<View style={styles.container1}>
										<Image
											source={{
												uri:
													'https://assets.fireside.fm/file/fireside-images/podcasts/images/b/bc7f1faf-8aad-4135-bb12-83a8af679756/cover_medium.jpg'
											}}
											style={styles.photo}
										/>
										<View style={styles.container_text}>
											<Text style={styles.title}>{item.specfic}</Text>
										</View>
									</View>
								</TouchableOpacity>
							);
						})}
					</View>
				</ScrollView>
				<Footer />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container1: {
		marginTop: 100,
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		marginLeft: 16,
		marginRight: 16,
		marginTop: 8,
		marginBottom: 8,
		borderRadius: 5,
		backgroundColor: '#FFF',
		elevation: 2
	},
	title: {
		fontSize: 30,
		color: '#000'
	},
	container_text: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: 12,
		justifyContent: 'center'
	},
	photo: {
		height: 130,
		width: 130
	}
});
