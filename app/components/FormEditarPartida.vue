<script setup lang="ts">
import type { Vanue } from '~~/layers/shared/entities/Vanue'
import type { Match } from '../../layers/shared/entities/Match'

interface FormEditarPartidaProps {
  partida: Match
}

const props = defineProps<FormEditarPartidaProps>()

const sedes = ref<Vanue[]>([])

const opened = defineModel('opened', {
  type: Boolean,
  default: false
})

const sedesDrodpwn = computed(() => {
  return sedes.value.map((sede: Vanue) => {
    return {
      label: sede.name,
      value: sede.id
    }
  })
})

const toast = useToast()

function useCamposParidas() {
  const partidaAuxiliar = ref({
    homeGoals: undefined,
    awayGoals: undefined,
    date: undefined,
    time: undefined,
    vanue: undefined,
    status: undefined
  })

  const data = computed({
    get() {
      return partidaAuxiliar.value?.data || props.partida.data
    },
    set(value: string) {
      partidaAuxiliar.value!.data = value
    }
  })

  const hora = computed({
    get() {
      return partidaAuxiliar.value?.hora || props.partida.hora
    },
    set(value: string) {
      partidaAuxiliar.value!.hora = value
    }
  })

  const golsMandante = computed({
    get() {
      return partidaAuxiliar.value?.gols_mandante || props.partida.gols_mandante
    },
    set(value: number) {
      partidaAuxiliar.value!.gols_mandante = value
    }
  })

  const golsVisitante = computed({
    get() {
      return partidaAuxiliar.value?.gols_visitante || props.partida.gols_visitante
    },
    set(value: number) {
      partidaAuxiliar.value!.gols_visitante = value
    }
  })

  const sede = computed({
    get() {
      return partidaAuxiliar.value?.sede || props.partida.vanue?.id
    },
    set(value: string) {
      partidaAuxiliar.value!.sede = value
    }
  })

  return {
    partidaAuxiliar,
    sede,
    golsMandante,
    golsVisitante,
    data,
    hora
  }
}

const { partidaAuxiliar, sede, golsMandante, golsVisitante, data, hora } = useCamposParidas()

const { execute: acceptChanges, status: statusChanges } = useAsyncData(
  'changes',
  async () =>
    await useSupabaseClient()
      .from('partida')
      .update(partidaAuxiliar.value)
      .eq('id', props.partida.id),
  {
    immediate: false
  }
)

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

onUnmounted(() => {
  partidaAuxiliar.value = {
    gols_mandante: undefined,
    gols_visitante: undefined,
    data: undefined,
    hora: undefined,
    sede: undefined,
    status: undefined
  }
})
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
          :label="`Rodada ${partida.round.value}`"
          variant="subtle"
          class="rounded-full"
          color="neutral"
        />
        <UBadge
          :label="partida.status.label"
          class="rounded-full"
          variant="subtle"
          :icon="partida.status.icon"
          :color="partida.status.color"
        />
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <h2 class="text-2xl mb-3">Clubes</h2>
          <div class="flex gap-2 w-full items-center justify-between">
            <div class="flex gap-2 items-center">
              <img
                class="h-10"
                :src="partida.homeTeam.emblem"
                size="lg"
              />
              {{ partida.homeTeam.name }}
            </div>
            <UIcon
              class="text-2xl"
              name="i-lucide-x"
            />
            <div class="flex gap-2 items-center">
              {{ partida.awayTeam.name }}
              <img
                class="h-10"
                :src="partida.awayTeam.emblem"
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
              Gols mandante
              <UInput
                v-model="golsMandante"
                type="number"
              />
            </label>
            <label class="flex flex-col gap-2 w-full text-end">
              Gols visitante
              <UInput
                v-model="golsVisitante"
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
          <USelect
            v-model="sede"
            :items="sedesDrodpwn"
            placeholder="Selecione a sede"
          />
        </label>
        <div class="flex gap-2 items-center justify-between text-2xl">
          <h2>Data e hora</h2>
        </div>
        <div class="flex gap-4">
          <label class="flex flex-col gap-2 w-3/2">
            Data
            <UInput
              v-model="data"
              type="date"
              placeholder="Selecione a data"
            />
          </label>
          <label class="flex flex-col gap-2">
            Hora
            <UInput
              v-model="hora"
              type="time"
              placeholder="Selecione a data"
            />
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
            :disabled="Object.values(partidaAuxiliar).filter(f => f).length === 0"
            :loading="statusChanges === 'pending'"
            @click="acceptChanges()"
            >Aceitar mudanças
          </UButton>
        </div>
      </div>
    </template>
  </USlideover>
</template>
