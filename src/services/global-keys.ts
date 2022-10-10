
export const global = {
  user_storage_key: "una-compras",
  location_storage_key: "una-compas-localidade",
  base_url: `${ process.env.NODE_ENV == 'production' ? process.env.API_URL : process.env.DEV_API_URL}`,
  google_api_key: process.env.GOOGLE_API_KEY
}