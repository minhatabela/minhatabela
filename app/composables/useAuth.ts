const toast = useToast()
const supabase = useSupabaseClient()

export const useAuth = () => {

  async function login() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) {
      toast.add({ title: 'Erro ao realizar o login', color: 'error' })
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.add({ title: 'Erro ao tentar sair', color: 'error' })
    }
  }

  return { login, logout }
}
