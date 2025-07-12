<script lang="ts" setup>
import type { TableColumn } from '#ui/types'
import type { StandingPositon } from '../../domain/dtos/StandingPosition.dto'
import { Position } from '../../domain/values/Position'
import PositionBadge from './PositionBadge.vue'

interface Props {
  columns: TableColumn<any>[]
  standings: StandingPositon[]
  sensitive?: boolean
}

const { sensitive = false } = defineProps<Props>()
</script>

<template>
  <UCard
    variant="subtle"
    class="relative"
  >
    <UTable
      :columns="columns"
      :data="standings"
    >
      <template #position-cell="{ row }">
        <PositionBadge :position="new Position(row.index + 1)" />
      </template>
      <template #team-cell="{ row }">
        <TeamCell
          :emblem="row.original.emblem"
          :team="row.original.team"
        />
      </template>
      <template #points-cell="{ row }">
        <span class="font-bold text-highlighted">{{ row.original.points }}</span>
      </template>
    </UTable>
    <HiddenContent :enabled="sensitive" />
  </UCard>
</template>

<style></style>
