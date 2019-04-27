import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';

const options = {
  withRef: true,
};

export default function connectComponent ({ mapStateToProps, mapDispatchToProps, mergeProps, component }) {
  return connect(
    mapStateToProps || function () {
      return {};
    },
    mapDispatchToProps || function (dispatch) {
      return {
        actions: bindActionCreators(actions, dispatch),
      };
    },
    mergeProps,
    options
  )(component);
}
