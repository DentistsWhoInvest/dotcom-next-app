import {GoogleAuth} from 'google-auth-library';
import { IAMCredentialsClient } from "@google-cloud/iam-credentials";

let serviceAccountEmail: string = "build-service@electric-node-426223-s2.iam.gserviceaccount.com";

/**
 * Generates JWT payload for service account.
 *
 * @param {string} url - The URL of the IAP secured resource.
 * @returns {object} - The JWT payload.
 */
async function generateJwtPayload(url: string) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600; // 1 hour expiration time

  return {
    iss: serviceAccountEmail,
    sub: serviceAccountEmail,
    email: serviceAccountEmail,
    aud: url,
    iat: iat,
    exp: exp,
  };
}

/**
 * Signs JWT payload using ADC and IAM credentials API.
 *
 * @param {string} resourceUrl - Audience of the JWT, and scope of the JWT token.
 * @returns {Promise<string>} - A signed JWT that can be used to access IAP protected apps.
 */
export async function signJwt(url: string) {
  const iamClient = new IAMCredentialsClient();
  const payload = await generateJwtPayload(url);
  const targetSa = serviceAccountEmail;
  const [response] = await iamClient.signJwt({
    name: `projects/-/serviceAccounts/${targetSa}`,
    payload: JSON.stringify(payload),
  });
  let jwt = response.signedJwt?.trim();
  if (jwt) {return jwt}
  else {return "error"};
}
