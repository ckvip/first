import {
  NameAdd,
  NameRemove
} from '@/shared/constants'
import { Name, NameCollection } from '@/shared/models/nameCollection'

interface State {
  namingRules: NameCollection
}

const consts = [NameAdd, NameRemove]
const mutations = consts.reduce((prev: any, curr: string) => {
  prev[curr] = (state: State, payload: Name) => {
    state.namingRules.add(payload)
    state.namingRules.save()
  }
  return prev
}, {} as any)
const actions = consts.reduce((prev: any, curr: string) => {
  prev[curr] = ({ commit }: { commit: any }, payload: Name) => {
    commit(curr)
  }
  return prev
}, {} as any)

export const NameState = {
  state: { namingRules: NameCollection.initData() },
  getters: {
    filterByName: (state: State) => (name: string) => {
      return !name ? state.namingRules.items
        : state.namingRules.items.filter((x: Name) => x.name.toLowerCase().startsWith(name.toLowerCase()))
    }
  },
  mutations,
  actions
}
