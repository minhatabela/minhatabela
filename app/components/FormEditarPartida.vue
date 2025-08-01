<script setup lang="ts">
import type { Vanue } from '~~/layers/shared/entities/Vanue'

interface FormEditarPartidaProps {
  partida: any
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

const hasInconsistentGoals = computed(() => {
  return (
    !!props.partida.inconsistencias.gols_mandante || !!props.partida.inconsistencias.gols_visitante
  )
})

const hasInconsistentSede = computed(() => {
  return !!props.partida.inconsistencias.sede
})

const hasInconsistentDateTime = computed(() => {
  return !!props.partida.inconsistencias.data || !!props.partida.inconsistencias.hora
})

const hasIconsistentSedeInDB = computed(() => {
  return sedes.value.find(
    (sede: Vanue) => sede.name?.toString() === props.partida.inconsistencias.sede?.toString()
  )
})

const { execute: cerateSede, status } = useAsyncData(
  'createSede',
  async () => {
    const [nome_popular, cidade] = props.partida.inconsistencias.sede!.split('-')

    const { error, data } = await useSupabaseClient().from('sede').insert({
      nome_popular: nome_popular.trim(),
      cidade: cidade.trim(),
      key: props.partida.inconsistencias.sede
    })

    if (error) {
      toast.add({
        title: 'Erro ao criar sede',
        description: 'Ocorreu um erro ao criar a sede.',
        color: 'error',
        icon: 'i-lucide-alert'
      })
    }

    return data
  },
  { immediate: false }
)

const toast = useToast()
// watch(status, newStatus => {
//   if (newStatus === 'success') {
//     refreshSedes()
//   }
// })

function useCamposParidas() {
  const partidaAuxiliar = ref({
    gols_mandante: undefined,
    gols_visitante: undefined,
    data: undefined,
    hora: undefined,
    sede: undefined,
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
      return partidaAuxiliar.value?.sede || props.partida.sede.id
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

function acceptOficialScoreboard() {
  partidaAuxiliar.value!.gols_mandante = props.partida.inconsistencias.gols_mandante
  partidaAuxiliar.value!.gols_visitante = props.partida.inconsistencias.gols_visitante
}

function acceptOficialSede() {
  const sedeOficialId = sedes.value.find(
    sede => sede.key === props.partida.inconsistencias.sede
  )!.id
  partidaAuxiliar.value!.sede = sedeOficialId
}

function acceptOficialDateTime() {
  partidaAuxiliar.value!.data = props.partida.inconsistencias.data
  partidaAuxiliar.value!.hora = props.partida.inconsistencias.hora
}

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

const statusPartida = {
  finalizada: { label: 'Finalizada', color: 'success', icon: 'i-lucide-check-circle' },
  nao_iniciada: { label: 'Não iniciada', color: 'neutral', icon: 'i-lucide-pause' }
}

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
          :label="`Partida ${partida.numero}`"
          variant="subtle"
          class="rounded-full"
          color="neutral"
        />
        <UBadge
          :label="`Rodada ${partida.rodada}`"
          variant="subtle"
          class="rounded-full"
          color="neutral"
        />
        <UBadge
          :label="statusPartida[partida.status].label"
          class="rounded-full"
          variant="subtle"
          :icon="statusPartida[partida.status].icon"
          :color="statusPartida[partida.status].color"
        />
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <h2 class="text-2xl mb-3">Clubes</h2>
          <div class="flex gap-2 w-full items-center justify-between">
            <div class="flex gap-2 items-center">
              <img
                class="h-10"
                :src="partida.mandante.escudo!"
                size="lg"
              />
              {{ partida.mandante.nome_popular }}
            </div>
            <UIcon
              class="text-2xl"
              name="i-lucide-x"
            />
            <div class="flex gap-2 items-center">
              {{ partida.visitante.nome_popular }}
              <img
                class="h-10"
                :src="partida.visitante.escudo!"
                size="lg"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-center justify-between text-2xl">
            <h2 class="text-2xl">Gols</h2>
            <UBadge
              v-if="hasInconsistentGoals"
              trailing-icon="i-lucide-replace"
              class="rounded-full"
              color="warning"
              variant="subtle"
              :label="`Resultado oficial: ${Number(partida.inconsistencias.gols_mandante) || '-'} x ${Number(partida.inconsistencias.gols_visitante) || '-'}`"
              @click="acceptOficialScoreboard"
            />
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
          <UBadge
            v-if="hasInconsistentSede && !hasIconsistentSedeInDB"
            trailing-icon="i-lucide-plus"
            class="rounded-full cursor-pointer"
            :class="{ 'animate-pulse': status === 'pending' }"
            color="info"
            variant="subtle"
            :label="`Criar sede ${partida.inconsistencias.sede}`"
            @click="cerateSede"
          />
          <UBadge
            v-else-if="hasInconsistentSede && hasIconsistentSedeInDB"
            trailing-icon="i-lucide-replace"
            class="rounded-full cursor-pointer"
            color="warning"
            variant="subtle"
            :label="`Sede oficial: ${partida.inconsistencias.sede}`"
            @click="acceptOficialSede"
          />
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
          <UBadge
            v-if="hasInconsistentDateTime"
            trailing-icon="i-lucide-replace"
            class="rounded-full"
            color="warning"
            variant="subtle"
            :label="`Date e hora oficiais: ${partida.inconsistencias.data} ${partida.inconsistencias.hora}`"
            @click="acceptOficialDateTime"
          />
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
        <UButton
          v-if="partida.status != 'finalizada'"
          class="w-full justify-center"
          variant="ghost"
          color="secondary"
          :disabled="
            !isDefined(partidaAuxiliar.gols_mandante) || !isDefined(partidaAuxiliar.gols_visitante)
          "
          @click="partidaAuxiliar.status = 'finalizada'"
          >Finalizar partida</UButton
        >
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
