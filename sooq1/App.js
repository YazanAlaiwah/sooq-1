import React from 'react';
import Login from './compnents/login';
import Signup from './compnents/signup';
import MainPage from './compnents/mainPage/mainPage';
import SubCategory from './compnents/subCategory/subCategory';
import { Router, Scene } from 'react-native-router-flux';
import AddItem2 from './compnents/addItem/addItem2';
import UserPage from './compnents/userPage/userPage';
import ListOfItems from './compnents/listOfItems/listOfItems';
import ItemPage from './compnents/itemPage/itemPage';
import Watched from './compnents/watched/watched';
import Shop from './compnents/shop/shop';
import AddShop from './compnents/shop/addShop';
import UserShop from './compnents/shop/userShop';
import AddItemShop from './compnents/shop/addItemShop';
import ShopPage from './compnents/shop/shopPage';
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<Scene key="root">
					<Scene key="shoppage" component={ShopPage} hideNavBar={true} />
					<Scene key="additemshop" component={AddItemShop} hideNavBar={true} />
					<Scene key="usershop" component={UserShop} hideNavBar={true} />
					<Scene key="addshop" component={AddShop} hideNavBar={true} />
					<Scene key="shop" component={Shop} hideNavBar={true} />
					<Scene key="watched" component={Watched} hideNavBar={true} />
					<Scene key="listofitems" component={ListOfItems} hideNavBar={true} />
					<Scene key="signup" component={Signup} hideNavBar={true} />
					<Scene key="spacficCategory" component={SubCategory} hideNavBar={true} />
					<Scene key="login" component={Login} initial hideNavBar={true} />
					<Scene key="userpage" component={UserPage} hideNavBar={true} />
					<Scene key="home" component={MainPage} hideNavBar={true} />
					<Scene key="additem" component={AddItem2} hideNavBar={true} />
					<Scene key="itempage" component={ItemPage} hideNavBar={true} />
				</Scene>
			</Router>
		);
	}
}
