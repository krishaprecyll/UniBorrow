
import { Item, SafeZone, Category } from './types';

export const MOCK_USERS = {
  felix: {
    id: 'u1',
    name: 'Felix Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    rating: 4.9,
    verified: true
  },
  sarah: {
    id: 'u2',
    name: 'Sarah Miller',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 4.8,
    verified: true
  },
  james: {
    id: 'u3',
    name: 'James Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    rating: 4.5,
    verified: false
  }
};

export const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Canon EOS R5',
    description: 'High-end mirrorless camera with 45MP sensor. Includes 24-105mm lens.',
    category: Category.Photography,
    feePerDay: 25,
    rating: 4.9,
    owner: MOCK_USERS.felix,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    availability: 'available'
  },
  {
    id: '2',
    name: 'Camping Tent (4-Person)',
    description: 'Easy setup, waterproof, includes rainfly and stakes. Perfect for weekend trips.',
    category: Category.Outdoors,
    feePerDay: 15,
    rating: 4.7,
    owner: MOCK_USERS.sarah,
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
    availability: 'available'
  },
  {
    id: '3',
    name: 'Electric Scooter',
    description: 'Foldable electric scooter with 15-mile range. Helmet included.',
    category: Category.Transport,
    feePerDay: 10,
    rating: 4.5,
    owner: MOCK_USERS.james,
    imageUrl: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800',
    availability: 'available'
  },
  {
    id: '4',
    name: 'Calculus Early Transcendentals',
    description: '9th Edition textbook. Minimal highlighting. Essential for Math 101/102.',
    category: Category.Textbooks,
    feePerDay: 5,
    rating: 5.0,
    owner: MOCK_USERS.felix,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
    availability: 'available'
  },
  {
    id: '5',
    name: 'Noise Cancelling Headphones',
    description: 'Sony WH-1000XM4. Great for studying in the loud student union.',
    category: Category.Electronics,
    feePerDay: 8,
    rating: 4.8,
    owner: MOCK_USERS.sarah,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    availability: 'available'
  },
  {
    id: '6',
    name: 'Power Drill & Bits',
    description: 'Dewalt 20V Max cordless drill. Comes with battery and basic bit set.',
    category: Category.Tools,
    feePerDay: 12,
    rating: 4.6,
    owner: MOCK_USERS.james,
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
    availability: 'available'
  }
];

export const SAFE_ZONES: SafeZone[] = [
  {
    id: 'sz1',
    name: 'Central Library Lobby',
    location: 'North Entrance, Level 1',
    hours: '24/7 Access',
    securityFeatures: ['CCTV', 'Emergency Phone', 'Staffed Desk Nearby']
  },
  {
    id: 'sz2',
    name: 'Student Union Hub',
    location: 'Main Atrium, Ground Floor',
    hours: '7:00 AM - 11:00 PM',
    securityFeatures: ['High Visibility', 'Security Patrols', 'Lighting']
  },
  {
    id: 'sz3',
    name: 'Campus Police Station',
    location: 'Safe Exchange Parking Lot',
    hours: '24/7 Access',
    securityFeatures: ['Police Presence', 'Designated Signs', 'Recording']
  }
];
