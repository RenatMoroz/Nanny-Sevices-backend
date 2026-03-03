import { RequestHandler } from 'express';
import * as services from '../services/nannysService.js';
import { GetAllNannysParams } from '../types/nannys.js';
import { Nanny } from '../database/models/nannys.js';
import createHttpError from 'http-errors';

export const getAllNannys: RequestHandler = async (req, res, next) => {
  try {
    const toNumber = (value?: string) => {
      if (!value) return undefined;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    };

    const toSortBy = (value?: string): GetAllNannysParams['sortBy'] => {
      if (value === 'name' || value === 'price_per_hour' || value === 'rating') {
        return value;
      }
      return undefined;
    };

    const toSortOrder = (value?: string): GetAllNannysParams['sortOrder'] => {
      if (value === 'asc' || value === 'desc') {
        return value;
      }
      return undefined;
    };

    const toPreset = (value?: string): GetAllNannysParams['preset'] => {
      if (
        value === 'a-z' ||
        value === 'z-a' ||
        value === 'less-than-10' ||
        value === 'greater-than-10' ||
        value === 'popular' ||
        value === 'not-popular' ||
        value === 'show-all'
      ) {
        return value;
      }
      return undefined;
    };

    const {
      page,
      perPage,
      price_per_hour,
      location,
      characters,
      sortBy,
      sortOrder,
      preset,
    } =
      req.query as Record<string, string | undefined>;

    const filters: GetAllNannysParams = {
      page: toNumber(page),
      perPage: toNumber(perPage),
      price_per_hour: toNumber(price_per_hour),
      location,
      characters,
      sortBy: toSortBy(sortBy),
      sortOrder: toSortOrder(sortOrder),
      preset: toPreset(preset),
    };

    const result = await services.getAllNannys(filters);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const createNanny: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body as Nanny;
    const result = await services.createNanny(body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const getNannyById: RequestHandler = async (req, res, next) => {
  try {
    const nannyId = req.params.nannyId;
    const result = await services.getNannyById(nannyId);
    if (!result) {
      return next(createHttpError(404, 'Nanny not found'));
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateNannyById: RequestHandler = async (req, res, next) => {
  try {
    const nannyId = req.params.nannyId;
    const result = await services.updateNannyById(nannyId, req.body);
    if (!result) {
      return next(createHttpError(404, 'Nanny not found'));
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteNannyById: RequestHandler = async (req, res, next) => {
  try {
    const nannyId = req.params.nannyId;
    const result = await services.deleteNannyById(nannyId);
    if (!result) {
      return next(createHttpError(404, 'Nanny not found'));
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
