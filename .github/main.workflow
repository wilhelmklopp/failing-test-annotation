workflow "Run jest" {
  on = "push"
  resolves = ["./.github/actions/jest"]
}

action "./actions/jest" {
  uses = "./actions/jest"
  secrets = ["GITHUB_TOKEN"]
}
