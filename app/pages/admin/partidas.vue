<template>
  <UTabs
    v-model="view"
    :content="false"
    :items="items"
    class="w-full mb-4"
  />
  <UCard
    v-if="view === MatchesView.STORED"
    variant="subtle"
  >
    <UTable
      :loading="status !== 'success'"
      :data="data?.partidas"
      :columns="colunas"
    >
      <template #mandante_nome_popular-cell="{ getValue, row }">
        <TeamBadge
          :name="getValue()"
          :emblem="row.original.mandante.escudo"
        />
      </template>
      <template #visitante_nome_popular-cell="{ getValue, row }">
        <div class="flex justify-end">
          <TeamBadge
            :name="getValue()"
            :emblem="row.original.visitante.escudo"
          />
        </div>
      </template>
      <template #status-cell="{ getValue, row }">
        <UBadge
          class="rounded-full"
          variant="subtle"
          :icon="statusPartida[getValue()].icon"
          :color="statusPartida[getValue()].color"
          size="lg"
          >{{ statusPartida[getValue()].label }}</UBadge
        >
      </template>
      <template #inconsistencias-cell="{ getValue, row }">
        <UButton
          @click="setPickedPartida(row.original)"
          class="rounded-full"
          variant="ghost"
          :icon="
            Object.values(getValue()).length ? 'i-lucide-circle-alert' : 'i-lucide-check-circle'
          "
          :class="Object.values(getValue()).length ? 'text-yellow-700' : 'text-green-700'"
        />
      </template>
      <template #data-cell="{ getValue, row }">
        {{
          format(new Date(getValue().split('-')), 'd MMM', { locale: ptBR }) +
          ' ' +
          row.original.hora.substring(0, 5)
        }}
      </template>
      <template #actions-cell="{ row }">
        <UButton
          color="neutral"
          variant="ghost"
          :icon="'i-lucide-pencil'"
          @click="setPickedPartida(row.original)"
        />
      </template>
    </UTable>
  </UCard>
  <UCard v-else>
    <UTable
      :loading="status !== 'success'"
      :data="data?.partidasParaCriar"
      :columns="colunasNovasPartidas"
    >
      <template #mandante_nome_popular-cell="{ getValue, row }">
        <TeamBadge
          :name="getValue()"
          :emblem="row.original.mandante.escudo"
        />
      </template>
      <template #visitante_nome_popular-cell="{ getValue, row }">
        <TeamBadge
          :name="getValue()"
          :emblem="row.original.visitante.escudo!"
        />
      </template>
      <template #actions-cell="{ row }">
        <UButton
          color="neutral"
          variant="ghost"
          :loading="loadingCreate.has(row.original.numero)"
          :icon="'i-lucide-plus'"
          @click="storeMatch(row.original)"
        />
      </template>
    </UTable>
  </UCard>
  <FormEditarPartida
    :partida="pickedPartida"
    @refresh="refresh"
    v-model:opened="opened"
  />
</template>

<script lang="ts" setup>
import type { TableColumn, TabsItem } from '@nuxt/ui'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Tables } from '~/types/database.types'
import type { IPartida, PartidaConsistencia, PartidaCriar } from '~/types/partida'
definePageMeta({
  middleware: ['auth']
})

const toast = useToast()

const enum MatchesView {
  STORED = 'stored',
  CREATE = 'create'
}

type Params = {
  view: MatchesView
}

const params = useUrlSearchParams<Params>('history')

const view = computed({
  get(): MatchesView {
    return params.view
  },
  set(view: MatchesView) {
    params.view = view
  }
})

const items: TabsItem[] = [
  {
    label: 'Cadastradas',
    icon: 'i-lucide-table-2',
    value: MatchesView.STORED
  },
  {
    label: 'Criar',
    icon: 'i-lucide-calendar-plus',
    value: MatchesView.CREATE
  }
]

const loadingCreate = ref(new Map())

async function storeMatch(match: PartidaCriar): Promise<void> {
  loadingCreate.value.set(match.numero, true)

  const date = match.data ? format(new Date(match.data?.split('/').reverse()), 'yyyy-MM-dd') : null
  console.log(date)
  console.log(match.data)

  const _match: Tables<'partida'> = {
    mandante: match.mandante.id,
    visitante: match.visitante.id,
    sede: match.sede!.id || null,
    data: date,
    hora: match.hora!,
    rodada: match.rodada,
    numero: match.numero
  } as Tables<'partida'>

  const { error } = await useSupabaseClient().from('partida').insert(_match)

  if (error) {
    toast.add({ description: error.message, color: 'error' })
  } else {
    toast.add({ description: 'Sucesso ao criar partida', color: 'success' })
  }

  refresh()
  loadingCreate.value.delete(match.numero)
}

const pickedPartida = ref()

const opened = ref(false)

const { data, status, refresh } = useLazyAsyncData('partidas-admin', () =>
  $fetch('/api/admin/partidas')
)

const colunasNovasPartidas: TableColumn<PartidaCriar>[] = [
  { header: '#', accessorKey: 'numero' },
  { header: 'Rodada', accessorKey: 'rodada' },
  { header: 'Data', accessorKey: 'data' },
  { header: 'Hora', accessorKey: 'hora' },
  { header: 'Mandante', accessorKey: 'mandante.nome_popular' },
  { header: 'Visitante', accessorKey: 'visitante.nome_popular' },
  { header: 'Sede', accessorKey: 'sede.nome_popular' },
  { header: '', id: 'actions' }
]

const colunas: TableColumn<IPartida>[] = [
  { header: '', accessorKey: 'inconsistencias' },
  { header: '#', accessorKey: 'numero' },
  { header: 'Rodada', accessorKey: 'rodada' },
  { header: 'Data e hora', accessorKey: 'data' },
  {
    header: 'Mandante',
    accessorKey: 'mandante.nome_popular'
  },
  { header: 'Gols mandante', accessorKey: 'gols_mandante' },
  { header: 'Gols visitante', accessorKey: 'gols_visitante' },
  { header: 'Visitante', accessorKey: 'visitante.nome_popular' },
  { header: 'Sede', accessorKey: 'sede.nome_popular' },
  { header: 'Status', accessorKey: 'status' },
  { header: '', id: 'actions' }
]

const statusPartida = {
  finalizada: { label: 'Finalizada', color: 'success', icon: 'i-lucide-check-circle' },
  nao_iniciada: { label: 'Não iniciada', color: 'neutral', icon: 'i-lucide-pause' }
}

function setPickedPartida(partida: PartidaConsistencia) {
  pickedPartida.value = partida
  opened.value = true
}
</script>

<style></style>
