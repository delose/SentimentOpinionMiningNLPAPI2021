export interface SentimentJson {
    success: boolean;
    data: Data;
  }
  
  interface Data {
    content: string;
    language: string;
    version: string;
    knowledge: Knowledge[];
    sentiment: Sentiment;
  }
  
  interface Sentiment {
    overall: number;
    negativity: number;
    positivity: number;
    items: Item2[];
  }
  
  interface Item2 {
    lemma: string;
    syncon: number;
    sentiment: number;
    items: Item[];
  }
  
  interface Item {
    lemma: string;
    syncon: number;
    sentiment: number;
  }
  
  interface Knowledge {
    syncon: number;
    label: string;
    properties?: Property[];
  }
  
  interface Property {
    type: string;
    value: string;
  }