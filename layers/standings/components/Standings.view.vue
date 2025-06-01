<script setup lang="ts">
import { TableViewEnum } from '../enums/TableView.enum';

const { columns, tabela, tableView } = useTabela()

const tableViewOptions = [
  { label: 'Oficial Simulada', value: TableViewEnum.OFICIAL_SIMULADA },
  { label: 'Simulada', value: TableViewEnum.SIMULADA },
  { label: 'Oficial', value: TableViewEnum.OFICIAL }
]

const [sensitive, toggle] = useToggle()

</script>

<template>
  <div class="w-full">
      <div class="flex justify-between items-center mb-4">
        <USelect
          :items="tableViewOptions"
          v-model="tableView"
        />
        <UButton
          size="xs"
          variant="ghost"
          color="primary"
          :label="`${sensitive ? 'ver' : 'ocultar'} tabela`"
          :icon="sensitive ? 'i-carbon-view-filled' : 'i-carbon-view-off-filled'"
          @click="toggle()"
        />
      </div>
      <Table
        v-if="tabela.length"
        :columns="columns"
        :tabela="tabela"
        :sensitive="sensitive"
      />
      <USkeleton
        v-else
        class="w-full h-full"
      />
    </div>
</template>