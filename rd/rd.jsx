import styles from './rd.less';
import classNames from 'classnames';
import React, { Component } from 'react';
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
  waiting: 1, active: 2, expanded: 3, destroy: 4
});

class Rd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drops: [],
      cnt: 0,
      width: null,
      height: null,
      showMask: false,
      hidingMask: false,
    };
    let time;
    this.onMouseDown = (e) => {
      time = Date.now();
      const pos = getPosition(e);
      const rd = {
        key: this.state.cnt++,
        x: pos.x, y: pos.y, w: this.state.width, h: this.state.height,
        destroy: false
      };
      this.setState({ drops: this.state.drops.concat([rd]), showMask: true });
    };
    this.delayHandle = [];
    this.onMouseUp = () => {
      //  记录当前key值，在后续异步清除时排除掉新生成DOM
      const num = this.state.cnt;

      this.setState({
        drops: this.state.drops.map((d) => {
          return Object.assign({}, d, { destroy: true });
        }),
        showMask: false,
        hidingMask: (Date.now() - time) > 100,
      });

      setTimeout(() => {
        this.setState({
          drops: this.state.drops.filter((d) => d.key >= num),
          hidingMask: false,
        });
      }, 500);
    };
    let evtname = isTouch ? 'touchend' : 'mouseup';
    window.addEventListener(evtname, this.onMouseUp, true);
  }

  componentDidMount() {
    const c = this.refs.c;
    const { width, height } = c.getBoundingClientRect();
    this.state.width = width;
    this.state.height = height;
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp, true);
  }

  render() {
    const evtProp = { [isTouch ? 'onTouchStart' : 'onMouseDown']: this.onMouseDown };
    return (
      <div className={classNames(styles.container)}
        {...evtProp}
      >
        <div ref="c">{this.props.children}</div>
        {
          this.state.showMask || this.state.hidingMask ?
            <div className={classNames(styles.lp_rd_mask, {
              [styles.hidingmask]: this.state.hidingMask
            })}>
              {this.state.drops.map((d) => <RainDrop {...d} />)}
            </div>
            : null
        }
      </div>
    );
  }
}

export default Rd;
