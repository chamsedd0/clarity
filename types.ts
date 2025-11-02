export interface Article {
  id: number;
  category: string;
  timestamp: string;
  title: string;
  description: string;
  tags?: string[];
  imageUrl: string;
  authorName: string;
  authorAvatarUrl: string;
  content: string;
}

export interface Interview {
  id: number;
  guestName: string;
  guestTitle: string;
  topic: string;
  status: 'Live' | 'Upcoming' | 'Past';
  datetime: string;
  guestImageUrl: string;
  watchLink: string;
}

export interface Comment {
  id: string;
  articleId: number;
  author: string;
  text: string;
  timestamp: string;
}

export interface Podcast {
  id: number;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  listenLink: string;
}