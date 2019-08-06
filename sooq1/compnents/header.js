import { Router, Scene } from 'react-native-router-flux';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
// import console = require('console');

export default function Header() {
	_menu = null;
	// this part to show the header menu show and hide
	setMenuRef = (ref) => {
		this._menu = ref;
	};
	//this part to navigate you to the profile
	hideMenu = () => {
		this._menu.hide();
		Actions.userpage();
	};
	//this part to navigate you to the Watched page
	hideMenu1 = () => {
		this._menu.hide();
		Actions.watched();
	};
	//this part to navigate you to the add Iteam page
	hideMenu2 = () => {
		this._menu.hide();
		Actions.additem();
	};
	//this part to navigate you to the user shop
	hideMenu3 = () => {
		this._menu.hide();
		Actions.usershop();
	};
	//this part to logout
	hideMenu4 = () => {
		this._menu.hide();
		Actions.login();
	};
	// this part to show the header menu show and hide
	showMenu = () => {
		this._menu.show();
	};
	return (
		<View>
			<View style={{ backgroundColor: 'green', height: 23 }} />
			<View style={{ backgroundColor: '#616161', height: 70 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
						<Text style={{ color: '#FEFEFE', fontSize: 40, fontFamily: 'serif' }}>SOOQ</Text>
					</View>
					<View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
						<Menu
							ref={this.setMenuRef}
							button={<Icon name="md-person" color="#FEFEFE" size={50} onPress={this.showMenu} />}
						>
							<MenuItem onPress={this.hideMenu}>you'r profile</MenuItem>
							<MenuItem onPress={this.hideMenu1}>watched</MenuItem>
							<MenuItem onPress={this.hideMenu2}>addItem</MenuItem>
							<MenuItem onPress={this.hideMenu3}>you'r shop</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu4}>logout</MenuItem>
						</Menu>
					</View>
				</View>
			</View>
		</View>
	);
}
