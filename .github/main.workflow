workflow "Run jest" {
  on = "push"
  resolves = ["Jest"]
}

action Jest" {
  uses = "./.github/actions/jest"
  secrets = ["GITHUB_TOKEN"]
}
