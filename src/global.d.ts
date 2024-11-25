export {};

declare global {
  interface Window {
    logger: {
      loggly: {
        push: (log: string | Record<string, any>) => void;
      };
    };
  }
}
