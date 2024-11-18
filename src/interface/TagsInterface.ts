import { UUID } from 'crypto';

export interface TagsCard {
  id: UUID;
  name: string;
  postCount: number;
}
