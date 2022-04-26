import type { Timestamp } from '@firebase/firestore-types';
import React from 'react';

export type FirebaseId = {
  id: string;
};

// collection `flats`
export type Flat = FirebaseId & {
  address: string;
  latitude: number;
  longitude: number;
  cityName: string;
  description?: string;
  dailyPriceUsd: number;
  photoUrl: string;
  publishedAt: Timestamp;
};

export type FlatCardProps = {
  id: string;
  address?: string;
  cityName?: string;
  description?: string;
  dailyPriceUsd?: number;
  photoUrl?: string;
  setActiveCard: React.Dispatch<React.SetStateAction<string>>;
  activeCard: string;
};
