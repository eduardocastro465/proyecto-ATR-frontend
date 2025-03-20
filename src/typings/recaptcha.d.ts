declare var grecaptcha: {
  ready: (callback: () => void) => void;
  render: (
    container: string,
    parameters: { sitekey: string; callback?: (token: string) => void }
  ) => void;
  getResponse: () => string;
  reset: () => void;
};