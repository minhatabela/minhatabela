<template>
  <UCard class="fixed right-0 bottom-0  w-full flex justify-center items-center lg:max-w-sm lg:right-4 lg:bottom-4   ">
    <div class="flex items-center flex-col w-full gap-4">
      <div class="flex justify-start w-full">
        <img class="h-10 w-10" :src="LogoCookie" />
      </div>
      <div>
        <p class="text-xl font-black">O minhatabela usa cookies</p>
        <p>Este site usa cookies para garantir que você obtenha a melhor experiência. Continuar significa que você
          concorda.</p>
      </div>
      <div class="flex w-full justify-end">
        <UButton color="neutral" @click="consent = true">Saquei!</UButton>
      </div>
    </div>
  </Ucard>
</template>

<script lang="ts" setup>
import LogoCookie from '@/public/logo-cookie.svg';

const { gtag } = useGtag()
const consent = useCookie<boolean>('consent', { expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) })

watch(consent, (value) => {
  if (value) {
    gtag('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted'
    })
  }
})

</script>

<style></style>