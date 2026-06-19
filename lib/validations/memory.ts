import { z } from 'zod';

export const MemoryPostSchema = z.object({
  meetup_id: z.number().int().describe('ID of the meetup'),
  
  caption: z.string().describe('Caption for the memory post'),
  
  photo_urls: z.array(z.string().url()).describe('Array of photo URLs'),
  
  tags: z.array(z.number().int()).describe('Array of user IDs to tag'),
  
  is_public: z.boolean().describe('Whether the memory is public or private'),
});

export type MemoryPost = z.infer<typeof MemoryPostSchema>;