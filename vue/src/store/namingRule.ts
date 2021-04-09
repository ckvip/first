import { NamingRule, NamingRuleCollection } from '@/shared/models/namingRuleCollection'
import { NamingRuleAdd, NamingRuleDisable, NamingRuleEnable, NamingRuleRemove } from '@/shared/constants'

interface State {
  namingRules: NamingRuleCollection
}
const consts = [NamingRuleAdd, NamingRuleRemove, NamingRuleDisable, NamingRuleEnable]
const mutations = consts.reduce((prev: any, curr: string) => {
  prev[curr] = (state: State, payload: NamingRule) => {
    state.namingRules.add(payload)
    state.namingRules.save()
  }
  return prev
}, {} as any)
const actions = consts.reduce((prev: any, curr: string) => {
  prev[curr] = ({ commit }: {commit: any}, payload: NamingRule) => {
    commit(curr)
  }
  return prev
}, {} as any)

export const NamingRuleState = {
  state: { namingRules: NamingRuleCollection.initData() },
  getters: {
    all: (state: State) => {
      return state.namingRules.items
    },
    filterByStatus: (state: State) => (disabled: boolean) => {
      return state.namingRules.items.filter((x: NamingRule) => x.disabled === disabled)
    }
  },
  mutations,
  actions
}
