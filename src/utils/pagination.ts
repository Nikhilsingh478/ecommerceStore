/** Backend uses `pageNumber` either as header or query param */
export const getPaginationHeaders = (pageNumber: number): Record<string, string> => ({
  pageNumber: String(pageNumber),
});

export const getPaginationParams = (pageNumber: number): string =>
  `pageNumber=${encodeURIComponent(pageNumber)}`;
