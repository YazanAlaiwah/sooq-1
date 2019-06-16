import React, { Component } from 'react';
import RadioForm from 'react-native-simple-radio-button';
import { StyleSheet, View, ScrollView } from 'react-native';

export default class AddItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			specficArr: [],
			specfic: '',
			showSpecfic: false
		};
	}

	render() {
		return (
			<View style={styles.contenar_radios}>
				{this.state.showSpecfic && (
					<View style={{ flex: 1 }}>
						<ScrollView>
							<RadioForm
								labelColor={'#50C900'}
								radio_props={this.state.specficArr}
								initial={-1}
								buttonColor={'#50C900'}
								onPress={(value) => {
									this.setState({
										specfic: value,
										showSpecfic: !this.state.showSpecfic
									});
								}}
							/>
						</ScrollView>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	contenar_radios: { flex: 1, flexDirection: 'column', alignItems: 'center' }
});
