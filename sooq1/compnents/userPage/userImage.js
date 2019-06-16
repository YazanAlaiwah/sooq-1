import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';

export default class UserImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img: this.props.image
		};
	}

	render() {
		return (
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
							uri: this.props.image
						}}
						style={{ width: 150, height: 150, borderRadius: 100 }}
					/>
				</ImageBackground>
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
