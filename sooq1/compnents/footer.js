import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Footer() {
	//this part to navigate you to the main page
	homePage = () => {
		Actions.home();
	};
	//this part navigate you to add item page
	addItem = () => {
		Actions.additem();
	};
	return (
		<View>
			<View style={{ backgroundColor: '#616161', height: 50 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
						<Icon name="md-home" size={50} color="#FFFFFF" onPress={this.homePage} />
					</View>

					<View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
						{/* when you click here its will navigate you to shops page */}
						<MaterialCommunityIcons onPress={() => Actions.shop()} name="store" size={50} color="white" />
					</View>

					<View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
						<Icon name="md-text" size={50} color="#FFFFFF" />
					</View>
				</View>
			</View>
		</View>
	);
}
