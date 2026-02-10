export interface Video {
  id: string;
  title: string;
  description: string;
  publicId: string;
  originalSize: number;
  compressedSize: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;

  // UI-only / API-provided fields
  userId?: string | null;
  url?: string | null;
}
