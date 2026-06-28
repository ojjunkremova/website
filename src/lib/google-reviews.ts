import { cache } from "react";

import googleReviewCache from "./google-reviews-cache.json";

export type GoogleReview = {
  name: string;
  date: string;
  text: string;
  shareUrl: string;
  contributorUrl: string;
  rating: number;
};

type GoogleReviewCacheItem = {
  url: string;
  name: string;
  date: string;
  text: string;
  contribUrl: string;
};

const googleReviews = (googleReviewCache as GoogleReviewCacheItem[]).map((review) => ({
  name: review.name,
  date: review.date,
  text: review.text,
  shareUrl: review.url,
  contributorUrl: review.contribUrl,
  rating: 5
}));

export const loadGoogleReviews = cache(async () => googleReviews);

