import * as yup from 'yup';

export const generateItunesResultsSchema = <Schema extends yup.AnySchema<any, any, any>>(resultSchema: Schema) => yup.object({
  resultCount: yup.number().defined(),
  results: yup.array(resultSchema as Schema),
}).defined();

export const ebookSchema = yup.object({
  trackId: yup.number().defined(),
  formattedPrice: yup.string().defined(),
  trackName: yup.string().defined(),
  artworkUrl60: yup.string().defined(),
}).defined();

export type Ebook = yup.InferType<typeof ebookSchema>;

export const musicVideoSchema = yup.object({
  trackId: yup.number().defined(),
  artistName: yup.string().defined(),
  previewUrl: yup.string(),
  trackTimeMillis: yup.number(),
}).defined();

export type MusicVideo = yup.InferType<typeof musicVideoSchema>;
