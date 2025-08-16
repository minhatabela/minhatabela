<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { useMatchesStore } from '../stores/Matches.store'
import { HomeAwayEnum } from '../enums/HomeAway.enum'
import { TurnReturnEnum } from '../enums/TurnReturn.enum'

const homeAwayFilterItems = ref<TabsItem[]>([
  {
    label: 'Tudo',
    icon: 'i-lucide-circle',
    value: HomeAwayEnum.ALL
  },
  {
    label: 'Casa',
    icon: 'i-lucide-house',
    value: HomeAwayEnum.HOME
  },
  {
    label: 'Fora',
    icon: 'i-lucide-plane',
    value: HomeAwayEnum.AWAY
  }
])

const turnReturnItems = ref<TabsItem[]>([
  {
    label: 'Ambos',
    icon: 'i-lucide-circle',
    value: TurnReturnEnum.BOTH
  },
  {
    label: 'Turno',
    icon: 'i-lucide-corner-up-right',
    value: TurnReturnEnum.TURN
  },
  {
    label: 'Returno',
    icon: 'i-lucide-corner-down-left',
    value: TurnReturnEnum.RETURN
  }
])
</script>

<template>
  <UPopover>
    <UButton
      icon="i-lucide-filter"
      variant="ghost"
    />

    <template #content>
      <UTabs
        v-model="useMatchesStore().standingsFilter.homeAway"
        :items="homeAwayFilterItems"
        class="w-full"
      />
      <UTabs
        v-model="useMatchesStore().standingsFilter.turnReturn"
        :items="turnReturnItems"
        class="w-full"
      />
    </template>
  </UPopover>
</template>
