<template>
  <a-space>
    <label>Filter by Name:</label>
    <a-input @change="search($event.target.value)"></a-input>
  </a-space>
  <a-list :data-source="names">
    <template #renderItem="{item}">
      <a-list-item :key="item.id">
        <template v-slot:actions>
          <a-button :key="'button' + item.id" type='link' @click="removeItem(item)">Delete</a-button>
        </template>
        {{item.name}}
      </a-list-item>
    </template>

  </a-list>
  <a-button type='dashed' block icon="" @click="showDetails = true">
    Add a new Name
  </a-button>
  <name-details :title="'Add a new Name'" v-if="showDetails" @cancel="showDetails = false" @save="addItem($event)"></name-details>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NameDetails from '@/views/names/NameDetails.vue'
import { Name } from '@/shared/models/nameCollection'
import { Getter, Action } from 'vuex-class'
import { NameAdd, NameRemove } from '@/shared/constants'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib'
import { createVNode } from 'vue'

@Options({
  components: { NameDetails }
})
export default class NameList extends Vue {
  names: Name[] = [];
  showDetails = false;

  @Getter('getNames') getNames!:(keyword?: string) => Name[]

  @Action(NameRemove) remove!:(payload: Name) => void

  @Action(NameAdd) add!:(payload: Name) => void

  addItem (item: Name): void {
    this.add(item)
    this.showDetails = false
  }

  removeItem (item: Name): void {
    Modal.confirm({
      title: 'Are you sure you want to delete it?',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'This deletion is un-withdrawable.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.remove(item)
      }
    })
  }

  search (keyword: string):void {
    this.names = this.getNames(keyword)
  }

  created (): void {
    this.names = this.getNames()
  }
}
</script>
