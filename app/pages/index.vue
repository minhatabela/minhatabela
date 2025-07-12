<template>
  <div class="w-screen h-screen flex flex-col items-center">
    <nav
      class="w-full py-5 flex border-b justify-center border-slate-200 dark:border-slate-800 shadow-xs"
    >
      <div class="max-w-7xl w-full justify-between items-center flex">
        <h1 class="inline-block dark:text-white text-gray-800 bg-clip-text text-2xl font-bold">
          minhatabela
          <UBadge
            class="absolute ml-1 rounded-full"
            variant="subtle"
            color="primary"
            label="beta"
          />
        </h1>
      </div>
    </nav>
    <section class="max-w-7xl w-full h-full flex pt-20">
      <div class="px-4">
        <div class="flex flex-col gap-4">
          <h4 class="dark:text-white text-gray-800 text-6xl font-bold">minhatabela</h4>
          <p class="text-lg font-normal text-slate-800 dark:text-slate-300 lg:w-1/2">
            Simule a classificação do Brasileirão rodada a rodada e veja as chances do seu time do
            coração de alcançar um dos mais desejados títulos nacionais.
          </p>
          <UButton
            to="/simular"
            trailing
            size="lg"
            icon="material-symbols:arrow-forward-rounded"
            class="w-fit mt-4 rounded-full"
            color="primary"
            variant="outline"
            >Simular agora</UButton
          >
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
          <UCard variant="subtle">
            <h4 class="text-semibold text-lg py-2">📈 Visualize a classificação</h4>
            <p class="text-slate-400">
              Veja a tabela atualizada e como ela comporta com suas simulações
            </p>
          </UCard>
          <UCard variant="subtle">
            <h4 class="text-semibold text-lg py-2">✏️ Simule a rodada</h4>
            <p class="text-slate-400">Simule rodada a rodada do campeonato, desde a rodada 1</p>
          </UCard>
          <UCard variant="subtle">
            <h4 class="text-semibold text-lg py-2">🚢 Navegue pelas rodadas</h4>
            <p class="text-slate-400">
              Veja quais foram os resultados das rodadas anteriores e os confrontos que estão por
              vir
            </p>
          </UCard>
          <UCard variant="subtle">
            <h4 class="text-semibold text-lg py-2">📃 Salve suas simulações</h4>
            <p class="text-slate-400">Faça login, salve-as e acesse em qualquer lugar!</p>
          </UCard>
          <UCard variant="subtle">
            <h4 class="text-semibold text-lg py-2">🙈 Oculte a tabela</h4>
            <p class="text-slate-400">Com emoção: esconda a tebela enquanto simula</p>
          </UCard>
          <UCard variant="subtle">
            <h4 class="text-semibold text-lg py-2">⬇️ Baixe a rodada simulada</h4>
            <p class="text-slate-400">Faça download dos resultados simulados da rodada</p>
          </UCard>
        </div>
      </div>
    </section>

    <ClientOnly>
      <Teleport to="body">
        <CookieConsentBanner v-if="!consent" />
      </Teleport>
    </ClientOnly>

    <footer class="text text-slate-300 flex justify-center py-6">
      minhatabela {{ new Date().getFullYear() }} |
      <a
        href="https://alexislopes.com.br"
        target="_blank"
        class="ml-2"
      >
        alexislopes
      </a>
      <span class="ml-1"> | {{ pkg.version }} </span>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import * as pkg from '../package.json'
const consent = useCookie<boolean>('consent')

definePageMeta({ layout: false })

useSeoMeta({
  title: 'Simule as rodadas e a tabela do Brasileirão Betano 2025 com o minhatabela',
  description: 'Simule as rodadas e a tabela do Brasileirão Betano 2025 com o minhatabela',
  colorScheme: 'dark light',
  applicationName: 'minhatabela',
  ogTitle: 'Simule o Brasileirão 2025 agora no minhatabela',
  ogDescription: 'Simule as rodadas e a tabela do Brasileirão Betano 2025 com o minhatabela',
  ogUrl: 'https://minhatabela.com',
  ogImage: 'https://atsavbpgqgsvxwlzvrwy.supabase.co/storage/v1/object/public/seo//ogImage.png',
  ogImageUrl: 'https://atsavbpgqgsvxwlzvrwy.supabase.co/storage/v1/object/public/seo//ogImage.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Simule as rodadas e a tabela do Brasileirão Betano 2025 com o minhatabela',
  twitterImage: 'https://atsavbpgqgsvxwlzvrwy.supabase.co/storage/v1/object/public/seo//ogImage.png'
})

useHead({
  title: 'Simule as rodadas e a tabela do Brasileirão Betano 2025 com o minhatabela',
  link: [{ rel: 'canonical', href: 'https://minhatabela.com' }]
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
