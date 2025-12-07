<script setup lang="ts">
// import { useRoute } from "vue-router"
// const route = useRoute()
// console.log("Current path:", route.fullPath)

import { useFilter } from "~/composables/useFilter"
import { computed, ref } from "vue"
const { data: psychubes, pending, error } = await useFetch("/data/psychubes.json")

// Filter Logics
const Types = ["攻撃", "クリティカル", "回復", "生存", "サポート"]
const Afflatus = ["獣", "木", "星", "岩", "霊", "知"]
const Tags = [
  "状態異常",
  "中毒",
  "行動阻害",
  "ステータス低下",
  "燃焼",
  "状態強化",
  "チャネル",
  "力場",
  "ひらめき",
  "陣法",
  "契約",
  "追加行動",
  "ジェネシスダメージ",
  "ランクアップ",
  "バレット",
  "啓示",
  "暗殺",
  "電力",
  "血の薪",
]

const { selectedValues: selectedTypes, toggle: toggleType } = useFilter(Types)
const { selectedValues: selectedAfflatus, toggle: toggleAfflatus } = useFilter(Afflatus)
const { selectedValues: selectedTags, toggle: toggleTags } = useFilter(Tags)

const isActive = (list, value) => {
  if (value === "ALL") {
    return list.length === 0
  }
  return list.includes(value)
}

const filterBySelected = (list, selected, key) => {
  if (selected.length === 0) {
    return list
  }
  return list.filter((item) => selected.some((value) => item[key].includes(value)))
}

// 一覧表示
const displayList = computed(() => {
  const list = psychubes.value || []
  let filteredList = [
    { selected: selectedTypes.value, key: "type" },
    { selected: selectedAfflatus.value, key: "afflatus" },
    { selected: selectedTags.value, key: "tags" },
  ].reduce((acc, { selected, key }) => filterBySelected(acc, selected, key), list)

  return [...filteredList].sort((a, b) => {
    const rarityDiff = b.rarity - a.rarity
    if (rarityDiff !== 0) return rarityDiff
    return b.id - a.id
  })
})

// Metadata Settinigs
useSeoMeta({
  title: "【リバース：1999】心相一覧 - Reverse:1999 Psychubes Sort",
  description: "リバース1999の星6心相を一覧から性能別にソートすることができます。",
})
</script>

<template>
  <main class="p-10">
    <h1 class="text-xl font-bold">リバース1999：心相一覧</h1>

    <section class="bg-black/50 py-2 my-3">
      <p class="border-b border-solid border-c-separate px-5 pb-2">照合結果：{{ displayList.length || 0 }} 件</p>
      <dl class="grid grid-cols-[auto_1fr] gap-5 items-center mt-3">
        <dt class="pl-6">タイプ</dt>
        <dd class="flex flex-wrap gap-1">
          <button
            class="btn-filter"
            :data-active="isActive(selectedTypes, 'ALL')"
            :aria-pressed="isActive(selectedTypes, 'ALL')"
            @click="toggleType('ALL', 'ALL')"
          >
            ALL
          </button>
          <button
            v-for="type in Types"
            :key="type"
            class="btn-filter"
            :data-active="isActive(selectedTypes, type)"
            :aria-pressed="isActive(selectedTypes, type)"
            @click="toggleType(type, 'ALL')"
          >
            {{ type }}
          </button>
        </dd>
        <dt class="pl-6">本源</dt>
        <dd class="flex flex-wrap gap-1">
          <button
            class="btn-filter"
            :data-active="isActive(selectedAfflatus, 'ALL')"
            :aria-pressed="isActive(selectedAfflatus, 'ALL')"
            @click="toggleAfflatus('ALL', 'ALL')"
          >
            ALL
          </button>
          <button
            v-for="afflatusName in Afflatus"
            :key="afflatusName"
            class="btn-filter"
            :data-active="isActive(selectedAfflatus, afflatusName)"
            :aria-pressed="isActive(selectedAfflatus, afflatusName)"
            @click="toggleAfflatus(afflatusName, 'ALL')"
          >
            {{ afflatusName }}
          </button>
        </dd>
        <dt class="pl-6">タグ</dt>
        <dd class="flex flex-wrap gap-1 pb-2">
          <button
            class="btn-filter"
            :data-active="isActive(selectedTags, 'ALL')"
            :aria-pressed="isActive(selectedTags, 'ALL')"
            @click="toggleTags('ALL', 'ALL')"
          >
            ALL
          </button>
          <button
            v-for="tags in Tags"
            :key="tags"
            class="btn-filter"
            :data-active="isActive(selectedTags, tags)"
            :aria-pressed="isActive(selectedTags, tags)"
            @click="toggleTags(tags, 'ALL')"
          >
            {{ tags }}
          </button>
        </dd>
      </dl>
    </section>

    <div>
      <p v-if="pending">データ読み込み中...</p>

      <p v-else-if="error">
        エラーが発生しました。<br />
        エラー詳細: {{ error.message }}
      </p>

      <div v-else>
        <article v-for="psychube in displayList" :key="psychube.id">
          <img :src="`/images/psychubes/icon-${psychube.id}.png`" :alt="psychube.name" />
          <h2 class="text-center">{{ psychube.name }}</h2>
        </article>

        <p v-if="displayList.length === 0">No DATE</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* ここにCSSを記述します */
</style>
