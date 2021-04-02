import React from "react";
import {connect} from "react-redux";
import {RootState} from "../redux/reducers";
import {NamingRule, NamingRuleCollection, Rule} from "../shared/models/namingRuleCollection";
import {NamingRuleAdd} from "../redux/actions/namingRuleAction";
interface Props {
    rules: NamingRuleCollection,
    addRule: any
}
class NamingRulesComponentPure extends React.Component<Props>{
    add = () => {
        const r = new NamingRule();
        r.name = 'new';
        r.value.push({type: "FreeText", value: ''} as Rule);
        this.props.addRule(NamingRuleAdd(r));
    };
    render() {
        const rules = this.props.rules.getData() ? this.props.rules.getData().map((r, i) => {
            return <li key={i}>{r.name}</li>
        }) : '';
        return (<div>
            <ul>
                {rules}
            </ul>
            <button onClick={this.add}> add</button>
        </div>);
    }
}

const mapStoreToProps = (state: RootState ) => {
    return {
        rules: state.namingRuleReducer
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        addRule: (action: any) => {
            dispatch(action)
        }
    }
};
export const NamingRulesComponent = connect(mapStoreToProps, mapDispatchToProps)(NamingRulesComponentPure);
