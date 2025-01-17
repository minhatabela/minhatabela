import download from 'downloadjs';
import { toPng } from "html-to-image";

export const useHtmlToImage = () => {

  function componentToPng(component: HTMLElement) {
    return toPng(component, { width: 1080, height: 1350, canvasHeight: 1350, canvasWidth: 1080 }).then(function (dataUrl) {
      download(dataUrl, 'minhatabela rodada 1');
    });
  }

  return { componentToPng }
}
