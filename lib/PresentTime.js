'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PresentTime = (_temp = _class = function (_Component) {
  _inherits(PresentTime, _Component);

  function PresentTime(props) {
    _classCallCheck(this, PresentTime);

    var _this = _possibleConstructorReturn(this, (PresentTime.__proto__ || Object.getPrototypeOf(PresentTime)).call(this, props));

    _initialiseProps.call(_this);

    _this.cellWidth = _this.props.cellWidth;
    _this.minuteStep = _this.props.minuteStep;
    _this.mounted = true;
    var mmtMidnight = (0, _moment2.default)().clone().startOf('day');
    var minutesSinceStartOfDay = (0, _moment2.default)().diff(mmtMidnight, 'minutes');
    _this.minuteWidth = _this.cellWidth / 15;
    var presentTimeLocation = minutesSinceStartOfDay * _this.minuteWidth;
    _this.state = {
      presentTime: minutesSinceStartOfDay,
      presentTimeLocation: presentTimeLocation
    };

    return _this;
  }

  _createClass(PresentTime, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      if (this.props.shouldDisplay && this.mounted) {
        this.timer = setInterval(this.tick, 60000);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.shouldDisplay && this.mounted) {
        this.timer = setInterval(this.tick, 60000);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          shouldDisplay = _props.shouldDisplay,
          color = _props.color;

      if (shouldDisplay) {
        return _react2.default.createElement(
          'div',
          { style: { display: 'flex', flexFlow: 'column', float: 'right', height: '100%', width: '100%' } },
          this.props.children,
          _react2.default.createElement('div', {
            id: 'present-time',
            style: { position: 'absolute', float: 'left', height: '100%', width: '1px', marginLeft: this.state.presentTimeLocation + 'px', borderRight: '1px dotted ' + color }
          })
        );
      } else {
        return this.props.children;
      }
    }
  }]);

  return PresentTime;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.tick = function () {
    var mmtMidnight = (0, _moment2.default)().clone().startOf('day');
    var minutesSinceStartOfDay = (0, _moment2.default)().diff(mmtMidnight, 'minutes');
    var ptime = minutesSinceStartOfDay <= 1440 ? minutesSinceStartOfDay : 0;
    var location = ptime * _this2.minuteWidth;
    _this2.setState({ presentTime: ptime, presentTimeLocation: location });
  };
}, _temp);
exports.default = PresentTime;