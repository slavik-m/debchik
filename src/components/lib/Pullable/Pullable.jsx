import React from 'react';
import PropTypes from 'prop-types';

import './Pullable.scss';

/* eslint-disable react/destructuring-assignment */
class Pullable extends React.Component {
  constructor(props) {
    super(props);

    this.clearTouchStatus();

    this.state = {
      status: 'ready',
      height: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('touchstart', this.onTouchStart);
    window.addEventListener('touchmove', this.onTouchMove, { passive: false });
    window.addEventListener('touchend', this.onTouchEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove, { passive: false });
    window.removeEventListener('touchend', this.onTouchEnd);

    clearTimeout(this.refreshCompletedTimeout);
    clearTimeout(this.resetTimeout);
  }

  clearTouchStatus = () => {
    this.pullStartY = null;
    this.pullMoveY = null;
    this.dist = 0;
    this.distResisted = 0;
    this.ignoreTouches = false;
  };

  onTouchStart = (e) => {
    if (this.props.disabled || this.ignoreTouches) return;

    if (this.state.status === 'ready' && this.props.shouldPullToRefresh()) {
      this.pullStartY = e.touches[0].screenY;
    } else {
      this.pullStartY = null;
    }
  };

  onTouchMove = (e) => {
    console.log('onTouchEnd 3');

    if (this.props.disabled || this.ignoreTouches || this.pullStartY === null) return;

    this.pullMoveY = e.touches[0].screenY;
    this.dist = this.pullMoveY - this.pullStartY;

    if (this.dist > 0) {
      e.preventDefault();

      this.distResisted = Math.min(this.dist / this.props.resistance, this.props.distThreshold);

      this.setState({ status: 'pulling', height: this.distResisted }, () => {
        if (this.distResisted === this.props.distThreshold) this.refresh();
      });
    }
  };

  onTouchEnd = () => {
    console.log('onTouchEndd ');
    if (this.props.disabled || this.ignoreTouches) return;

    if (this.state.status === 'pulling') {
      this.ignoreTouches = true;
      this.setState({ status: 'pullAborted', height: 0 }, () => {
        this.reset(this.props.resetDuration);
      });
    } else {
      this.reset();
    }
  };

  refresh = () => {
    this.ignoreTouches = true;
    this.setState({ status: 'refreshing' }, () => {
      this.props.onRefresh();

      this.refreshCompletedTimeout = setTimeout(() => {
        this.setState({ status: 'refreshCompleted', height: 0 }, () => {
          this.reset(this.props.resetDuration);
        });
      }, this.props.refreshDuration);
    });
  };

  reset = (delay = 0) => {
    this.resetTimeout = setTimeout(() => {
      this.clearTouchStatus();
      this.setState({ status: 'ready' });
    }, delay);
  };

  render() {
    const { status } = this.state;
    const shouldSpin = status === 'refreshing' || status === 'refreshCompleted';
    const shouldReset = status === 'pullAborted' || status === 'refreshCompleted';
    const pctPulled = this.state.height / this.props.distThreshold;

    return (
      <>
        <div
          className={this.props.className}
          style={{
            height: this.state.height,
            alignItems: this.props.centerSpinner ? 'center' : 'flex-start',
            transition: shouldReset ? `height ${this.props.resetDuration}ms ${this.props.resetEase}` : 'none',
          }}
        >
          <div
            className="pullable__spinner"
            style={{
              opacity: this.props.fadeSpinner ? pctPulled : 1,
              transform: shouldReset
                ? `translateY(${(pctPulled * (this.props.spinnerSize + this.props.spinnerOffset)) - this.props.spinnerSize}px) rotate(${this.props.rotateSpinner && shouldSpin ? 90 : 0}deg)`
                : `translateY(${(pctPulled * (this.props.spinnerSize + this.props.spinnerOffset)) - this.props.spinnerSize}px) rotate(${this.props.rotateSpinner ? pctPulled * 90 : 0}deg)`,
              transition: shouldReset
                ? `opacity ${this.props.resetDuration}ms ${this.props.resetEase}, transform ${this.props.resetDuration}ms ${this.props.resetEase}`
                : 'none',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: this.props.spinnerSize,
                height: this.props.spinnerSize,
                stroke: this.props.spinnerColor,
                animation: shouldSpin
                  ? `scale ${this.props.popDuration}ms cubic-bezier(0.55, 0.055, 0.675, 0.19), rotate360 ${this.props.spinSpeed}ms linear ${this.props.popDuration}ms infinite`
                  : 'none',
              }}
            >
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
            </svg>
          </div>
        </div>
        {this.props.children}
      </>
    );
  }
}

Pullable.defaultProps = {
  className: 'pullable',
  centerSpinner: true,
  fadeSpinner: true,
  rotateSpinner: true,
  spinnerSize: 24,
  spinnerOffset: 0,
  spinnerColor: '#000000',
  spinSpeed: 1200,
  popDuration: 200,
  distThreshold: 72,
  resistance: 2.5,
  refreshDuration: 1000,
  resetDuration: 400,
  resetEase: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  shouldPullToRefresh: () => window.scrollY <= 0,
  disabled: false,
};

Pullable.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  className: PropTypes.string,
  centerSpinner: PropTypes.bool,
  fadeSpinner: PropTypes.bool,
  rotateSpinner: PropTypes.bool,
  spinnerSize: PropTypes.number,
  spinnerOffset: PropTypes.number,
  spinnerColor: PropTypes.string,
  spinSpeed: PropTypes.number,
  popDuration: PropTypes.number,
  distThreshold: PropTypes.number,
  resistance: PropTypes.number,
  refreshDuration: PropTypes.number,
  resetDuration: PropTypes.number,
  resetEase: PropTypes.string,
  shouldPullToRefresh: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Pullable;
