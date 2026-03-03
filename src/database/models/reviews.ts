import { HydratedDocument, InferSchemaType, model, Schema } from 'mongoose';

const reviewsSchema = new Schema(
  {
    reviewer: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    nannyId: {
      type: Schema.Types.ObjectId,
      ref: 'Nanny',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type Reviews = InferSchemaType<typeof reviewsSchema>;
export type ReviewsDocument = HydratedDocument<Reviews>;

export const ReviewsCollection = model<Reviews>('reviews', reviewsSchema);
