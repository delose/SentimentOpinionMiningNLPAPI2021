export interface OauthToken {
    headers?: Headers;
    status?: number;
    statusText?: string;
    url?: string;
    ok?: boolean;
    name?: string;
    message?: string;
    error?: Error;
  }
  
  interface Error {
    error?: NormalizedNames;
    text?: string;
  }
  
  interface Headers {
    normalizedNames?: NormalizedNames;
    lazyUpdate?: any;
  }
  
  interface NormalizedNames {
  }