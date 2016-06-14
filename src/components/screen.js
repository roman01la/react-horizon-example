import React from 'react';

const Defs = () => (
  <defs>
    <linearGradient x1='53.9023438%' y1='0%' x2='53.9023459%' y2='100%' id='linearGradient-1'>
      <stop stopColor='#A3A3A3' offset='0%' />
      <stop stopColor='#999999' offset='100%' />
    </linearGradient>
  </defs>
)

const Screen = () => (
  <svg width='500px' height='40px' viewBox='128 128 500 40'>
    <Defs />
    <polygon fill='url(#linearGradient-1)' points='628 128 588 168 168 168 128 128' />
  </svg>
)

export default Screen
