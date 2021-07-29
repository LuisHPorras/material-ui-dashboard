import { gql } from "@apollo/client";

export const ALL_BADGES = gql`
  query GetAllBadges {
    allBadges {
      id
      issuerName
      recipientName
      area 
      issueDate
    }
  }
`;

export const ISSUE_BADGE = gql`
  mutation IssueBadge($data: BadgeCreateInput!){
    addBadge(data: $data){
      id
      issuerName
      recipientName
      area 
      issueDate
    }
  }
`;