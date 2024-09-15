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

type PaginationOptions = {
  makingPaginatedRequest: boolean;
  paginatedQueryParams: { page: number; pageSize: number };
};

export async function fetchEndpointData(
  requestedEndpoint: string,
  populateFields: string[] = ["*"],
  paginationOptions?: PaginationOptions
) {
  const endpoint = `${process.env.NEXT_ADMIN_STRAPI_URL}${requestedEndpoint}`;
  let headers = {
    Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
    "Proxy-Authorization": "",
    "Content-Type": "application/json",
  };
  if (process.env["ENV"] !== "dev" || !endpoint.includes("localhost")) {
    let jwt = await signJwt(endpoint);
    headers["Proxy-Authorization"] = `Bearer ${jwt}`;
  }

  function buildUrl(endpoint: string, paginationOptions?: PaginationOptions) {
    const baseUrl: string = `${endpoint}?populate=${populateFields.join(",")}`;
    if (paginationOptions?.makingPaginatedRequest) {
      return `${baseUrl}&page=${paginationOptions.paginatedQueryParams.page}&pageSize=${paginationOptions.paginatedQueryParams.pageSize}`;
    } else {
      return baseUrl;
    }
  }
  const url = buildUrl(endpoint, paginationOptions);

  const fetchRequest = await fetch(url, { method: "GET", headers });
  const resultJSON = await fetchRequest.json();
  return resultJSON;
}
