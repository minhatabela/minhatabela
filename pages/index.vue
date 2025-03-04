<template>
  <div class="w-screen h-screen flex flex-col items-center">
    <nav class="w-full py-5 flex border-b justify-center border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="max-w-7xl w-full justify-between items-center flex">
        <h1
          class="px-4 bg-gradient-to-r dark:from-violet-500 from-violet-600 dark:to-indigo-500 to-indigo-600 inline-block text-transparent bg-clip-text text-2xl font-bold">
          minhatabela
          <UBadge :ui="{ rounded: 'rounded-full' }" class="absolute ml-1" variant="subtle" color="violet"
            label="beta" />

        </h1>
      </div>
    </nav>
    <section class="max-w-7xl w-full h-full flex pt-20">
      <div class="px-4">
        <div class="flex flex-col gap-4">
          <h4
            class="bg-gradient-to-r dark:from-violet-500 from-violet-600 dark:to-indigo-500 to-indigo-600 inline-block text-transparent bg-clip-text text-6xl font-bold">
            minhatabela
          </h4>
          <p class="text-lg font-normal text-slate-800 dark:text-slate-300 lg:w-1/2">Simule a classificação do
            Brasileirão
            rodada
            a
            rodada e veja
            as chances do seu time do coração de alcançar um dos mais desejados títulos nacionais.
          </p>
          <UButton to="/simular" trailing size="lg" icon="material-symbols:arrow-forward-rounded" class="w-fit mt-4"
            color="fuchsia" variant="outline" :ui="{ rounded: 'rounded-full' }">Simular agora</UButton>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
          <UCard>
            <h4 class="text-semibold text-lg py-2">
              📈 Visualize a classificação
            </h4>
            <p class="text-slate-400">Veja a tabela atualizada e como ela comporta com suas simulações</p>
          </UCard>
          <UCard>
            <h4 class="text-semibold text-lg py-2">
              ✏️ Simule a rodada
            </h4>
            <p class="text-slate-400">Simule rodada a rodada do campeonato, desde a rodada 1</p>
          </UCard>
          <UCard>
            <h4 class="text-semibold text-lg py-2">
              🚢 Navegue pelas rodadas
            </h4>
            <p class="text-slate-400"> Veja quais foram os resultados das rodadas anteriores e os confrontos que estão
              por vir</p>
          </UCard>
          <UCard>
            <h4 class="text-semibold text-lg py-2">
              📃 Salve suas simulações
            </h4>
            <p class="text-slate-400"> Suas simulações são salvas localmente, entre para salvar na nuvem</p>
          </UCard>
          <UCard>
            <h4 class="text-semibold text-lg py-2">
              🙈 Oculte a tabela
            </h4>
            <p class="text-slate-400"> Com emoção: esconda a tebela enquanto simula</p>
          </UCard>
          <UCard>
            <h4 class="text-semibold text-lg py-2">
              ⬇️ Baixe a rodada simulada
            </h4>
            <p class="text-slate-400"> Faça download dos resultados simulados da rodada</p>
          </UCard>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <CookieConsentBanner v-if="!consent" />
    </Teleport>


    <footer class="text text-slate-300 flex justify-center py-6">
      minhatabela {{ new Date().getFullYear() }} | <a href="https://alexislopes.com.br" target="_blank" class="ml-2">
        alexislopes </a> <span class="ml-1"> | {{ pkg.version }} </span></footer>

  </div>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()

useScript({
  src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.public.adsenseId}`,
  async: true,
  crossorigin: "anonymous"
})
const consent = useCookie<boolean>('consent')

definePageMeta({ layout: false });
import * as pkg from '../package.json';

useSeoMeta({
  title: 'Home · minhatabela',
  description: 'Simule a tabela do Brasileirão Betano 2025 rodada a rodada.',
  colorScheme: 'dark light',
  applicationName: 'minhatabela',
  ogTitle: 'Home · minhatabela',
  ogDescription: 'Simule a tabela do Brasileirão Betano 2025 rodada a rodada.',
  ogUrl: 'https://minhatabela.com',
  ogImage: 'https://atsavbpgqgsvxwlzvrwy.supabase.co/storage/v1/object/public/seo//ogImage.png',
  ogImageUrl: 'https://atsavbpgqgsvxwlzvrwy.supabase.co/storage/v1/object/public/seo//ogImage.png',
})

useHead({
  title: "Home · minhatabela"
})

const user = useSupabaseUser()

if (user.value) {
  navigateTo('/simular')
}


</script>
<style>
html,
body {
  font-family: 'DM Sans', sans-serif;
}
</style>