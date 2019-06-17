import React, { Component } from 'react';
import { StyleSheet, View, Button, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../header';
import Footer from '../footer';
import Category from './category';
import InputFiled from './inputFiled';
import UploudImage from './uploudImage';
export default class AddItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '1',
			img:
				'https://firebasestorage.googleapis.com/v0/b/mobishop-ffcff.appspot.com/o/items%2Fqury.png?alt=media&token=a30d14fe-888b-4158-b0d0-473a6f9f7f73',
			type: 'others',
			specficArr: [],
			specfic: '',
			checked: false,
			descrbtion: '',
			title: '',
			cost: '',
			showSpecfic: false
		};
	}

	onClick() {
		this.Category.caro();
	}

	cato(res) {
		console.warn(res);
	}

	done() {
		fetch('http://192.168.0.14:3000/addMerc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(this.state)
		})
			.then((data) => data.json())
			.then((data) => console.warn(data));
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
				<ScrollView>
					<Header />
					<View>
						<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
							<UploudImage UploudImage={this.props.UploudImage} />
							<Category
								specficArr={this.props.specficArr}
								supCategory={this.props.supCategory}
								type={this.props.type}
							/>
							<InputFiled
								onChange1={this.props.onChange1}
								onChange2={this.props.onChange2}
								onChange3={this.props.onChange3}
							/>
						</View>

						<Button
							title="done"
							onPress={() => this.props.done()}
							style={{
								margin: 5,
								borderRadius: 100
							}}
						/>
					</View>
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
