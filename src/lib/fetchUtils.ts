import { signJwt } from "./signJwt";

/**
 * TODO: figure out something about the return type... specify in each page? 
 * @param requestedEndpoint 
 * @returns 
 * Can be used in getStaticProps: 
 * export const getStaticProps = async () => {
 *   const pageData = await fetchEndpointData('/about');
 *   return {
 *       props: {
 *           pageData: pageData,
 *       },
 *   };
 *   };
 */
export async function fetchEndpointData(requestedEndpoint: string) {
  const endpoint = `${process.env.NEXT_ADMIN_STRAPI_URL}${requestedEndpoint}`;
  let jwt = await signJwt(endpoint);
  const headers = {
    Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
    "Proxy-Authorization": `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };
  const url: string = `${endpoint}?populate=*`;
  const fetchRequest = await fetch(url, { method: "GET", headers });
  const resultJSON = await fetchRequest.json();
  return resultJSON;
}
