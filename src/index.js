import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { fetchIssue } from './lib/github.js'
import { mdToAdf } from './lib/convert.js'

yargs(hideBin(process.argv))
  .command('fetch <owner> <repo> <issue_number>', 'say hello', () => {}, (argv) => {
    const getResult = async () => {
      const result = await fetchIssue(argv.owner, argv.repo, argv.issue_number);
      console.dir(result, { depth: null })

      console.dir(mdToAdf(result.data.repository.issue.body), { depth: null })
    }

    getResult();
  })
  .parse();
