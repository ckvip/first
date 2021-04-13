<template>
  <a-modal :title="title" :visible="true" :ok-button-props="{disabled: !preName.some(x => x)}"
  :on-cancel="cancel" @ok="save()">
  <a-form>
    <a-form-item name="template" label="Template" :labelCol="{span: 5}">
      <a-select :defaultValue="selectedRuleId" @change="templateChanged($event)" class="fixed200"
              :options="rules.filter(x => !x.disabled).map(x => ({label: x.name, value: x.id}))"/>
    </a-form-item>
    <a-form-item v-for="(rule, i) of selectedRule.value" :key="i" :label="rule.type" :labelCol="{span: 5}">
      <a-select v-if="rule.type === 'Enumeration'" class="fixed200" :options="rule.value.split(',').map(x => ({label: x, value: x}))"
      v-model:value="preName[i]"></a-select>
      <span v-else-if="rule.type === 'FixedValue'">{{rule.value}}</span>
      <a-input v-else v-model:value="preName[i]" class="fixed200"></a-input>
    </a-form-item>
  </a-form>
  <a-alert :message="'Name Preview: ' + preName.filter(x => !!x).join('-')" type='success'></a-alert>
  </a-modal>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Name } from '@/shared/models/nameCollection'
import { Getter } from 'vuex-class'
import { NamingRule } from '@/shared/models/namingRuleCollection'

export default class NameDetails extends Vue {
  title = ''
  item: Name = new Name()
  preName: string[] = []
  selectedRuleId = 0
  selectedRule: NamingRule = new NamingRule()
  rules: NamingRule[] = []
  emits = ['cancel', 'save']
  props = {
    title: { type: String, required: true, defaultValue: '' }
  }

  @Getter('getNamingRules') getNamingRules!:() => NamingRule[]

  created (): void {
    this.rules = this.getNamingRules()
    this.selectedRule = this.rules[0]
    this.selectedRuleId = this.selectedRule.id
  }

  templateChanged (id: number): void {
    const found = this.rules.find(x => x.id === id)
    if (!found) {
      return
    }
    const preName: string[] = []
    this.selectedRuleId = id
    this.selectedRule = found
    let opt = []
    found.value.forEach(x => {
      switch (x.type) {
        case 'FreeText':
        case 'FixedValue':
          preName.push(x.value)
          break
        default:
          opt = x.value.split(',')
          if (opt.length) {
            preName.push(opt[0])
          }
      }
    })
    this.preName = preName
  }

  save (): void {
    this.item.name = this.preName.filter(x => x).join('-')
    this.$emit('save', this.item)
  }

  cancel (): void {
    this.$emit('cancel')
  }
}
</script>

<style scoped>
  .fixed200 {
    width: 200px;
  }
</style>
