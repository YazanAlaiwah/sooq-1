import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Category extends Component {
	constructor(props) {
		super(props);
	}
	// this part to show the supCategory
	seeList(id) {
		fetch(`http://192.168.0.14:3000/seeListMerchandise?id=${id}`)
			.then((data) => data.json())
			.then((data) => Actions.listofitems({ data: data }));
	}

	render() {
		return (
			<View>
				{this.props.data.map((item) => {
					return (
						<TouchableOpacity
							key={item.id}
							name="dsfdsf"
							style={styles.container1}
							onPress={this.seeList.bind(this, item.id)}
						>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									flex: 1,
									borderRadius: 20,
									backgroundColor: '#A9A9A9',
									height: 80
								}}
							>
								<View style={styles.container_text}>
									<Text style={styles.title}>{item.specfic}</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flex: 1,
		borderRadius: 20,
		backgroundColor: 'blue'
	},
	container1: {
		marginTop: 100,
		flex: 1,
		flexDirection: 'row',

		marginLeft: 16,
		marginRight: 16,
		marginTop: 8,
		marginBottom: 8,
		borderRadius: 20,
		backgroundColor: '#FFF',
		elevation: 2
	},
	title: {
		fontSize: 30,
		color: 'white'
	},
	container_text: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: 12,
		justifyContent: 'center',
		color: 'white'
	},
	photo: {
		height: 130,
		width: 130
	}
});
