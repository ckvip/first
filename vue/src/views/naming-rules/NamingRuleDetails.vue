<template>
  <a-modal :title="title" :visible="true" :width="600"
           :ok-button-props="{disabled: !item.name || item.value.some(x => x.type !== 'FreeText' && !x.value)}"
           :on-cancel="cancel" @ok="save()">
    <a-form>
      <a-form-item name="name" label="Name" :label-col="{span: 4}">
        <a-input v-model:value="item.name"></a-input>
      </a-form-item>
      <a-form-item label="Disabled" :label-col="{span: 4}">
        <a-switch v-model:checked="item.disabled"></a-switch>
      </a-form-item>
      <a-form-item label="Rule" :label-col="{span: 4}" v-for="(v, i) in item.value" :key="i">
        <a-space>
          <a-select v-model:value="v.type" style="width: 130px" :key="'select' + i" :name="'select'+i"
                    :options="ruleTypes.map(x => ({label: x, value: x}))"/>

          <a-input v-model:value="v.value" style="width: 300px"
                   :placeholder="getPlaceHolder(item.value[i].type)"/>

          <MinusCircleOutlined v-if="i>0" @click="removeRule(i)"/>
        </a-space>
      </a-form-item>
    </a-form>
    <a-button :block="true" type="dashed" @click="item.value.push(getDefaultRule())">
      <template #icon>
        <PlusOutlined/>
      </template>
      Add a new Rule
    </a-button>
  </a-modal>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { NamingRule, Rule } from '@/shared/models/namingRuleCollection'
import { NamingRuleType } from '@/shared/types'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue/lib'

  @Options({
    components: { MinusCircleOutlined, PlusOutlined }
  })
export default class NamingRuleDetails extends Vue {
    title = ''
    ruleTypes = ['FreeText', 'Enumeration', 'FixedValue']
    item = new NamingRule()
    props = {
      title: { type: String, required: true, defaultValue: '' }
    }

    getDefaultRule (): Rule {
      return { type: 'FreeText', value: '' }
    }

    created (): void {
      this.item.value.push(this.getDefaultRule())
    }

    getPlaceHolder (type: NamingRuleType): string {
      switch (type) {
        case 'FixedValue':
          return 'a fixed value'
        case 'Enumeration':
          return 'separate by comma like "a,b,c"'
        default:
          return 'a default value'
      }
    }

    removeRule (index: number): void {
      this.item.value.splice(index, 1)
    }

    save (): void {
      this.$emit('save', this.item)
    }

    cancel (): void {
      this.$emit('cancel')
    }
}
</script>
