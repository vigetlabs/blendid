Download this repo and install all packages via `yarn install`.

## Making Changes

Make changes to the directories you need to, which should only be in these directories:
```
.
├──/ extras
├──/ gulfile.js
└──/ src // possibly
```

### Running tasks

Instead of running the typical `yarn run blendid` command to test changes in Blendid, run `./bin/blendid.js`, which will run a local instance of the package instead of through `/node_modules`. The task is [located here](https://github.com/vigetlabs/blendid/blob/master/bin/blendid.js). This will allow you to make your changes to Blendid tasks and use them immediately.

If you need to add tasks or flags to your blendid command, run it the typical way, like `./bin/blendid.js -- init` or `./bin/blendid.js build`

### Committing Changes

When making changes this way, be sure to only commit the pre-init/pre-watched files. You should most likely only be making commitable changes to `/extras`, `/gulpfile.js` and possibly `/src`. As a reminder, Blendid will create a `/config` directory when you run the init command. Do not commit this directory. At some point, this directory should be added to `.gitignore` to ensure no one accidentally commits it.

## Publishing Releases

### Via GitHub
Once your changes have been reviewed and are pushed to master, head to the [releases tab](https://github.com/vigetlabs/blendid/releases) and [draft a new release](https://github.com/vigetlabs/blendid/releases/new]. Follow the (SEMVER standard)[https://semver.org/) for incrementing releases. Be sure to give a detailed description of what the release offers. Finally, publish the release.

### Via NPM
Once you have published a release on GitHub, use your npm Blendid collaborators account and follow the [npm publishing instructions](https://docs.npmjs.com/getting-started/publishing-npm-packages). Ensure that the version you are releasing matches the version you created on GitHub.
