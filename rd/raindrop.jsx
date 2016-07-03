import React, { Component, PropTypes } from 'react';
import { STATUS } from './rd';
import styles from './rd.less';
import classnames from 'classnames';

class RainDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: STATUS.waiting,
      x: props.x,
      y: props.y,
    };
  }
  render() {
    const { status, x, y } = this.state;
    const clsName = classnames(styles.lp_drop, {
      [styles.waiting]: status === STATUS.waiting,
      [styles.active]: status === STATUS.active,
      [styles.expanded]: status === STATUS.expanded,
      [styles.shrinking]: status === STATUS.shrinking,
    });
    const style = { top: y, left: x };
    return (
      <div className={clsName} style={style}></div>
    );
  }
}

RainDrop.PropTypes = {
  status: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

export default RainDrop;
