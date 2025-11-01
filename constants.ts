import { Article, Interview } from './types';

export const newsCategories: string[] = [
  'Technology',
  'World News',
  'Finance',
  'Sports',
  'Entertainment',
  'Health',
  'Science',
  'Opinion',
  'Lifestyle',
  'Culture',
  'Environment',
];

const placeholderContent = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
<br/>
<p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
<br/>
<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p>
`;

export const featuredArticle: Article = {
  id: 1,
  category: 'Blockchain News',
  timestamp: '4 hours ago',
  title: 'Top Analyst Unveils Ethereum Catalyst That Could Trigger Nearly 50% Surge for ETH – Here’s His Outlook',
  description: 'A leading market analyst points to a key upcoming development for Ethereum that could significantly impact its price, providing a detailed outlook for investors.',
  tags: ['#Ethereum', '#Analytics'],
  imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  authorName: 'John Doe',
  authorAvatarUrl: 'https://i.pravatar.cc/150?u=johndoe',
  content: placeholderContent,
};

export const bottomArticles: Article[] = [
  {
    id: 2,
    category: 'Blockchain News',
    timestamp: '4 hours ago',
    title: 'Top Analyst Unveils Ethereum Catalyst That Could Trigger Nearly 50% Surge for ETH',
    description: 'Discover the factors that could lead to a major price movement for Ethereum in the coming weeks.',
    imageUrl: 'https://images.unsplash.com/photo-1642052551937-33cc94a80e40?q=80&w=2842&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    authorName: 'Jane Smith',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=janesmith',
    content: placeholderContent,
  },
  {
    id: 3,
    category: 'Market Trends',
    timestamp: '5 hours ago',
    title: 'Over 65% of Crypto-Related Tweets and 84% of Conversations on Reddit Were Positive',
    description: 'A new report analyzes social media sentiment, revealing a surprisingly bullish outlook from the community.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e50?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    authorName: 'Crypto Casey',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=casey',
    content: placeholderContent,
  },
  {
    id: 4,
    category: 'Price Analysis',
    timestamp: '6 hours ago',
    title: 'STX Price Prediction: After 126% Price Jump in December, What\'s in Store for 2024?',
    description: 'Following a massive rally, experts weigh in on whether STX can maintain its momentum in the new year.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681434-5d985a803f88?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    authorName: 'Alex Johnson',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=alexj',
    content: placeholderContent,
  },
];

export const recommendedArticles: Article[] = [
  {
    id: 5,
    category: 'Regulation',
    timestamp: '7 hours ago',
    title: 'US-Approved Spot Bitcoin ETFs Could Surpass Entire $50 Billion Crypto ETP Market: BitMEX',
    description: 'A BitMEX report predicts that new Bitcoin ETFs will attract massive capital inflows, reshaping the investment landscape.',
    imageUrl: 'https://picsum.photos/seed/man/400/300',
    authorName: 'Sarah Lee',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=sarahlee',
    content: placeholderContent,
  },
  {
    id: 6,
    category: 'Community',
    timestamp: '8 hours ago',
    title: 'Over 65% of Crypto-Related Tweets and 84% of Conversations on Reddit Were Positive in 2023',
    description: 'Despite market volatility, community engagement and optimism remained high throughout the year.',
    imageUrl: 'https://picsum.photos/seed/vr/400/300',
    authorName: 'Reddit Insights',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=reddit',
    content: placeholderContent,
  },
  {
    id: 7,
    category: 'Altcoins',
    timestamp: '9 hours ago',
    title: 'STX Price Prediction: After 126% Price Jump in December, What\'s in Store for 2024?',
    description: 'Can the popular altcoin continue its impressive run? We look at the technicals and fundamentals.',
    imageUrl: 'https://picsum.photos/seed/solana/400/300',
    authorName: 'Market Watcher',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=market',
    content: placeholderContent,
  },
  {
    id: 8,
    category: 'Finance',
    timestamp: '10 hours ago',
    title: 'US-Approved Spot Bitcoin ETFs Could Surpass Entire $50 Billion Crypto ETP Market: BitMEX',
    description: 'The approval of spot Bitcoin ETFs is a watershed moment for institutional adoption of crypto assets.',
    imageUrl: 'https://picsum.photos/seed/presentation/400/300',
    authorName: 'BitMEX Research',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=bitmex',
    content: placeholderContent,
  },
    {
    id: 9,
    category: 'Legal',
    timestamp: '11 hours ago',
    title: 'Former FTX CEO Sam Bankman-Fried and Debtors Reach Settlement in Embed Proceeding',
    description: 'A key legal hurdle is cleared in the ongoing FTX bankruptcy case, bringing more clarity to the proceedings.',
    imageUrl: 'https://picsum.photos/seed/etfs/400/300',
    authorName: 'Legal Eagle',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=legal',
    content: placeholderContent,
  },
];

export const allArticles: Article[] = [
  featuredArticle,
  ...bottomArticles,
  ...recommendedArticles
];

export const liveInterviews: Interview[] = [
  {
    id: 1,
    guestName: 'Vitalik Buterin',
    guestTitle: 'Co-founder of Ethereum',
    topic: 'The Future of Decentralization',
    status: 'Live',
    datetime: 'Now Live',
    guestImageUrl: 'https://i.pravatar.cc/150?u=vitalik',
    watchLink: '#',
  },
  {
    id: 2,
    guestName: 'Cathie Wood',
    guestTitle: 'CEO of ARK Invest',
    topic: 'Disruptive Innovation & Crypto',
    status: 'Upcoming',
    datetime: 'Today at 8:00 PM',
    guestImageUrl: 'https://i.pravatar.cc/150?u=cathie',
    watchLink: '#',
  },
  {
    id: 3,
    guestName: 'Michael Saylor',
    guestTitle: 'CEO of MicroStrategy',
    topic: 'Bitcoin as a Treasury Asset',
    status: 'Past',
    datetime: 'Yesterday',
    guestImageUrl: 'https://i.pravatar.cc/150?u=saylor',
    watchLink: '#',
  },
    {
    id: 4,
    guestName: 'Changpeng Zhao',
    guestTitle: 'CEO of Binance',
    topic: 'Global Crypto Adoption',
    status: 'Past',
    datetime: 'June 15, 2024',
    guestImageUrl: 'https://i.pravatar.cc/150?u=cz',
    watchLink: '#',
  },
];
