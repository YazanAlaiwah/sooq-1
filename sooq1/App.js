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
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<Scene key="root">
					<Scene key="listofitems" component={ListOfItems} hideNavBar={true} />
					<Scene key="signup" component={Signup} hideNavBar={true} />
					<Scene key="spacficCategory" component={SubCategory} hideNavBar={true} />
					<Scene key="login" component={Login} hideNavBar={true} />
					<Scene key="userpage" component={UserPage} hideNavBar={true} />
					<Scene key="home" component={MainPage} initial hideNavBar={true} />
					<Scene key="additem" component={AddItem2} hideNavBar={true} />
					<Scene key="itempage" component={ItemPage} hideNavBar={true} />
				</Scene>
			</Router>
		);
	}
}
