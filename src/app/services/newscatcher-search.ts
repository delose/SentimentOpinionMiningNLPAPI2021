export interface NewscatcherSearch {
    status: string;
    total_hits: number;
    page: number;
    total_pages: number;
    page_size: number;
    articles: Article[];
    user_input: Userinput;
  }
  
  interface Userinput {
    q: string;
    search_in: string;
    lang?: any;
    country?: any;
    from: string;
    to?: any;
    ranked_only: string;
    from_rank?: any;
    to_rank?: any;
    sort_by: string;
    page: number;
    size: number;
    sources?: any;
    not_sources?: any;
    topic?: any;
    media: string;
  }
  
  export interface Article {
    summary: string;
    country: string;
    author?: string;
    link: string;
    language: string;
    media?: string;
    title: string;
    media_content?: string;
    clean_url: string;
    rights: string;
    rank: string;
    topic: string;
    published_date: string;
    _id: string;
    _score: number;
  }