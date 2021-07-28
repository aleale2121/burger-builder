import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckOutSummary from "../../components/Order/CheckoutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {
  state = {
    ingredients: null,
    totalPrice:0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients ,totalPrice:price});
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contactdata");
  };
  checkoutCancelledHandler = (event) => {
    event.preventDefault();
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          checkContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contactdata"}
          render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}
        />
      </div>
    );
  }
}
export default CheckOut;
