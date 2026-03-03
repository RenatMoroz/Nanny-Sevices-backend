import { HydratedDocument, InferSchemaType, model, Schema } from 'mongoose';

const ReviewSchema = new Schema(
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
  },
  {
    _id: false,
  },
);

const NannySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    avatar_url: {
      type: String,
    },

    birthday: {
      type: Date,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    reviews: {
      type: [ReviewSchema],
      default: [],
    },

    education: {
      type: String,
      required: true,
    },
    kids_age: {
      type: String,
      required: true,
    },

    price_per_hour: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      default: '',
      required: true,
    },

    characters: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type Nanny = InferSchemaType<typeof NannySchema>;
export type NannyDocument = HydratedDocument<Nanny>;

export const NannyCollection = model<Nanny>('Nanny', NannySchema, 'nannys');
