import { combineReducers } from '@reduxjs/toolkit';
import { viewerReducer } from 'entities/viewer/model';

export const combinedReducer = combineReducers({
  viewer: viewerReducer,
});
