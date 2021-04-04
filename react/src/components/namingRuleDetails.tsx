import React from "react";
import { NamingRule, Rule } from '../shared/models/namingRuleCollection';
import { NamingRuleType } from '../shared/types';
import { Button, Checkbox, Form, Input, Modal, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface Props {
  title: string;
  onSubmit: any;
  onCancel: any;
}

export class NamingRuleDetails extends React.Component<Props> {
  state: NamingRule;
  defaultRule = {type: 'FreeText', value: ''} as Rule;

  constructor(props: Props) {
    super(props);
    const newItem = new NamingRule();
    newItem.value.push(this.defaultRule)
    this.state = newItem;
  }

  addRule = () => {
    this.state.value.push({...this.defaultRule});
    this.setState(this.state);
  }

  removeRule = (index: number) => {
    this.state.value.splice(index, 1);
    this.setState(this.state);
  }

  namingRuleNameChanged = (v: string) => {
    const item = {...this.state, ...{name: v}};
    this.setState(item)
  }

  ruleTypeChanged = (v: NamingRuleType, index: number) => {
    const item = this.state;
    item.value[index].type = v;
    this.setState(item);
  }

  ruleValueChanged = (v: string, index: number) => {
    const item = this.state;
    item.value[index].value = v;
    this.setState(item);
  }

  render() {
    const ruleTypes = ['FreeText', 'Enumeration', 'FixedValue'];

    return (
      <Modal title={this.props.title}
             visible={true}
             onOk={() => this.props.onSubmit(this.state)}
             okButtonProps={{disabled: !this.state.name}}
             onCancel={this.props.onCancel}>
        <Form>
          <Form.Item name="name" label="Name" labelCol={{span: 4}}
                     rules={[{required: true, message: 'Name is required'}]}>
            <Input value={this.state.name}
                   onChange={(e) => this.namingRuleNameChanged(e.target.value)}/>
          </Form.Item>

          <Form.Item name="disabled" label="Disabled" labelCol={{span: 4}}>
            <Checkbox checked={this.state.disabled}
                      onChange={(e) => this.setState({...this.state, ...{disabled: e.target.checked}})}></Checkbox>
          </Form.Item>

          {this.state.value.map((v, i) => {
            return (<Form.Item label="Rule" labelCol={{span: 4}} key={'detailRule' + i}>
              <Space>
                <Select key={'select' + i} defaultValue="FreeText" value={v.type} style={{width: 140}}
                        options={ruleTypes.map(x => ({label: x, value: x}))}
                        onChange={(e) => this.ruleTypeChanged(e, i)}/>

                <Input name={'input' + i} key={'input' + i} value={v.value} onChange={(e) => this.ruleValueChanged(e.target.value, i)}/>

                {i ? <MinusCircleOutlined key={'action' + i} onClick={() => this.removeRule(i)}/> : null}
              </Space>
            </Form.Item>)
          })}
          <Form.Item>
            <Button type="dashed" block icon={<PlusOutlined/>} onClick={this.addRule}>Add a Rule</Button>
          </Form.Item>
        </Form>
      </Modal>)
  }
}
