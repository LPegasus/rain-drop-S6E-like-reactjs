import React, { Component } from 'react';
import { STATUS } from './rd';
import styles from './rd.less';
import classnames from 'classnames';

class RainDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      status: STATUS.waiting,
    };
    this.state.r = Math.ceil(
      Math.sqrt(
        Math.pow(Math.max(props.y, Math.abs(props.h - props.y)) || 0, 2)
        + Math.pow(Math.max(props.x, Math.abs(props.w - props.x)) || 0, 2)
      )
    );
    this.delayHandle = null;
  }

  componentDidMount() {
    this.delayHandle = setTimeout(() => {
      this.delayHandle = null;
      if (!this.props.destroy) {
        this.setState({ status: STATUS.active });
      }
    }, 100);
  }

  componentWillUnmount() {
    if (this.delayHandle) {
      clearTimeout(this.delayHandle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.destroy === true) {
      this.setState({ status: STATUS.destroy });
    }
  }

  render() {
    const { x, y, r, status } = this.state;
    const clsName = classnames(styles.lp_drop, {
      [styles.waiting]: status === STATUS.waiting,
      [styles.active]: status === STATUS.active,
      [styles.expanded]: status === STATUS.expanded,
      [styles.destroy]: status === STATUS.destroy,
    });
    const style = { top: y, left: x, width: 2 * r, height: 2 * r };
    return (
      <div className={clsName} style={style} />
    );
  }
}

export default RainDrop;
