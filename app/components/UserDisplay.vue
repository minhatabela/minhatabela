<template>
  <UPopover
    mode="click"
    :popper="{ offsetDistance: 0 }"
    v-model:open="open"
  >
    <div class="flex items-center gap-3 min-w-max">
      <UBadge
        class="rounded-full p-2 cursor-pointer"
        color="neutral"
        variant="outline"
        :avatar="{ src: user?.user_metadata.avatar_url }"
        :trailing-icon="trailingIcon"
        size="lg"
      >
        {{ user?.user_metadata.name }}
      </UBadge>
    </div>

    <template #content>
      <div class="flex flex-col">
        <UButton
          v-if="user?.user_metadata.role === 'admin'"
          variant="link"
          color="neutral"
          icon="i-ic-outline-admin-panel-settings"
          @click="navigateTo('/admin/consistencia')"
          >administrar
        </UButton>
        <USeparator />
        <UButton
          variant="link"
          color="neutral"
          icon="i-solar-logout-broken"
          @click="logout"
          >sair</UButton
        >
      </div>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
const { logout } = useAuth()
const user = useSupabaseUser()

const open = ref(false)

const trailingIcon = computed(() => (open.value ? `i-lucide-chevron-up` : `i-lucide-chevron-down`))
</script>

<style></style>
