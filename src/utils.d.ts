import { Deal, Comment } from "./types";

declare module "utils" {
  export function sortByNewest(
    deals: Deal[],
    setDeals: (deals: Deal[]) => void
  ): void;

  export function sortByComments(
    deals: Deal[],
    setDeals: (deals: Deal[]) => void
  ): void;

  export function sortCommentsByNewest(
    comments: Comment[],
    setComments: (comments: Comment[]) => void
  ): void;

  export function sortCommentsByLikes(
    comments: Comment[],
    setComments: (comments: Comment[]) => void
  ): void;
}
