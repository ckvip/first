import React from "react";
import { NamingRule, Rule } from '../shared/models/namingRuleCollection';
import { Form, Input, Modal, Select } from 'antd';
import { Name } from '../shared/models/nameCollection';

interface Props {
  rules: NamingRule[];
  title: string;
  onSubmit: any;
  onCancel: any;
}

interface State {
  item: Name;
  selectedRuleId: number;
  selectedRule: NamingRule;
  preName: string[]
}

export class NameDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const selectedRule = this.props.rules[0];
    this.state = {
      item: new Name(),
      preName: [],
      selectedRuleId: selectedRule.id,
      selectedRule
    };
  }

  templateChanged = (selectedRuleId: number) => {
    const selectedRule = this.props.rules.find(x => x.id === selectedRuleId);
    if (!selectedRule) {
      return;
    }
    const preName: string[] = [];
    selectedRule.value.forEach(x => {
      switch (x.type) {
        case 'FreeText':
        case 'FixedValue':
          preName.push(x.value)
          break;
        default:
          const opt = x.value.split(',');
          if (opt.length) {
            preName.push(opt[0]);
          } else {
            preName.push('');
          }
      }
    });
    this.setState({selectedRule, selectedRuleId, preName});
  }

  enumerationChanged = (v: string, i: number) => {
    const preName = this.state.preName;
    preName[i] = v;
    this.setState({preName});
  }

  render() {
    return (
      <Modal title={this.props.title}
             visible={true}
             onOk={() => {
               const item = this.state.item;
               item.name = this.state.preName.filter(x => !!x).join('-');
               this.props.onSubmit(item)
             }}
             okButtonProps={{disabled: !this.state.preName.length}}
             onCancel={this.props.onCancel}>
        <Form>
          <Form.Item name="template" label="Template" labelCol={{span: 5}}>
            <Select defaultValue={this.state.selectedRuleId} onChange={this.templateChanged}
                    options={this.props.rules.map(x => ({label: x.name, value: x.id}))}/>
          </Form.Item>

          {this.state.selectedRule.value.map((v: Rule, i) => {
            let input: any;
            switch (v.type) {
              case 'Enumeration':
                const opt = v.value.split(',');
                if (!!opt.length) {
                  input = null;
                }
                input = <Select options={opt.map(x => ({label: x, value: x}))} defaultValue={opt[0]}
                                onChange={(o) => this.enumerationChanged(o, i)}/>;
                break;
              case 'FixedValue':
                input = <span>{v.value}</span>;
                break;
              default:
                input = <Input defaultValue={v.value} onChange={(e) => {
                  const preName = this.state.preName;
                  preName[i] = e.target.value;
                  this.setState({preName});
                }}></Input>
            }
            return (
              <Form.Item label={v.type} labelCol={{span: 5}} key={'detailRule' + i}>
                {input}
              </Form.Item>)
          })}
        </Form>
      </Modal>)
  }
}
