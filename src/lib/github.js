import { Client, cacheExchange, fetchExchange, gql } from '@urql/core';

const getToken = () => {
  return process.env.GITHUB_PAT
}

const client = new Client({
  url: 'https://api.github.com/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: `token ${token}` }
    }
  }
})

const IssueFragment = gql`
  fragment IssueFragment on Issue {
    title
    body
  }
`

const issueQuery = gql`
  query IssueQuery($owner: String!, $repo: String!, $issueNumber: Int!) {
    repository(owner: $owner, name: $repo) {
      issue(number: $issueNumber) {
        ...IssueFragment
      }
    }
  }
  ${IssueFragment}
`

export const fetchIssue = async (owner, repo, issueNumber) => {
  const result = await client.query(issueQuery, { owner, repo, issueNumber })
  return result;
}
