// Interface for individual image format (small, medium, large, thumbnail)
interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;        // size in KB
    width: number;
    height: number;
    sizeInBytes?: number; // optional field if present in some formats
  }
  
  // Interface for the attributes of the image
  interface ImageAttributes {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
      thumbnail?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;         // size in KB
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
  // Interface for the data object containing the image attributes
  export interface StrapiImageData {
    id: number;
    attributes: ImageAttributes;
  }
  
  // Main interface for the image object
  export interface StrapiImage {
    data: ImageData;
  }
