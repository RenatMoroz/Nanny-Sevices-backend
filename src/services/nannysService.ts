import { FilterQuery } from 'mongoose';
import { Nanny, NannyCollection } from '../database/models/nannys.js';
import { GetAllNannysParams } from '../types/nannys.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllNannys = async (filters: GetAllNannysParams) => {
  const { page = 1, perPage = 10 } = filters;
  const offset = (page - 1) * perPage;
  const query: FilterQuery<Nanny> = {};
  let sortBy: GetAllNannysParams['sortBy'] = filters.sortBy;
  let sortOrder: GetAllNannysParams['sortOrder'] = filters.sortOrder;

  if (filters.location) {
    query.location = new RegExp(filters.location, 'i');
  }

  if (filters.characters) {
    const values = filters.characters
      .split(',')
      .map(value => value.trim())
      .filter(Boolean);
    query.characters = { $in: values.length ? values : [filters.characters] };
  }

  if (filters.price_per_hour) {
    query.price_per_hour = { $lte: filters.price_per_hour };
  }

  if (filters.preset) {
    switch (filters.preset) {
      case 'a-z':
        sortBy = 'name';
        sortOrder = 'asc';
        break;
      case 'z-a':
        sortBy = 'name';
        sortOrder = 'desc';
        break;
      case 'less-than-10':
        query.price_per_hour = { $lt: 10 };
        break;
      case 'greater-than-10':
        query.price_per_hour = { $gt: 10 };
        break;
      case 'popular':
        sortBy = 'rating';
        sortOrder = 'desc';
        break;
      case 'not-popular':
        sortBy = 'rating';
        sortOrder = 'asc';
        break;
      case 'show-all':
        break;
      default:
        break;
    }
  }

  try {
    const totalNannys = await NannyCollection.countDocuments(query);
    const nannysList = await NannyCollection.find(query)
      .sort(sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : { createdAt: -1 })
      .skip(offset)
      .limit(perPage);

    const paginationInfo = calculatePaginationData(totalNannys, page, perPage);

    return {
      ...paginationInfo,
      nannys: nannysList,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error('Error fetching nannys: ' + message);
  }
};

export const createNanny = async (body: Nanny) => {
  const result = NannyCollection.create(body);
  return result;
};

export const getNannyById = async (nannyId: string) => {
  try {
    return await NannyCollection.findById(nannyId);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error('Error fetching nanny: ' + message);
  }
};

export const updateNannyById = async (
  nannyId: string,
  data: Partial<Nanny>,
) => {
  try {
    return await NannyCollection.findByIdAndUpdate(nannyId, data, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error('Error updating nanny: ' + message);
  }
};

export const deleteNannyById = async (nannyId: string) => {
  try {
    return await NannyCollection.findByIdAndDelete(nannyId);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error('Error deleting nanny: ' + message);
  }
};
