import React, { Component } from 'react';
import { HorizonRoute, connect } from 'react-hz';
import Screen from './screen'
import Seats from './seats'
import Total from './total'

const styles = {
  container: {
    width: 500,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}

const range = (ln) => [...new Array(ln)].map((_, idx) => idx);

const generateSeats = (rows, colls) => range(rows * colls).map((idx) => ({
  row: Math.ceil((idx + 1) / colls),
  seat: (idx + 1) % colls,
  state: 'free'
}));

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      prices: [5, 5, 5, 6],
      totalPrice: 0,
      rowLn: 10,
    }

    this._handleSeatSelect = this._handleSeatSelect.bind(this)
  }
  componentDidMount() {
    window.generateSeats = () => this.props.generateSeats(4, this.state.rowLn);
  }
  _handleSeatSelect(seat) {

    let { totalPrice, prices } = this.state;

    const { uuid } = this.props;
    const nextSeat = {...seat};
    const nextPrice = prices[nextSeat.row - 1];

    if ((nextSeat.uuid === undefined ||
        nextSeat.uuid === null ||
        nextSeat.uuid === uuid) &&
        nextSeat.state === 'free') {

      nextSeat.state = 'taken';
      nextSeat.uuid = uuid;

      totalPrice = totalPrice + nextPrice;

    } else if (nextSeat.uuid === uuid &&
               nextSeat.state === 'taken') {

      nextSeat.state = 'free';
      nextSeat.uuid = null;

      totalPrice = totalPrice - nextPrice;
    }

    this.props.takeSeat(nextSeat);
    this.setState({ totalPrice });
  }
  render() {

    const { totalPrice, rowLn } = this.state
    const { uuid, allSeats, takeSeat } = this.props

    return (
      <div style={styles.container}>
        <Screen />
        <Seats seats={allSeats} rowLn={rowLn} uuid={uuid} onSelect={this._handleSeatSelect} />
        <Total>{totalPrice}</Total>
      </div>
    )
  }
}

function buildSeats(seats, row, coll, state) {
  return seats.map((_row, ridx) => _row.map((_state, cidx) => {
    if (ridx === row && cidx === coll) {
      return state;
    } else {
      return _state;
    }
  }))
}

export default connect(App, {
  subscriptions: {
    allSeats: (hz) => hz('seats'),
  },
  mutations: {
    takeSeat: (hz) => (seat) => hz('seats').upsert(seat),
    generateSeats: (hz) => (rows, colls) => hz('seats').store(generateSeats(rows, colls))
  }
})
