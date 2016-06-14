import React from 'react';

const styles = {
  container: {
    fontFamily: 'Helvetica, sans-serif',
    marginTop: 30,
    textAlign: 'center'
  },
  text: {
    color: '#4EAAE3',
    fontSize: 80,
  },
  total: {
    fontSize: 20,
    fontFamily: 'Helvetica, sans-serif',
  }
}

const Total = ({ children }) => (
  <div style={styles.container}>
    {children > 0 ? <div style={styles.total}>total</div> : null}
    {children > 0 ? <div style={styles.text}>{`$${children}`}</div> : null}
  </div>
)

export default Total
