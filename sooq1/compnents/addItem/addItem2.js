import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Alert } from 'react-native';
import AddItem from './addItem';

export default class AddItem2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '1',
			img:
				'https://firebasestorage.googleapis.com/v0/b/mobishop-ffcff.appspot.com/o/items%2Fadd.png?alt=media&token=149c9514-d41c-47eb-a775-28f09c46a984',
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

	componentWillMount() {
		AsyncStorage.getItem('userId')
			.then((value) => {
				this.setState({
					userId: value
				});
			})
			.catch((error) => {
				console.warn(error);
			});
	}

	onChange1(text) {
		this.setState({
			descrbtion: text
		});
	}
	onChange2(text) {
		this.setState({
			title: text
		});
	}
	onChange3(text) {
		this.setState({
			cost: text
		});
	}

	specficArr(arr) {
		// console.warn(arr);
		this.setState({
			specficArr: arr
		});
	}
	supCategory(v) {
		// console.warn(v);
		this.setState({
			specfic: v
		});
	}

	UploudImage(imgUrl) {
		this.setState({
			img: imgUrl
		});
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
			.then((data) => Alert.alert(done));
	}

	type(va) {
		this.setState({
			type: va
		});
	}
	render() {
		return (
			<AddItem
				onChange1={this.onChange1.bind(this)}
				onChange2={this.onChange2.bind(this)}
				onChange3={this.onChange3.bind(this)}
				specficArr={this.specficArr.bind(this)}
				supCategory={this.supCategory.bind(this)}
				UploudImage={this.UploudImage.bind(this)}
				done={this.done.bind(this)}
				type={this.type.bind(this)}
			/>
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
