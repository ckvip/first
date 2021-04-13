import { createStore } from 'vuex'
import { Name, NameCollection } from '@/shared/models/nameCollection'
import { NamingRule, NamingRuleCollection } from '@/shared/models/namingRuleCollection'
import {
  NameAdd,
  NameRemove,
  NamingRuleAdd,
  NamingRuleDisable,
  NamingRuleEnable,
  NamingRuleRemove
} from '@/shared/constants'

const initState = {
  names: NameCollection.initData(),
  namingRules: NamingRuleCollection.initData()
}

export type RootState = typeof initState

const consts = [NameAdd, NameRemove, NamingRuleAdd, NamingRuleRemove, NamingRuleDisable, NamingRuleEnable]

const mutations = {
  [NameAdd]: (state: RootState, payload: Name) => {
    state.names.add(payload)
    state.names.save()
  },
  [NameRemove]: (state: RootState, payload: Name) => {
    state.names.remove(payload)
    state.names.save()
  },
  [NamingRuleAdd]: (state: RootState, payload: NamingRule) => {
    state.namingRules.add(payload)
    state.namingRules.save()
  },
  [NamingRuleRemove]: (state: RootState, payload: NamingRule) => {
    state.namingRules.remove(payload)
    state.namingRules.save()
  },
  [NamingRuleDisable]: (state: RootState, payload: NamingRule) => {
    state.namingRules.disable(payload)
    state.namingRules.save()
  },
  [NamingRuleEnable]: (state: RootState, payload: NamingRule) => {
    state.namingRules.enable(payload)
    state.namingRules.save()
  }
}

const actions = consts.reduce((prev: any, curr: string) => {
  prev[curr] = ({ commit }: { commit: any }, payload: any) => {
    commit(curr, payload)
  }
  return prev
}, {} as any)

export default createStore<RootState>({
  state: initState,
  mutations,
  actions,
  getters: {
    getNames: (state: RootState) => (name: string) => {
      return !name ? state.names.items
        : state.names.items.filter((x: Name) => x.name.toLowerCase().startsWith(name.toLowerCase()))
    },
    getNamingRules: (state: RootState) => (disabled?: boolean) => {
      return disabled === undefined ? state.namingRules.items
        : state.namingRules.items.filter((x: NamingRule) => x.disabled === disabled)
    }

  },
  strict: process.env.NODE_ENV !== 'production'
})
