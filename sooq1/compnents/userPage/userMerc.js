import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert, Button } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
export default class UserMerc extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Merc: []
		};
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				<Text>You'r Merc</Text>

				<ScrollView>
					{this.props.data.map((item) => {
						return (
							<View
								key={item.id}
								style={{
									flexDirection: 'row'
								}}
							>
								<Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />
								<View>
									<Text style={{ color: 'red' }}>Title:</Text>
									<Text style={{ color: 'red' }}>Descrbtion:</Text>
									<Text style={{ color: 'red' }}>Cost:</Text>
								</View>
								<View>
									<Text>{item.title}</Text>
									<Text>{item.descrbtion}</Text>

									<Text>{item.cost}</Text>
								</View>
								<View style={{ height: 5 }} />
								<AntDesign
									onPress={() =>
										Alert.alert(
											'Warning',
											'are you shure you want to delete this item',
											[
												{
													text: 'Cancel',
													onPress: () => console.warn('Cancel Pressed'),
													style: 'cancel'
												},
												{
													text: 'Delete',
													onPress: () => console.warn(item.id)
												}
											],
											{ cancelable: false }
										)}
									name="delete"
									size={32}
									color="green"
								/>
							</View>
						);
					})}
				</ScrollView>
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
