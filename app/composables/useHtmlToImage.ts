import download from 'downloadjs'
import { toPng } from 'html-to-image'

export const useHtmlToImage = () => {
  const { $posthog } = useNuxtApp()

  const toast = useToast()

  function componentToPng(component: HTMLElement, rodada: number) {
    toPng(toValue(component), {
      width: 1080,
      height: 1350,
      canvasHeight: 1350,
      canvasWidth: 1080,
      fetchRequestInit: {
        method: 'GET',
        cache: 'no-cache' // <-- Important!
      }
    })
      .then(function (dataUrl) {
        download(dataUrl, `minhatabela rodada ${rodada}`)
        if ($posthog) $posthog().capture('baixar-arte-rodada', { rodada })
      })
      .catch(function (error) {
        console.error(error)
        toast.add({ title: `Erro ao baixar simulação da rodada ${rodada}`, color: 'error' })
      })
  }

  return { componentToPng }
}
