<template>

  <Title>Consistencia Admin </Title>

  <section class="px-4 flex flex-col gap-12">
    <article>
      <h1 class="text-2xl font-bold">Consistência de dados</h1>
      <p class="text-slate-400">Verifique se os dados do minhatabela estão atualizados com dados oficiais.</p>
    </article>
    <main>
      <h2 class="text-xl font-semibold pb-2">Rodada {{ rodada }}</h2>
      <UTabs :items="items" v-model="tabIndex" />
      <div class="grid grid-cols-3 gap-4 my-6">
        <UCard v-for="item in group[reverseIndex[tabIndex]]" :key="item">
          <div class="flex flex-col gap-3">
            <div class="flex justify-between">
              <p class="text-lg"> <strong>{{ item.path[1] }}</strong> mudou </p>
              <UBadge size="xs" color="gray" class="mb-2">Jogo {{ item.path[0] }}</UBadge>
            </div>
            <div class="flex gap-1 items-center justify-center">
              <UTooltip text="minhatabela">
                <UBadge variant="subtle" size="md" color="gray">{{ item.oldValue || 'null' }}</UBadge>
              </UTooltip>
              <Icon name="i-basil-arrow-right-solid" size="1.5rem" />
              <UTooltip text="Oficial">
                <UBadge color="orange" size="md" variant="subtle"> {{ item.value || 'null' }}</UBadge>
              </UTooltip>
            </div>
          </div>
        </UCard>
      </div>
      <div class="flex justify-center">
        <UPagination v-model="rodada" :page-count="1" :total="6" />
      </div>
    </main>

  </section>
</template>

<script lang="ts" setup>

const index = {
  'CREATE': 0,
  'REMOVE': 1,
  'CHANGE': 2,
}

const reverseIndex = {
  0: 'CREATE',
  1: 'REMOVE',
  2: 'CHANGE',
}

const tabIndex = ref(0)

const rodada = ref(1)

const urlPartida = computed(() => `/api/partidas?rodada=${rodada.value}`)
const { data: partidas } = useAsyncData('partidas', () => $fetch(urlPartida.value), { watch: [rodada] })
const url = computed(() => `/api/consistencia/${rodada.value}`)
const { data: consistencia, status, clear } = useAsyncData('consistencia', () => $fetch(url.value), { watch: [rodada] })

watch(status, () => {
  if (status.value === 'success') {
    if (group.value.CREATE) tabIndex.value = index.CREATE
    else if (group.value.REMOVE) tabIndex.value = index.REMOVE
    else tabIndex.value = index.CHANGE
  }
})

const group = computed(() => {
  return useGroupBy(consistencia.value || [], 'type')
})

const items = [{
  label: 'Criar',
  icon: 'i-mingcute-add-fill',
  disabled: !group.value.CREATE,
  content: 'Os dados a seguir precisam ser criados na base do minhatabela',
}, {
  label: 'Remover',
  icon: 'i-gg-remove',
  disabled: !group.value.REMOVE,
  content: 'Os dados a seguir precisam ser removidos da base do minhatabela',
}, {
  label: 'Alterar',
  icon: 'i-ic-baseline-edit',
  disabled: !group.value.CHANGE,
  content: 'Os dados a seguir precisam ser alterados na base do minhatabela',
}]
</script>

<style></style>