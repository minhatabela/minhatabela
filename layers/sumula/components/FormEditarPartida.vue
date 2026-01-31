<script setup lang="ts">
import type { Vanue } from '~~/layers/shared/entities/Vanue'
import type { MatchesViewModel } from '../viewmodels/Matches.viewmodel'
import { VanueSchema } from '../../shared/schemas/Vanue.schema'
import { useMatchesManagementStore } from '../stores/MatchesManagement.store'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'

const vm = inject<MatchesViewModel>('matches-view-model')!

const opened = defineModel('opened', {
  type: Boolean,
  default: false
})

const toast = useToast()

const createMatch = computed(() => {
  return {
    rodada: vm.selectedMatch.value?.round,
    data: vm.selectedMatch.value?.date,
    gols_mandante: vm.homeGoals.value,
    gols_visitante: vm.awayGoals.value,
    mandante: vm.selectedMatch.value?.homeTeam.id,
    visitante: vm.selectedMatch.value?.awayTeam.id,
    sede: vm.selectedMatch.value?.vanue?.id
  }
})

const inputDate = useTemplateRef('inputDate')

const { execute: acceptChanges, status: statusChanges } = useAsyncData(
  'changes',
  async () =>
    await useSupabaseClient()
      .from('partida')
      .update(createMatch.value as never)
      .eq('id', vm.selectedMatch.value!.id),
  {
    immediate: false
  }
)

const { data: vanues, status: vanuesStatus } = useAsyncData(
  'matches/management/vanues',
  () => $fetch('/api/sedes'),
  {
    transform: response => VanueSchema.array().parse(response),
    default: () => []
  }
)

watch(vanuesStatus, value => {
  if (value === 'success') {
    useMatchesManagementStore().vanues = vanues.value
  }
})

const sedesDrodpwn = computed(() => {
  return vanues.value.map((sede: Vanue) => {
    return {
      label: sede.name,
      value: sede.id
    }
  })
})

const emit = defineEmits(['refresh'])

watch(statusChanges, value => {
  if (value === 'success') {
    toast.add({ description: 'Sucesso ao atualizar partida', color: 'success' })
    opened.value = false
    emit('refresh')
  } else if (value === 'error') {
    toast.add({ description: 'Erro ao atualizar partida', color: 'error' })
  }
})

const df = new DateFormatter('pt-BR', {
  dateStyle: 'long'
})

onUnmounted(() => (vm.selectedMatch.value = undefined))
</script>

<template>
  <USlideover
    v-model:open="opened"
    class="rounded-lg"
  >
    <template #header>
      <h1 class="text-lg font-semibold">Editar partida</h1>
    </template>

    <template #body>
      <div class="flex gap-2 justify-end py-4">
        <UBadge
          v-if="vm.selectedMatch.value?.round"
          :label="`Rodada ${vm.selectedMatch.value.round}`"
          variant="subtle"
          class="rounded-full"
          color="neutral"
        />
        <UBadge
          :label="vm.selectedMatch.value?.status.label"
          class="rounded-full"
          variant="subtle"
          :icon="vm.selectedMatch.value?.status.icon"
          :color="vm.selectedMatch.value?.status.color"
        />
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <h2 class="text-2xl mb-3">Clubes</h2>
          <div class="flex gap-2 w-full items-center justify-between">
            <div class="flex gap-2 items-center">
              <img
                class="h-10"
                :src="vm.selectedMatch.value?.homeTeam.emblem"
                size="lg"
              />
              {{ vm.selectedMatch.value?.homeTeam.name }}
            </div>
            <UIcon
              class="text-2xl"
              name="i-lucide-x"
            />
            <div class="flex gap-2 items-center">
              {{ vm.selectedMatch.value?.awayTeam.name }}
              <img
                class="h-10"
                :src="vm.selectedMatch.value?.awayTeam.emblem"
                size="lg"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-center justify-between text-2xl">
            <h2 class="text-2xl">Gols</h2>
          </div>
          <div class="flex gap-4">
            <label class="flex flex-col gap-2 w-full">
              Gols {{ vm.selectedMatch.value?.homeTeam.name }}
              <UInput
                v-model="vm.homeGoals.value"
                type="number"
              />
            </label>
            <label class="flex flex-col gap-2 w-full text-end">
              Gols {{ vm.selectedMatch.value?.awayTeam.name }}
              <UInput
                v-model="vm.awayGoals.value"
                type="number"
              />
            </label>
          </div>
        </div>
        <div class="flex gap-2 items-center justify-between text-2xl">
          <h2 class="text-2xl">Sede</h2>
        </div>
        <label class="flex flex-col gap-2 w-full">
          Sede
          <USelectMenu
            v-model="vm.vanue.value"
            value-key="value"
            :items="sedesDrodpwn"
            placeholder="Selecione a sede"
          />
        </label>
        <div class="flex gap-2 items-center justify-between text-2xl">
          <h2 class="text-2xl">Rodada</h2>
        </div>
        <label class="flex flex-col gap-2 w-full">
          <RoundPicker v-model="vm.round.value" />
        </label>
        <div class="flex gap-2 items-center justify-between text-2xl">
          <h2>Data e hora</h2>
        </div>
        <div class="flex gap-4">
          <label class="flex flex-col gap-2 w-3/2">
            Data

            <UPopover :reference="inputDate?.inputsRef[3]?.$el">
              <UButton
                color="neutral"
                variant="subtle"
                icon="i-lucide-calendar"
              >
                {{
                  vm.date.value
                    ? df.format(vm.date.value.toDate(getLocalTimeZone()))
                    : 'Selecione a data e hora'
                }}
              </UButton>
              <template #content>
                <div class="flex flex-col items-center justify-center">
                  <UCalendar
                    v-model="vm.date.value"
                    :year-controls="false"
                    :fixed-weeks="true"
                    class="p-2"
                  />
                  <UInputTime
                    v-model="vm.time.value"
                    :hour-cycle="24"
                  />
                </div>
              </template>
            </UPopover>
          </label>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex flex-col w-full items-center gap-4">
        <div class="flex justify-between w-full gap-4">
          <UButton
            class="justify-center w-1/2"
            color="neutral"
            variant="outline"
            @click="opened = false"
            >Fechar</UButton
          >
          <UButton
            class="justify-center w-1/2"
            variant="solid"
            :loading="statusChanges === 'pending'"
            @click="acceptChanges()"
            >Salvar mudanças
          </UButton>
        </div>
      </div>
    </template>
  </USlideover>
</template>
