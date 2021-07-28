import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckOutSummary from "../../components/Order/CheckoutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contactdata");
  };
  checkoutCancelledHandler = () => {
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
          component={ContactData}
        />
      </div>
    );
  }
}
export default CheckOut;
