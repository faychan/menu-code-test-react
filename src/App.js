import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col} from 'reactstrap';
import Menu from './components/Menu';
import Bill from './components/Bill';
import OrderList from './components/OrderList';
import menuData from '../menu-data.json';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        diner1: {
          starter: '',
          main: '',
          dessert: ''
        },
        diner2: {
          starter: '',
          main: '',
          dessert: ''
        },
      },
      alert1: {
        message: '',
        color: '',
      },
      alert2: {
        message: '',
        color: '',
      },
      menu: '',
      selectedMenu: 0,
      selectedDiner: 0,
      billAmount: 0,
      bills: [],
      menuData: {},
    };
  };

  componentDidMount() {
    let menu = [];
    for (var key in menuData) {
      menuData[key].forEach(dish => {
        dish.course = key.slice(0,-1);
        if (dish.id==11) {
          dish.stock = 1;
        } else {
          dish.stock = 2;
        }
        menu.push(dish);
      });
    }
    this.setState({menu});
    this.setState({menuData: menuData})
  }

  getMenuById = (id) => {
    let dish = this.state.menu.find(item => (item.id == id));
    if (dish) {
      return dish;
    } else {
      return null;
    }
  }

  handleSelectDish = (e) => {
    if (this.state.selectedMenu != e.target.name) {
      this.setState({selectedMenu: e.target.name});
    } else {
      this.setState({selectedMenu: 0});
    }
  }

  handleSelectDiner = (e) => {
    if (this.state.selectedDiner != e.target.name) {
      this.setState({selectedDiner: e.target.name});
    } else {
      this.setState({selectedDiner: 0});
    }
  }

  getOrderRulesViolation = (order) => {
    let rulesViolation = [];
    for (var diner in order) {
      let numCourses = 0;
      for (var course in order[diner]) {
        if (order[diner][course]!='') {
          numCourses++;
        } 
      }
      if (numCourses < 2) {
        rulesViolation.push(`Minimal 2 courses must be selected for ${diner}.`)
      }
      if (order[diner].main=='') {
        rulesViolation.push(`Main course must be selected for ${diner}.`);          
      }
      if (order[diner].starter==4 && order[diner].main==7) {
        rulesViolation.push('You cannot have Prawn Cocktail and Salmon Fillet at the same meal.');
      }
    }
    return rulesViolation;
  }

  sendAlert = (message, type, color='danger') => {
    let alertStatus = {
      message,
      color
    }

    if (type=='add') {
      this.setState({alert1: alertStatus});
    } else if (type='submit') {
      this.setState({alert2: alertStatus});
    }
  }

  updateBills = (order) => {
    let bills = []
    let billAmount = 0;
    for (var diner in order) {
      for (var course in order[diner]) {
        const dishId = order[diner][course];
        if (dishId != '') {
          let dish = this.state.menu.find(item => (item.id == dishId));
          var dishData = '';
          if (dish) {
            dishData = dish;
          } else {
            dishData = null;
          }
          var idx = bills.findIndex(item => (item.id==dishData.id));
          if (bills[idx]) {
            bills[idx].count += 1;
            billAmount += bills[idx].price;
          } else {
            let bill = Object.assign({},dishData);
            bill.count = 1;
            bills.push(bill);
            billAmount += dishData.price;
          }
        }
      }
    }
    this.setState({bills, billAmount});
  }

  handleAddOrder = (e) => {
    e.preventDefault();
    const {selectedMenu, selectedDiner} = this.state;
    if (selectedMenu==0) {
      this.sendAlert('Please select a menu to add.','add');
    } else if (selectedDiner==0) {
      this.sendAlert('Please select a specific diner for the menu.','add');
    } else {
      let dish = this.state.menu.find(item => (item.id == selectedMenu));
      if (dish) {
        dish = dish;
      } else {
        dish = null;
      }
      if (dish) {
        if (this.state.order[selectedDiner][dish.course]!='') {
          this.sendAlert('You cannot choose more than one of the same course per diner.','add');
        } else if (dish.stock<1) {
          this.sendAlert('Insufficient stock for '+dish.name,'add');
        } else {
          let newOrder = this.state.order;
          newOrder[selectedDiner][dish.course] = selectedMenu;
          let updatedMenu = this.state.menu;
          const idx = updatedMenu.findIndex(item => (item.id==dish.id));
          updatedMenu[idx].stock -= 1;
          this.setState({
            order: newOrder, 
            menu: updatedMenu
          }, () => {
            this.sendAlert('','add');
            this.updateBills(newOrder);
          });
        }
      } else {
        this.sendAlert('Invalid menu','add');
      }
    }
  }

  handleSubmitOrder = (e) => {
    e.preventDefault();
    const messages = this.getOrderRulesViolation(this.state.order);
    if (messages.length>0) {
      this.sendAlert(messages.join('\n'),'submit');
    } else {
      this.sendAlert('','add');
      this.sendAlert(`Order submitted with total bill amount of $${this.state.billAmount}`,'submit','success');
    }
  }

  handleRemoveOrder = (diner,course) => {
    let newOrder = this.state.order;
    const dishId = newOrder[diner][course];
    newOrder[diner][course] = '';
    let updatedMenu = this.state.menu;
    const idx = updatedMenu.findIndex(item => (item.id==dishId));
    updatedMenu[idx].stock += 1;
    
    this.setState({order: newOrder, menu: updatedMenu}, () => this.updateBills(newOrder));
  }

	render() {
		return(
		  <Container>
        <Row className="section my-5 mx-1">
          <Menu 
            menu={this.state.menu}
            menuData={this.state.menuData}
            selectedMenu={this.state.selectedMenu}
            alert1={this.state.alert1}
            order={this.state.order} 
            selectedDiner={this.state.selectedDiner}
            handleSelectDish={this.handleSelectDish}
            handleSelectDiner={this.handleSelectDiner}
            updateBills={this.updateBills}
            handleAddOrder={this.handleAddOrder}
            sendAlert={this.sendAlert}
          />
        </Row>

        <Row className="section my-5 mx-1">
          <Col>
            <Row className="my-3">
              <OrderList 
                order={this.state.order} 
                menu={this.state.menu} 
                bills={this.state.bills} 
                billAmount={this.state.billAmount}
                getMenuById={this.getMenuById}
                updateBills={this.updateBills}
                handleRemoveOrder={this.handleRemoveOrder}
              />
            </Row>
          </Col>
        </Row>
        
        <Row className="section my-5 mx-1">
          <Bill 
            bills={this.state.bills} 
            billAmount={this.state.billAmount}
            alert2={this.state.alert2}
            getOrderRulesViolation={this.getOrderRulesViolation}
            handleSubmitOrder={this.handleSubmitOrder}
            sendAlert={this.sendAlert}
          />
        </Row>
			</Container>
		);
	}
}

render(<App />, document.getElementById('root'));
