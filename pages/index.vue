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

const displayList = computed(() => {
  const list = psychubes.value || []
  let filteredList = list

  if (selectedTypes.value.length > 0) {
    filteredList = filteredList.filter((psychube) => {
      return selectedTypes.value.some((selectedType) => psychube.type.includes(selectedType))
    })
  }

  if (selectedAfflatus.value.length > 0) {
    filteredList = filteredList.filter((psychube) => {
      return selectedAfflatus.value.some((selectedAfflatusName) => psychube.afflatus.includes(selectedAfflatusName))
    })
  }

  if (selectedTags.value.length > 0) {
    filteredList = filteredList.filter((psychube) => {
      return selectedTags.value.some((selectedTag) => psychube.tags.includes(selectedTag))
    })
  }

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
  <main>
    <h1>リバース1999：心相一覧</h1>

    <section>
      <p>照合結果：{{ displayList.length || 0 }} 件</p>
      <dl>
        <dt>心相タイプ</dt>
        <dd>
          <button @click="toggleType('ALL', 'ALL')" :aria-pressed="selectedTypes.length === 0">ALL</button>
          <button
            v-for="type in Types"
            :key="type"
            @click="toggleType(type, 'ALL')"
            :aria-pressed="selectedTypes.includes(type)"
          >
            {{ type }}
          </button>
        </dd>
      </dl>
      <dl>
        <dt>本源指定</dt>
        <dd>
          <button @click="toggleAfflatus('CLEAR', 'CLEAR')" :aria-pressed="selectedAfflatus.length === 0">CLEAR</button>
          <button
            v-for="afflatusName in Afflatus"
            :key="afflatusName"
            @click="toggleAfflatus(afflatusName, 'CLEAR')"
            :aria-pressed="selectedAfflatus.includes(afflatusName)"
          >
            {{ afflatusName }}
          </button>
        </dd>
      </dl>
      <dl>
        <dt>Tags</dt>
        <dd>
          <button @click="toggleTags('CLEAR', 'CLEAR')" :aria-pressed="selectedTags.length === 0">CLEAR</button>
          <button
            v-for="tags in Tags"
            :key="tags"
            @click="toggleTags(tags, 'CLEAR')"
            :aria-pressed="selectedTags.includes(tags)"
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
          <h2>{{ psychube.name }}</h2>
        </article>

        <p v-if="displayList.length === 0">No DATE</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* ここにCSSを記述します */
</style>
