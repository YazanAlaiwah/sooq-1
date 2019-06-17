import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class InputFiled extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.continer_input}>
				<TextInput
					placeholder="      discrbtion"
					onChangeText={(text) => this.props.onChange1(text)}
					style={styles.input}
				/>

				<TextInput
					placeholder="     title"
					onChangeText={(text) => this.props.onChange2(text)}
					style={styles.input}
				/>
				<TextInput
					name="cost"
					placeholder="      cost"
					onChangeText={(text) => this.props.onChange3(text)}
					style={styles.input}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		borderRadius: 20,
		borderColor: 'gray',
		borderWidth: 1,
		height: 30,
		marginBottom: 10
	},
	continer_input: {
		width: 300,
		flex: 1
	}
});
