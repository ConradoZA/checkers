import React from 'react';

type UnderlayProps = {
  color: 'red' | 'yellow' | 'green';
};

const UnderlayForMove: React.FC<UnderlayProps> = ({ color }) => {
  // falta "bottom" para que aparezca en el centro del cuadrado
  let styles = 'tw-relative -tw-top-[8.4vmin] tw-h-full tw-w-full tw-opacity-50';

  switch (color) {
    case 'red':
      styles += ' tw-bg-red-500';
      break;
    case 'yellow':
      styles += ' tw-bg-yellow-300';
      break;
    case 'green':
      styles += ' tw-bg-green-500';
      break;

    default:
      break;
  }

  return <div className={styles}> </div>;
};

export default UnderlayForMove;
