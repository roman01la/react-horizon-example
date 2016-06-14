import React from 'react';
import Seat from './seat';

const styles = {
  container: {
    marginLeft: -20,
    marginTop: 30
  },
  row: {
    display: 'flex',
    alignItems: 'center'
  },
  rowNum: {
    color: '#898989',
    fontFamily: 'Helvetica, sans-serif',
    fontSize: 20,
    fontWeight: 200,
    marginRight: 10
  },
  collNum: {
    width: 30,
    textAlign: 'center',
    color: '#898989',
    fontFamily: 'Helvetica, sans-serif',
    fontSize: 20,
    fontWeight: 200,
    marginBottom: 10
  },
  collNumsRow: {
    display: 'flex',
    height: 28,
    marginLeft: 27,
    marginRight: 5,
    justifyContent: 'space-between'
  },
}

const range = (ln) => [...new Array(ln)].map((_, idx) => idx);

const RowNum = ({ children }) => <div style={styles.rowNum}>{children}</div>;
const CollNum = ({ children }) => <div style={styles.collNum}>{children}</div>;

const Seats = ({ seats, rowLn, uuid, onSelect }) => (
  <div style={styles.container}>
    <div style={styles.collNumsRow}>
      {range(rowLn).map((_, idx) => <CollNum key={idx}>{idx + 1}</CollNum>)}
    </div>
    {renderSeats(seats, { uuid, onSelect })}
  </div>
)

function renderSeats(seats, props) {

  let seatsArray = [];

  seats.forEach((seat) => {
    const row = seat.row - 1;
    seatsArray[row] = seatsArray[row] || [];
    seatsArray[row].push(seat);
  });

  return seatsArray.map((row, idx) => (
    <div key={idx} style={styles.row}>
      <RowNum>{idx + 1}</RowNum>
      {renderRow(row.sort((a, b) => a.seat - b.seat), idx, props)}
    </div>
  ))
}

function renderRow(row, ridx, props) {
  return row.map((seat, idx) => <Seat key={idx} {...props} seat={seat} />)
}

export default Seats
