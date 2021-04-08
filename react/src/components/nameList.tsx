import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, List, Modal, Space } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Name } from '../shared/models/nameCollection';
import { RootState } from '../redux/reducers';
import { NameAdd, NameRemove, NameSetFilter } from '../redux/actions/nameAction';
import { NameDetails } from './nameDetails';
import { NamingRule } from '../shared/models/namingRuleCollection';

interface Props {
  names: Name[];
  namingRules: NamingRule[];
  add: any;
  remove: any;
  setFilter: any;
}

class NamesComponentPure extends React.Component<Props> {
  state = {
    showDetails: false
  };
  remove = (item: Name) => {
    Modal.confirm({
      title: 'Are you sure you want to delete it?',
      icon: <ExclamationCircleOutlined/>,
      content: 'This deletion is un-withdrawable.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.props.remove(NameRemove(item));
      }
    });
  };

  add = (item: Name) => {
    this.props.add(NameAdd(item));
    this.setState({showDetails: false});
  };

  filterChanged = (e: any) => {
    const name = e.target.value;
    this.props.setFilter(NameSetFilter({name}));
  };

  render() {
    return (<div>
      <Space>
        <label>Filter by Name:</label>
        <Input onChange={this.filterChanged}/>
      </Space>
      <List dataSource={this.props.names} renderItem={(item) => {
        return (
          <List.Item key={item.id} actions={
            [<Button key={'button' + item.id} type='link' danger={true} onClick={() => this.remove(item)}>Delete</Button>]}>
            {item.name}
          </List.Item>
        );
      }}/>
      <Button type='dashed' block={true} icon={<PlusOutlined/>} onClick={() => this.setState({showDetails: true})}>
        Add a new Name
      </Button>
      {this.state.showDetails ?
        <NameDetails rules={this.props.namingRules} title='Add a Name'
                     onSubmit={this.add} onCancel={() => this.setState({showDetails: false})}/> : null}
    </div>);
  }
}

const mapStore = (state: RootState) => {
  const keyword = state.nameState.nameFilter.name;
  const names = !!keyword ?
    state.nameState.names.items.filter(x => x.name.toLowerCase().startsWith(keyword.toLowerCase())) :
    state.nameState.names.items;
  const namingRules = state.nameState.namingRules.items.filter(x => !x.disabled);
  return {names, namingRules};
};

const mapDispatch = (dispatch: any) => {
  const dispatchAction = (action: any) => dispatch(action);
  return {
    add: dispatchAction,
    remove: dispatchAction,
    setFilter: dispatchAction
  };
};

export const NamesComponent = connect(mapStore, mapDispatch)(NamesComponentPure);
