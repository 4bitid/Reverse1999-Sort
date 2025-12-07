import { ref } from "vue"
import type { Ref } from "vue"

interface FilterComposable {
  selectedValues: Ref<string[]>
  toggle: (value: string, clearValue: string) => void
}

export function useFilter(allValues: string[]): FilterComposable {
  const selectedValues: Ref<string[]> = ref([])
  const toggle = (value: string, clearValue: string) => {
    // 選択解除
    if (value === clearValue) {
      selectedValues.value = []
      return
    }

    // 値の追加・削除
    const index = selectedValues.value.indexOf(value)
    if (index === -1) {
      selectedValues.value.push(value)
    } else {
      selectedValues.value.splice(index, 1)
    }
  }

  return {
    selectedValues,
    toggle,
  }
}
