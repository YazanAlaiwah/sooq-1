import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from './header';

export default class ListOfItems extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Header />
				<ScrollView>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1, flexDirection: 'column' }}>
							{this.props.data.map((item, index) => {
								if (index % 2 === 0) {
									return (
										<View key={item.id}>
											<TouchableOpacity>
												<Image
													source={{ uri: item.img }}
													style={{ width: 160, height: 160, borderRadius: 25 }}
												/>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'center',
														alignItems: 'center'
													}}
												>
													<View style={{ flex: 1, flexDirection: 'column' }}>
														<View
															style={{
																borderRadius: 4,
																borderWidth: 0.5,
																borderColor: '#d6d7da'
															}}
														>
															<Text style={{ color: 'green', fontSize: 15 }}>Type:</Text>
															<Text>{item.title}</Text>
														</View>
														<View
															style={{
																borderRadius: 4,
																borderWidth: 0.5,
																borderColor: '#d6d7da'
															}}
														>
															<Text style={{ color: 'red', fontSize: 15 }}>
																Descrbtion:
															</Text>
															<Text>{item.descrbtion}</Text>
														</View>
														<View
															style={{
																borderRadius: 4,
																borderWidth: 0.5,
																borderColor: '#d6d7da'
															}}
														>
															<Text style={{ color: 'red', fontSize: 15 }}>Cost:</Text>
															<Text>{item.cost}</Text>
														</View>
													</View>
												</View>
											</TouchableOpacity>
										</View>
									);
								}
							})}
						</View>

						<View style={{ flex: 1, flexDirection: 'column' }}>
							{this.props.data.map((item, index) => {
								if (index % 2 !== 0) {
									return (
										<View key={item.id}>
											<TouchableOpacity>
												<Image
													source={{ uri: item.img }}
													style={{ width: 160, height: 160, borderRadius: 25 }}
												/>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'center',
														alignItems: 'center'
													}}
												>
													<View style={{ flex: 1, flexDirection: 'column' }}>
														<View
															style={{
																borderRadius: 4,
																borderWidth: 0.5,
																borderColor: '#d6d7da'
															}}
														>
															<Text style={{ color: 'red', fontSize: 15 }}>Type:</Text>
															<Text>{item.title}</Text>
														</View>
														<View
															style={{
																borderRadius: 4,
																borderWidth: 0.5,
																borderColor: '#d6d7da'
															}}
														>
															<Text style={{ color: 'red', fontSize: 15 }}>
																Descrbtion:
															</Text>
															<Text>{item.descrbtion}</Text>
														</View>
														<View
															style={{
																borderRadius: 4,
																borderWidth: 0.5,
																borderColor: '#d6d7da'
															}}
														>
															<Text style={{ color: 'red', fontSize: 15 }}>Cost:</Text>
															<Text>{item.cost}</Text>
														</View>
													</View>
												</View>
											</TouchableOpacity>
										</View>
									);
								}
							})}
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
