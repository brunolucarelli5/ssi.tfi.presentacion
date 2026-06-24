export const isPdfExport = () => (
  typeof window !== 'undefined'
  && new URLSearchParams(window.location.search).has('pdf')
);

export const getImageLoadingProps = () => (
  isPdfExport()
    ? { loading: 'eager', decoding: 'sync' }
    : { loading: 'lazy', decoding: 'async' }
);
