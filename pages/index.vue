<script setup lang="ts">
// import { useRoute } from "vue-router"
// const route = useRoute()
// console.log("Current path:", route.fullPath)

const { data: psychubes, pending, error } = await useFetch("/data/psychubes.json")
const sortedPsychubes = computed(() => {
  const list = psychubes.value || []

  return [...list].sort((a, b) => {
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

    <section>s</section>

    <div>
      <p>{{ psychubes?.length || 0 }} 件のデータを読み込みました。</p>

      <p v-if="pending">データ読み込み中...</p>

      <p v-else-if="error">
        エラーが発生しました。<br />
        エラー詳細: {{ error.message }}
      </p>

      <div v-else>
        <article v-for="psychube in sortedPsychubes" :key="psychube.id">
          <img :src="`/images/psychubes/icon-${psychube.id}.png`" :alt="psychube.name" />
          <h2>{{ psychube.name }}</h2>
          <p>レアリティ: ★{{ psychube.rarity }} / ID: {{ psychube.id }}</p>
        </article>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* ここにCSSを記述します */
</style>
