<script setup lang="ts">
const { login } = useAuth()
</script>

<template>
  <UBadge
    variant="subtle"
    icon="i-mdi-anonymous"
    class="rounded-full cursor-pointer"
    size="lg"
    trailing-icon="i-lucide-chevron-right"
    @click="login"
  >
    Entrar
  </UBadge>
</template>
