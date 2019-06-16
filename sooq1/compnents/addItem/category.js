import React, { Component } from 'react';
import { StyleSheet, View, Picker } from 'react-native';

export default class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '1',
			type: 'others',
			specficArr: [],
			specfic: '',
			checked: false,
			showSpecfic: false
		};
	}
	select(itemValue) {
		this.setState({
			type: itemValue,
			showSpecfic: !this.state.showSpecfic
		});
		fetch(`http://192.168.0.14:3000/seeSpicfic?type=${itemValue}`).then((data) => data.json()).then((data) => {
			var arr = [];
			for (let i = 0; i < data.length; i++) {
				arr.push({ label: data[i].specfic, value: data[i].specfic });
			}
			this.setState({
				specficArr: arr
			});
		});
	}

	render() {
		return (
			<View>
				<Picker
					selectedValue={this.state.type}
					style={styles.picker_style}
					onValueChange={(itemValue, itemIndex) => this.select(itemValue)}
					enabled={true}
				>
					<Picker.Item label="cars and vehicle" value="cars and vehicle" />
					<Picker.Item label="mobels and tablets" value="mobels and tablets" />
					<Picker.Item label="electronic devices" value="electronic devices" />
					<Picker.Item label="games" value="games" />
					<Picker.Item label="others" value="others" />
				</Picker>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	picker_style: {
		height: 70,
		width: 300
	}
});
