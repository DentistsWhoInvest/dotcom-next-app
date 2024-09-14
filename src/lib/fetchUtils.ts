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
export async function fetchEndpointData(requestedEndpoint: string, populateFields: string[] = ["*"]) {
  const endpoint = `${process.env.NEXT_ADMIN_STRAPI_URL}${requestedEndpoint}`;
  let headers = {
    Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
    "Proxy-Authorization": "",
    "Content-Type": "application/json",
  };
  if (process.env["ENV"] === "dev") {
    let jwt = await signJwt(endpoint);
    headers["Proxy-Authorization"] = `Bearer ${jwt}`;
  }
  const url: string = `${endpoint}?populate=${populateFields.join(",")}`;
  const fetchRequest = await fetch(url, { method: "GET", headers });
  const resultJSON = await fetchRequest.json();
  return resultJSON;
}
