import { createStore, Store } from 'vuex'
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
import { InjectionKey } from 'vue'

const initState = {
  names: NameCollection.initData(),
  namingRules: NamingRuleCollection.initData()
}
export type RootState = typeof initState

const consts = [NameAdd, NameRemove, NamingRuleAdd, NamingRuleRemove, NamingRuleDisable, NamingRuleEnable]
const mutations = consts.reduce((prev: any, curr: string) => {
  prev[curr] = (state: RootState, payload: NamingRule) => {
    state.namingRules.add(payload)
    state.namingRules.save()
  }
  return prev
}, {} as any)
const actions = consts.reduce((prev: any, curr: string) => {
  prev[curr] = ({commit}: { commit: any }, payload: NamingRule) => {
    commit(curr)
  }
  return prev
}, {} as any)
export const key: InjectionKey<Store<RootState>> = Symbol('root-state')
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
      return disabled === undefined ? state.namingRules
        : state.namingRules.items.filter((x: NamingRule) => x.disabled === disabled)
    }

  },
  strict: process.env.NODE_ENV !== 'production'
})
