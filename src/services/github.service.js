import GitHub from 'github-api'

export const github = token => {
  // initialize a GitHub API object with the auth token
  const gh = new GitHub({ token })

  // get a User object
  const user = gh.getUser()

  /**
   * Sorting function for nodes in a GitHub tree. Sorts
   * alphabetically (case-insensitive) by the filename stored
   * in the node.path property.
   *
   * @param {Node} n1 The first node in the comparison
   * @param {Node} n2 The second node in the comparison
   */
  const nSort = (n1, n2) => n1.path.toLowerCase() > n2.path.toLowerCase() ? 1 : -1

  // return our API object
  return {
    user,
    repo: null,
    repos: ({ options = {} }) => user.listRepos(options),
    branch: function ({ user, repo, branch = 'master' }) {
      this.repo = gh.getRepo(user, repo)
      return this.repo.getBranch(branch)
    },
    getTree: async function ({ branch = 'master' }) {
      // get a reference to the repo
      const r = this.repo
      // get the requested branch
      const b = await r.getBranch(branch)
      // get the root SHA value for the branch
      const sha = b.data.commit.sha
      // construct the tree and assign it to the 'data' property
      return { data: await this.tree({ repo: r, sha }) }
    },
    /**
     * Recursively constructs a file tree structure. Sorts nodes into
     * files and folders and then sorts by file/folder name.
     * see: https://stackoverflow.com/a/9007409 for helpful
     * info on how to write recursive functions within objects
     *
     * @param   {Object}  params      An object containing named parameters
     * @param   {Repo}    params.repo A Repo object as defined by the github-api package
     * @param   {String}  params.sha  The SHA hash associated with a tree or subtree on GitHub
     * @param   {String}  params.base The base path for this level of the tree
     * @returns {Promise}             Promise that resolves to the subtree array of files
     */
    tree: async function t ({ repo, sha, base = '' }) {
      // get the nodes in the current level of the tree
      let nodes = (await repo.getTree(sha)).data.tree.sort(nSort)
      // update the path, if necessary
      if (base) {
        nodes = nodes.map(n => ({ ...n, path: base + n.path }))
      }
      // separate the nodes into sorted lists of files and folders
      // props: https://stackoverflow.com/a/47225591
      const [dirs, files] = nodes.reduce(
        ([d, f], n) => n.type === 'tree'
        ? [[...d, n], f]
        : [d, [...f, n]],
        [[], []]
      )
      // map the items in the tree to items usable by v-treeview (Vuetify)
      return Promise.all([
        ...dirs.map(async d => ({ ...d, children: await t({ repo, sha: d.sha, base: d.path + '/' }) })),
        ...files
      ])
    },
    getContents: async function ({ branch = 'master', path, raw = false }) {
      return this.repo.getContents(branch, path, raw)
    }
  }
}
