import React from "react";
import { connect } from "react-redux";
import { NamingRule } from "../shared/models/namingRuleCollection";
import {
  NamingRuleAdd,
  NamingRuleDisable,
  NamingRuleEnable,
  NamingRuleRemove,
  NamingRuleSetFilter
} from "../redux/actions/namingRuleAction";
import { Button, List, Modal, Radio, Space, Switch } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { NamingRuleDetails } from './namingRuleDetails';
import { RootState } from '../redux/reducers';

interface Props {
  rules: NamingRule[];
  addRule: any;
  removeRule: any;
  disableRule: any;
  enableRule: any;
  setFilter: any;
}

class NamingRulesComponentPure extends React.Component<Props> {
  state = {
    showDetails: false,
    filter: 'all'
  };

  addNamingRule = (item: NamingRule) => {
    this.props.addRule(NamingRuleAdd(item));
    this.setState({showDetails: false})
  };

  setNamingRuleStatus = (item: NamingRule, enabled: boolean) => {
    if (enabled) {
      this.props.disableRule(NamingRuleEnable(item));
    } else {
      this.props.disableRule(NamingRuleDisable(item));
    }
  };

  delNamingRule = (item: NamingRule) => {
    Modal.confirm({
      title: 'Are you sure you want to delete it?',
      icon: <ExclamationCircleOutlined/>,
      content: 'This deletion is un-withdrawable.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.props.removeRule(NamingRuleRemove(item));
      }
    });
  };

  filterChanged = (e: any) => {
    const filterValue = e.target.value;
    const filter = {all: true, disabled: false};
    if (filterValue !== 'all') {
      filter.all = false;
      filter.disabled = filterValue === 'disabled';
    }
    this.props.setFilter(NamingRuleSetFilter(filter));
    this.setState({filter: e.target.value})
  };

  render() {
    return (<div>
      <Space>
        <label>Display:</label>
        <Radio.Group onChange={this.filterChanged} value={this.state.filter}>
          <Radio value="all">All</Radio>
          <Radio value="disabled">Disabled</Radio>
          <Radio value="enabled">Enabled</Radio>
        </Radio.Group>
      </Space>
      <List dataSource={this.props.rules} renderItem={item => (
        <List.Item actions={item.isBuildIn ?
          [<Switch checkedChildren="已启用" checked size="small" disabled/>,
            <div style={{width: 56}}>Build-in</div>] :
          [<Switch checkedChildren="已启用" unCheckedChildren="已禁用" checked={!item.disabled}
                   onChange={(v) => this.setNamingRuleStatus(item, v)} size="small"/>,
            <Button type="link" size="small" danger onClick={() => this.delNamingRule(item)}>Delete</Button>]}>
          <List.Item.Meta title={item.name}
                          description={item.value.map(x => x.type + ': ' + (x.value || 'null')).join(', ')}/>
        </List.Item>
      )}
      />
      <Button type="dashed" block icon={<PlusOutlined/>} onClick={() => this.setState({showDetails: true})}>
        Add a new Naming Rule
      </Button>
      {this.state.showDetails ?
        <NamingRuleDetails title={'Add a Naming Rule'}
                           onSubmit={this.addNamingRule}
                           onCancel={() => this.setState({showDetails: false})}/> : null}
    </div>);
  }
}

const getVisibleRules = (state: RootState): NamingRule[] => {
  if (!state.namingRuleState.namingRuleFilter.all) {
    const disabled = state.namingRuleState.namingRuleFilter.disabled;
    return state.namingRuleState.namingRules.items.filter((x: NamingRule) => x.disabled === disabled);
  }
  return state.namingRuleState.namingRules.items;
}
const mapStoreToProps = (state: RootState) => {
  return {
    rules: getVisibleRules(state)
  }
};

const mapDispatchToProps = (dispatch: any) => {
  const dispatchActon = (action: any) => dispatch(action);
  return {
    addRule: dispatchActon,
    removeRule: dispatchActon,
    disableRule: dispatchActon,
    enableRule: dispatchActon,
    setFilter: dispatchActon
  }
};

export const NamingRulesComponent = connect(mapStoreToProps, mapDispatchToProps)(NamingRulesComponentPure);
