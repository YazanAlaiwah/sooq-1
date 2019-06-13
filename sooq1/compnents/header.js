import { Router, Scene } from 'react-native-router-flux';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

export default function Header() {
	_menu = null;

	setMenuRef = (ref) => {
		this._menu = ref;
	};

	hideMenu = () => {
		// console.warn(arr);
		this._menu.hide();
		Actions.userpage();
	};

	showMenu = () => {
		this._menu.show();
	};
	return (
		<View>
			<View style={{ backgroundColor: 'green', height: 23 }} />
			<View style={{ backgroundColor: '#1F2833', height: 70 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
						<Text style={{ color: '#FEFEFE', fontSize: 40, fontFamily: 'serif' }}>Mobishop</Text>
					</View>
					<View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
						<Menu
							ref={this.setMenuRef}
							button={<Icon name="md-person" color="#FEFEFE" size={50} onPress={this.showMenu} />}
						>
							<MenuItem onPress={this.hideMenu}>you'r profile</MenuItem>
							<MenuItem onPress={this.hideMenu}>setting</MenuItem>
							<MenuItem onPress={this.hideMenu} disabled>
								addItem
							</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>logout</MenuItem>
						</Menu>
					</View>
				</View>
			</View>
		</View>
	);
}
