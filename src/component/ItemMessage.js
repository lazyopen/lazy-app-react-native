import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp, {fmtLongDate} from '../util/index';
import {ListRow, Badge} from 'teaset';
import theme from '../config/theme';

export default class ItemMessage extends Component {
  constructor(props) {
    super(props);
    let {isRead} = this.props.itemData.item;
    this.state = {
      isRead,
    };
  }

  _renderItem() {
    let {itemData, onPressActions = []} = this.props;
    let {messageContent, createTime} = itemData.item;
    return (
      <ListRow
        title={fmtLongDate(createTime)}
        titleStyle={{color: theme.grayTextColor, fontSize: 12}}
        detail={messageContent}
        titlePlace='top'
        accessory={this.state.isRead === 0 ? <Badge type='dot' /> : null}
        swipeActions={this.state.isRead === 0 ? [
          <ListRow.SwipeActionButton title='标记已读' onPress={() => { this.setState({isRead: 1}); onPressActions[0](itemData.item); }} />,
          <ListRow.SwipeActionButton title='删除' type='danger' onPress={() => onPressActions[1](itemData.item)} />,
        ] : [<ListRow.SwipeActionButton title='删除' type='danger' onPress={() => onPressActions[1](itemData.item)} />]}
      />
    );
  }

  render() {
    return this._renderItem();
  }
}

ItemMessage.propTypes = {
  onPressActions: PropTypes.any,
  itemData: PropTypes.object,
};

const styles = StyleSheet.create({

});
