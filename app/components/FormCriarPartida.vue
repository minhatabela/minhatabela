<script setup lang="ts">
import type { Team } from '~~/layers/shared/entities/Team'
import type { Match } from '~~/layers/shared/entities/Match'
import type { Vanue } from '~~/layers/shared/entities/Vanue'
const opened = defineModel('opened', {
  type: Boolean,
  default: false
})

const props = defineProps<{
  partida: Match
}>()

const emit = defineEmits(['refresh'])

const clubes = ref<Team[]>([])
const sedes = ref<Vanue[]>([])
const clubesDropdown = computed(() => {
  return clubes.value.map((clube: Team) => {
    return {
      label: clube.name,
      value: clube.id
    }
  })
})
const sedesDrodpwn = computed(() => {
  return sedes.value.map((sede: Vanue) => {
    return {
      label: sede.name,
      value: sede.id
    }
  })
})

const mandanteId = ref()
const mandante = computed({
  get() {
    return clubes.value.find((clube: any) => clube.slug === props.partida.homeTeam)?.id
  },
  set(value: string) {
    mandanteId.value = value
  }
})

const visitanteId = ref()
const visitante = computed({
  get() {
    return clubes.value.find((clube: any) => clube.slug === props.partida.awayTeam)?.id
  },
  set(value: string) {
    visitanteId.value = value
  }
})

const sedeId = ref()
const sede = computed({
  get() {
    return sedes.value.find((sede: any) => sede.key === props.partida.vanue)?.id
  },
  set(value: string) {
    sedeId.value = value
  }
})

const numeroPartida = ref()
const numero = computed({
  get() {
    return props.partida.number.value
  },
  set(value: string) {
    numeroPartida.value = value
  }
})

const rodadaPartida = ref()
const rodada = computed({
  get() {
    return props.partida.round.value
  },
  set(value: string) {
    rodadaPartida.value = value
  }
})

const dataPartida = ref()
const data = computed({
  get() {
    return props.partida.date.formattedDate
  },
  set(value: string) {
    dataPartida.value = value
  }
})

const horaPartida = ref()
const hora = computed({
  get() {
    return props.partida.time.formattedValue
  },
  set(value: string) {
    horaPartida.value = value
  }
})

const toast = useToast()

async function criarPartida() {
  const partida = {
    numero: Number(numeroPartida.value) || numero.value,
    mandante: mandanteId.value || mandante.value,
    visitante: visitanteId.value || visitante.value,
    rodada: rodadaPartida.value || rodada.value,
    sede: sedeId.value || sede.value,
    data: dataPartida.value || data.value,
    hora: horaPartida.value || hora.value
  }

  const { error } = await useSupabaseClient().from('partida').insert([partida])

  if (error) {
    toast.add({ description: error.message, color: 'error' })
  } else {
    toast.add({
      title: 'Base atualizada com sucesso!',
      icon: 'i-simple-line-icons-check',
      description: 'Partida criada com sucesso',
      color: 'success'
    })
    opened.value = false
    emit('refresh')
  }
}
</script>

<template>
  <USlideover
    v-model:open="opened"
    class="rounded-lg"
  >
    <template #header>
      <div class="flex flex-col w-full gap-4">
        <h1
          color="neutral"
          class="mb-2 w-fit"
        >
          Criar Partida
        </h1>
        <h3 class="text-xl text-bold">Criar nova partida</h3>
      </div>
    </template>
    <template #body>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4 justify-between items-end">
          <label class="flex flex-col gap-2 w-full">
            mandante
            <USelect
              v-model="mandante"
              :items="clubesDropdown"
              placeholder="Selecione o clube mandante"
            />
          </label>
          x
          <label class="flex flex-col gap-2 w-full">
            visitante
            <USelect
              v-model="visitante"
              :items="clubesDropdown"
              placeholder="Selecione o clube visitante"
            />
          </label>
        </div>
        <label class="flex flex-col gap-2 w-full">
          sede
          <USelect
            v-model="sede"
            :items="sedesDrodpwn"
            placeholder="Selecione a sede"
          />
        </label>
        <label class="flex flex-col gap-2 w-full">
          número
          <UInput
            v-model="numero"
            disabled
          />
        </label>
        <label class="flex flex-col gap-2 w-full">
          rodada
          <UInput
            v-model="rodada"
            disabled
          />
        </label>
        <div class="flex gap-4 justify-between items-end">
          <label class="flex flex-col gap-2 w-full">
            data
            <UInput v-model="data" />
          </label>
          <label class="flex flex-col gap-2 w-full">
            hora
            <UInput v-model="hora" />
          </label>
        </div>
      </div>
    </template>
    <template #footer>
      <div>
        <UButton
          label="Criar partida na base do minhatabela"
          @click="criarPartida"
        />
      </div>
    </template>
  </USlideover>
</template>

<style scoped>
/* Add your styles here */
</style>
