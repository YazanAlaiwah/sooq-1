import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class AddItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			descrbtion: '',
			title: '',
			cost: ''
		};
	}

	render() {
		return (
			<View style={styles.continer_input}>
				<TextInput
					placeholder="      discrbtion"
					onChangeText={(text) => this.setState({ discrbtion: text })}
					style={styles.input}
				/>

				<TextInput
					placeholder="     title"
					onChangeText={(text) => this.setState({ title: text })}
					style={styles.input}
				/>
				<TextInput
					name="cost"
					placeholder="      cost"
					onChangeText={(text) => this.setState({ cost: text })}
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
