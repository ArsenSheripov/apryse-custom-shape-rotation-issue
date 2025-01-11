// import { createApi } from '@reduxjs/toolkit/query/react';
// import { API_URL } from 'shared/constants/api-url';
// import { HttpMethods } from 'shared/constants/common';
// import { handleAsyncError } from 'shared/helpers/handle-async-error';
// import { replaceUrlParams } from 'shared/helpers/replace-url-params';
// import { baseQueryWithReauth } from 'shared/libs/redux';
// import {
//   CreateSignaturesData,
//   CreateSignaturesRequestDto,
//   DocumentBookmarksResponseDto,
// } from 'shared/types/api/generated';

// import { mapBookmarks } from '../helpers/map-bookmarks';
// import { viewerActions } from '../slice';
// import {
//   GetDocumentBookmarksRequest,
//   GetGuestDocumentBookmarksRequest,
//   PutDocumentBookmarksRequest,
//   PutGuestDocumentBookmarksRequest,
// } from '../types';

// export const viewerApi = createApi({
//   reducerPath: 'viewerApi',
//   baseQuery: baseQueryWithReauth,
//   endpoints: builder => ({
//     getDocumentBookmarks: builder.query<DocumentBookmarksResponseDto, GetDocumentBookmarksRequest>({
//       query: body => ({
//         url: replaceUrlParams(API_URL.documentBookmarks, {
//           workspaceId: body.workspaceId,
//           documentId: body.documentId,
//         }),
//         method: HttpMethods.get,
//       }),
//       transformResponse: (response: DocumentBookmarksResponseDto) => mapBookmarks(response),
//       onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
//         try {
//           const data = await queryFulfilled;

//           dispatch(viewerActions.setBookmarks(data.data.bookmarks as { [key: string]: string }));
//         } catch (e) {
//           handleAsyncError(e);
//         }
//       },
//     }),

//     updateDocumentBookmarks: builder.mutation<DocumentBookmarksResponseDto, PutDocumentBookmarksRequest>({
//       query: body => ({
//         url: replaceUrlParams(API_URL.documentBookmarks, {
//           workspaceId: body.workspaceId,
//           documentId: body.documentId,
//         }),
//         method: HttpMethods.put,
//         body: body.bookmarks,
//         headers: { 'Content-Type': 'application/json' },
//       }),
//       transformResponse: (response: DocumentBookmarksResponseDto) => mapBookmarks(response),
//       onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
//         try {
//           const data = await queryFulfilled;

//           dispatch(viewerActions.setBookmarks(data.data.bookmarks as { [key: string]: string }));
//         } catch (e) {
//           handleAsyncError(e);
//         }
//       },
//     }),

//     getGuestDocumentBookmarks: builder.query<DocumentBookmarksResponseDto, GetGuestDocumentBookmarksRequest>({
//       query: body => ({
//         url: replaceUrlParams(API_URL.guestDocumentBookmarks, {
//           documentId: body.documentId,
//         }),
//         method: HttpMethods.get,
//       }),
//       transformResponse: (response: DocumentBookmarksResponseDto) => mapBookmarks(response),
//       onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
//         try {
//           const data = await queryFulfilled;

//           dispatch(viewerActions.setBookmarks(data.data.bookmarks as { [key: string]: string }));
//         } catch (e) {
//           handleAsyncError(e);
//         }
//       },
//     }),

//     updateGuestDocumentBookmarks: builder.mutation<DocumentBookmarksResponseDto, PutGuestDocumentBookmarksRequest>({
//       query: body => ({
//         url: replaceUrlParams(API_URL.guestDocumentBookmarks, {
//           documentId: body.documentId,
//         }),
//         method: HttpMethods.put,
//         body: body.bookmarks,
//         headers: { 'Content-Type': 'application/json' },
//       }),
//       transformResponse: (response: DocumentBookmarksResponseDto) => mapBookmarks(response),
//       onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
//         try {
//           const data = await queryFulfilled;

//           dispatch(viewerActions.setBookmarks(data.data.bookmarks as { [key: string]: string }));
//         } catch (e) {
//           handleAsyncError(e);
//         }
//       },
//     }),

//     createSignatures: builder.mutation<CreateSignaturesData, CreateSignaturesRequestDto>({
//       query: body => ({
//         url: API_URL.createSignatures,
//         method: HttpMethods.post,
//         body,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetDocumentBookmarksQuery,
//   useGetGuestDocumentBookmarksQuery,
//   useUpdateDocumentBookmarksMutation,
//   useUpdateGuestDocumentBookmarksMutation,
//   useCreateSignaturesMutation,
// } = viewerApi;
