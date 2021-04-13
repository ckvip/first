<template>
  <div>
    <a-space>
      <label>Display:</label>
      <a-radio-group @change="filterChanged()" v-model:value="filter">
        <a-radio value='all'>All</a-radio>
        <a-radio value='disabled'>Disabled</a-radio>
        <a-radio value='enabled'>Enabled</a-radio>
      </a-radio-group>
    </a-space>
    <a-list :data-source="rules" >
      <template #renderItem="{item}">
        <a-list-item :key="item.id">
          <template v-slot:actions>
            <a-switch size="small" checked-children="已启用" un-checked-children="已禁用" :checked="!item.disabled"
                      :disabled="item.isBuildIn" @change="setNamingRuleStatus(item, $event)"></a-switch>
            <a-button size="small" v-if="!item.isBuildIn" type='link' @click="removeItem(item)">Delete</a-button>
            <div v-else style="width: 56px">Build-in</div>
          </template>
          <a-list-item-meta :title="item.name" :description="item.value.map(x => x.type + ': ' + (x.value || 'null')).join(', ')"></a-list-item-meta>
        </a-list-item>
      </template>

    </a-list>
    <naming-rule-details v-if="showDetails" title="Add a new Naming Rule" @cancel="showDetails=false" @save="addItem($event)"></naming-rule-details>
    <a-button type='dashed' :block="true" @click="showDetails = true" >
      <template #icon><PlusOutlined /></template>
      Add a new Naming Rule
    </a-button>

  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Getter, Action } from 'vuex-class'
import {
  NamingRuleAdd,
  NamingRuleDisable,
  NamingRuleEnable,
  NamingRuleRemove
} from '@/shared/constants'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue/lib'
import { createVNode } from 'vue'
import { NamingRule } from '@/shared/models/namingRuleCollection'
import NamingRuleDetails from '@/views/naming-rules/NamingRuleDetails.vue'

@Options({
  components: { NamingRuleDetails, PlusOutlined }
})
export default class NamingRuleList extends Vue {
  rules: NamingRule[] = []
  filter = 'all'
  showDetails = false

  @Getter('getNamingRules') getItems!:(status?: boolean) => NamingRule[]

  @Action(NamingRuleRemove) remove!:(payload: NamingRule) => void

  @Action(NamingRuleAdd) add!:(payload: NamingRule) => void
  @Action(NamingRuleEnable) enable!:(payload: NamingRule) => void
  @Action(NamingRuleDisable) disable!:(payload: NamingRule) => void

  addItem (item: NamingRule): void {
    this.add(item)
    this.showDetails = false
  }

  removeItem (item: NamingRule): void {
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

  setNamingRuleStatus (item: NamingRule, enabled: boolean): void {
    if (enabled) {
      this.enable(item)
    } else {
      this.disable(item)
    }
  }

  filterChanged (): void {
    if (this.filter === 'all') {
      this.rules = this.getItems()
    } else {
      const disabled = this.filter === 'disabled'
      this.rules = this.getItems(disabled)
    }
  }

  created (): void {
    this.rules = this.getItems()
  }
}
</script>
