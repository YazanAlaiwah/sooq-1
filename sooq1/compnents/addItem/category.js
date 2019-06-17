import React, { Component } from 'react';
import { StyleSheet, View, Picker } from 'react-native';
import SubCategory from './subCategory';
// import console = require('console');

export default class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '1',
			type: 'others',
			specficArr: [],
			specfic: '',
			checked: false,
			showSpecfic: true
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
			this.props.specficArr(arr);
			this.props.type(itemValue);
		});
	}
	res(res) {
		this.setState({
			specfic: res
		});
	}

	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
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
				<SubCategory
					data={{ showSpecfic: this.state.showSpecfic, specficArr: this.state.specficArr }}
					res={this.res.bind(this)}
					supCategory={this.props.supCategory}
				/>
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
