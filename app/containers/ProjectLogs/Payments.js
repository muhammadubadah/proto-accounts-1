/* eslint-disable object-curly-newline */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { Select, Input } from 'antd';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      protoGang: this.props.users,
    };
    this.baseState = this.state;
  }

  // this function is invoked in parent component using ref
  clearInputs = () => {
    // reseting stata after form submition
    this.setState(this.baseState);
  };

  // =============================================== //

  mapDatasource = () => {
    const { protoGang } = this.state;
    return protoGang.length
      ? protoGang.map(proto => {
          return (
            <Select.Option key={proto.username} value={proto.username}>
              {proto.name}
            </Select.Option>
          );
        })
      : null;
  };

  mapPayment = () => {
    const { payments } = this.state;
    return payments.length
      ? payments.map(payer => {
          return (
            <div key={payer.username}>
              <span> {payer.name}</span>
              <Input
                required
                value={payer.amount}
                type="number"
                name={payer.username}
                onChange={this.handleIndividualPayment}
              />
            </div>
          );
        })
      : null;
  };

  // ============= Data handlers ================== //

  handleSelect = e => {
    const { protoGang, payments } = this.state;
    this.setState({
      payments: [
        ...payments,
        protoGang.find(db => {
          return db.username === e;
        }),
      ],
      protoGang: protoGang.filter(db => {
        return db.username !== e;
      }),
    });
  };

  handleIndividualPayment = e => {
    const { payments } = this.state;
    const payer = payments.find(p => {
      return e.target.name === p.username;
    });
    payer.amount = e.target.value;
    const updatePayments = payments;
    updatePayments[payments.indexOf(payer)] = payer;
    this.setState({
      payments: updatePayments,
    });
    this.props.handlePayments(this.state.payments);
  };

  render() {
    return (
      <div>
        <Select onSelect={this.handleSelect}>{this.mapDatasource()}</Select>
        {this.mapPayment()}
      </div>
    );
  }
}

// ================================= //

export default Payments;
