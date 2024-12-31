<template>
  <div class="w-screen h-screen flex flex-col items-center">
    <nav class="w-full py-5 flex border-b justify-center border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="max-w-7xl w-full">
        <h1
          class="px-4 bg-gradient-to-r dark:from-violet-500 from-violet-600 dark:to-indigo-500 to-indigo-600 inline-block text-transparent bg-clip-text text-2xl font-bold">
          minhatabela
        </h1>
      </div>
    </nav>
    <div class="max-w-7xl w-full h-full flex pt-20">
      <div class="px-4">
        <div class="flex flex-col gap-4">
          <h1
            class="bg-gradient-to-r dark:from-violet-500 from-violet-600 dark:to-indigo-500 to-indigo-600 inline-block text-transparent bg-clip-text text-6xl font-bold">
            minhatabela
          </h1>
          <p class="text-lg font-normal text-slate-800 dark:text-slate-300 lg:w-1/2">Simule a classificação do
            Brasileirão
            rodada
            a
            rodada e veja
            as chances do seu time do coração de alcançar um dos mais desejados títulos nacionais.
          </p>
          <UButton to="/simular" trailing size="lg" icon="material-symbols:arrow-forward-rounded" class="w-fit mt-4"
            color="indigo" :ui="{ rounded: 'rounded-full' }">Simular agora</UButton>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
          <UCard>
            <h1 class="text-semibold text-lg py-2">
              📈 Visualize a classificação
            </h1>
            <p class="text-slate-400">Veja a classificação atualizada do campeonato em forma de tabela</p>
          </UCard>
          <UCard>
            <h1 class="text-semibold text-lg py-2">
              ✏️ Simule a rodada
            </h1>
            <p class="text-slate-400">Simule os 10 jogos da rodada atual</p>
          </UCard>
          <UCard>
            <h1 class="text-semibold text-lg py-2">
              🚢 Navegue pelas rodadas
            </h1>
            <p class="text-slate-400"> Veja quais foram os resultados das rodadas anteriores e os confrontos que estão
              por vir</p>
          </UCard>
          <UCard>
            <h1 class="text-semibold text-lg py-2">
              📃 Salve suas simulações
            </h1>
            <p class="text-slate-400"> Suas simulações são salvas localmente</p>
          </UCard>
        </div>
      </div>
    </div>




    <footer class="text text-slate-300 flex justify-center py-6">
      minhatabela 2024 | <a href="https://alexislopes.com.br" target="_blank" class="ml-2"> alexislopes</a> </footer>

  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: false });
useHead({
  title: "Home · minhatabela"
})
</script>
<style>
html,
body {
  font-family: 'DM Sans', sans-serif;
}
</style>