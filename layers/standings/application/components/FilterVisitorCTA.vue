<script lang="ts" setup></script>

<template>
  <UCard class="w-3xs">
    <div class="flex flex-col gap-4 justify-center items-center h-full">
      <UIcon
        name="i-mdi-anonymous"
        class="size-10 mx-auto"
      />
      <h1 class="text-center text-xl font-bold">
        Olá, <span class="text-primary">visitante!</span>
      </h1>
      <p class="text-center text-sm">
        Faça login para acessar a filtragem de classificação por <strong>casa/fora</strong>,
        <strong>turno/returno</strong> e <strong>rodada a rodada</strong>. É grátis!
      </p>

      <LoginButton />
    </div>
  </UCard>
</template>
