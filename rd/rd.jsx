import styles from './rd.less';
import classNames from 'classnames';
import React, { PropTypes, Component } from 'react';
import RainDrop from './raindrop';

const isTouch = 'ontouchstart' in window;
const enumFactory = (obj) => {
  const res = {};
  const fields = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const value = obj[field];
    res[res[field] = value] = field;
  }
  return res;
};

const getPosition = (e) => {
  const pos = { x: 0, y: 0 };
  let orgx = 0; let orgy = 0;
  const tar = e.target.parentElement;
  if (isTouch && e.touches.length) {
    orgx = e.touches[0].clientX;
    orgy = e.touches[0].clientY;
  } else {
    orgx = e.clientX;
    orgy = e.clientY;
  }
  const tmpPos = tar.getBoundingClientRect();
  pos.x = orgx - tmpPos.left;
  pos.y = orgy - tmpPos.top;
  return pos;
};

export const STATUS = enumFactory({
  waiting: 1, active: 2, expanded: 3, distroy: 4
});

class Rd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drops: [],
      cnt: 0
    };
    this.onMouseDown = (e) => {
      const pos = getPosition(e);
      console.log(pos);
      this.setState({ drops: this.state.drops.concat([
        <RainDrop key={this.state.cnt++} x={e.pageX} y={e.pageY} />
      ]) });
    };
/*
    this.onMouseUp = () => {
      this.setState({
        drops: this.state.drops.filter(
          (d) => d.status <= STATUS.expanded
        ).map(() => ({
          status: STATUS.distroy
        }))
      });
    };
    */
  }

  render() {
    return (
      <div className={classNames(styles.container)}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        {this.props.children}
        {this.state.drops.map((d) => d)}
      </div>
    );
  }
}

export default Rd;
