import { urls, gitName, gitRepo } from '../constants'

export default class GithubApi {
  getCommits() {
    return fetch(
      `${urls.GITHUB_API}/repos/${gitName}/${gitRepo}/commits`
    ).then((res) => res.json())
  }
}
