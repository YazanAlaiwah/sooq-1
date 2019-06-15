import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Footer from './footer';
// import console = require('console');
import Header from './header';
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
		fetch(`http://192.168.0.14:3000/seeUserInfo?id=${this.state.id}`)
			.then((data) => data.json())
			.then((data) => this.setState(data)),
			fetch(`http://192.168.0.14:3000/seeUserMerc?id=${this.state.id}`)
				.then((data) => data.json())
				.then((data) => {
					this.setState({ Merc: data });
				});
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
				<Header />
				<ScrollView>
					<View style={{ height: 200 }}>
						<ImageBackground
							source={{
								uri:
									'https://firebasestorage.googleapis.com/v0/b/mobishop-ffcff.appspot.com/o/items%2Fsun.jpeg?alt=media&token=39e0ac27-55a3-48ea-8fd3-e70390a0c2de'
							}}
							style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}
						>
							<Image
								source={{
									uri: this.state.img
								}}
								style={{ width: 150, height: 150, borderRadius: 100 }}
								// blurRadius={100}
							/>
						</ImageBackground>
					</View>

					<View
						style={{
							// backgroundColor: 'red',
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
							<Text>{this.state.name}</Text>
							<Text>26/6/1996</Text>
							<Text>{this.state.location}</Text>
						</View>
						<View />
					</View>
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
							<View>
								{this.state.Merc.map((item) => {
									return (
										<View
											key={item.id}
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between'
											}}
										>
											<Image
												source={{ uri: item.img }}
												style={{ width: 100, height: 100, alignItems: 'flex-end' }}
											/>
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
										</View>
									);
								})}
							</View>
						</ScrollView>
					</View>
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
