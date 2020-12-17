// При нажатии на кнопку Load more должна догружаться
// следующая порция изображений и рендериться вместе с предыдущими.
// После загрузки и рендера новой партии изображений страница должна плавно скролиться.
// Для скрола используй следующий код.

// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: 'smooth',
// });

// export const functionName = params => {
//   return (
//     <button onClick={this.loadMore} type="button" className="Button">
//       Load more
//     </button>
//   );
// };

import React, { Component } from 'react';

export class Button extends Component {
  render() {
    return (
      <button type="button" className="Button" onClick={this.props.click}>
        Load more
      </button>
    );
  }
}

export default Button;
