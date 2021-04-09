<template>
  <a-space>
    <label>Filter by Name:</label>
    <a-input @change="this.search($event.target.value)"></a-input>
  </a-space>
  <a-list :data-source="rules">
    <template #renderItem="{item}">
      <a-list-item :key="item.id">
        <template v-slot:actions>
          <a-button :key="'button' + item.id" type='link' danger={true} onClick="this.remove(item)">Delete</a-button>
        </template>
        {{item.name}}
      </a-list-item>
    </template>

  </a-list>
  <a-button type='dashed' block icon="" onClick="this.add()">
    Add a new Name
  </a-button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NameDetails from '@/views/names/NameDetails.vue'
import { useStore } from 'vuex'
import { Name } from '@/shared/models/nameCollection'
import { NameAdd } from '@/shared/constants'
import { ref } from 'vue'
import { key, RootState } from '@/store'

  @Options({
    components: {
      NameDetails
    },
    data: () => ({ rules: [] as Name[] })
  })
export default class NameList extends Vue {
  setup (props: any): any {
    const store = useStore<RootState>(key)
    let rules = ref([])
    const filterByName = (keyword: string): void => {
      rules = store.getters.getNames(keyword)
    }
    return {
      add: (payload: Name) => store.dispatch(NameAdd, payload),
      filterByName
    }
  }
}
</script>
