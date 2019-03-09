const request = require('./request')

const { GITHUB_SHA, GITHUB_EVENT_PATH, GITHUB_TOKEN, GITHUB_WORKSPACE } = process.env

const event = require(GITHUB_EVENT_PATH)
const { repository } = event
const {
  owner: { login: owner }
} = repository
const { name: repo } = repository

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/vnd.github.antiope-preview+json',
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  'User-Agent': 'jest-action'
}


function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// function generateAnnotations(testResults) {
//   return testResults.map((result) => {
//     return {
//       path: result.testFilePath,
//       start_line:
//       end_line:
//       annotation_level
//       message:
//       raw_details:

//     }
//   })
// }

function getLineAndColumn(testFilePath, testResults) {
  const failureMessages = testResults.testResults[0].failureMessages.join(' ')
  const pattern = new RegExp(`${escapeRegExp(testFilePath)}:\\w+:\\w+`)
  const match = pattern.exec(failureMessages)
  const substring = match[0]
  const [line, column] = substring.replace(`${testFilePath}:`, '').split(":")

  return {
    line,
    column,
  }
}


class ActionsReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  // Create
  // onRunComplete update check run and include annotatons
  // onRUnComplete create a check run and annotations


  // location matching is gonna suck


  async onRunComplete(contexts, results) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/")

    let conclusion
    if (results.numFailedTests == 0) {
      conclusion = "success"
    } else {
      conclusion = "failure"
    }


    try {
      const { data } = await request(`https://api.github.com/repos/${owner}/${repo}/check-runs`, {
        method: 'POST',
        headers,
        body: {
          name: "jest",
          head_sha: GITHUB_SHA,
          status: "completed",
          conclusion,
          completed_at: new Date().toISOString(),
          output: {
            title: "All is well!",
            summary: "There is not much to summarize",
          }
        }
      })
    } catch (err) {
      console.log(err)
      console.log(err.data)
    }

    console.log(data)
    // each test suites: results.testResults
    // each test: results.testResults[0].testResults

    const filePath = results.testResults[0].testFilePath
    console.log(getLineAndColumn(filePath, results.testResults[0]))
  }
}

module.exports = ActionsReporter;