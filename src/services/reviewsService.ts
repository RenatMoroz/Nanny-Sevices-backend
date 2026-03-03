import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import { Reviews, ReviewsCollection } from '../database/models/reviews.js';
import { NannyCollection } from '../database/models/nannys.js';

type CreateReviewInput = Omit<Reviews, 'nannyId'> & { nannyId?: string };

export const getAllReviews = async () => {
  return await ReviewsCollection.find();
};

export const getReviewsByNannyId = async (nannyId: string) => {
  return await ReviewsCollection.find({ nannyId });
};

export const getReviewById = async (reviewId: string) => {
  return await ReviewsCollection.findById(reviewId);
};

export const createReviewsForNanny = async (
  nannyId: string,
  payload: CreateReviewInput | CreateReviewInput[],
) => {
  if (!Types.ObjectId.isValid(nannyId)) {
    throw createHttpError(400, 'Invalid nanny id');
  }

  const nanny = await NannyCollection.findById(nannyId);
  if (!nanny) {
    throw createHttpError(404, 'Nanny not found');
  }

  if (Array.isArray(payload)) {
    const normalizedPayload = payload.map(review => ({
      ...review,
      nannyId,
    }));

    return await ReviewsCollection.insertMany(normalizedPayload);
  }

  return await ReviewsCollection.create({
    ...payload,
    nannyId,
  });
};

export const updateReviewById = async (
  reviewId: string,
  data: Partial<Reviews>,
) => {
  return await ReviewsCollection.findByIdAndUpdate(reviewId, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteReviewById = async (reviewId: string) => {
  return await ReviewsCollection.findByIdAndDelete(reviewId);
};
