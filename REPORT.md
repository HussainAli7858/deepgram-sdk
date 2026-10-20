# Deepgram SDK Generator Assessment

- **Author:** Hussain Ali
- **Repository:** [https://github.com/HussainAli7858/deepgram-sdk](https://github.com/HussainAli7858/deepgram-sdk)
- **License:** MIT — Copyright (c) 2026 Hussain Ali

## Assessment context

I selected Deepgram's REST API for this assessment and generated TypeScript and
Python SDKs from the official OpenAPI 3.1 specification. The preserved source
document contains 50 operations, and the generated model represents all 50.
I enabled SDKGen's test feature and retained the `.sdk/` model, templates, and
build configuration so the project can be regenerated and reviewed without
reconstructing its setup manually.

I spent approximately 30 minutes of active human effort selecting the API,
reviewing generated code and test results, configuring authentication,
validating live API connectivity, and reviewing the final implementation.
Automated generation, test execution, and waiting time are excluded.

This is my confirmed estimate rather than a precisely measured duration, and
it covers this Deepgram assessment only.

## Setup experience and what I built

I selected Node.js 24 through the existing NVM installation and used Voxgig
SDKGen to generate both language targets from the preserved OpenAPI document.
SDKGen produced the TypeScript and Python clients, generated README and
reference material, and offline test support. I configured the project through
its persistent model, templates, and components rather than manually editing
generated client implementation files.

I persisted the publication metadata in `.sdk/model/project.aontu`. That
configuration identifies me as the author and publisher and sets the GitHub
repository to `HussainAli7858/deepgram-sdk`. It generates consistent
repository links and author data in the package manifests, documentation, and
security policy. The TypeScript package is
`@hussainali7858/deepgram-sdk`, and the Python distribution is
`hussainali7858-deepgram-sdk`.

I found that the upstream document declares both `https://agent.deepgram.com`
and `https://api.deepgram.com`. SDKGen derives a single default client base
and does not retain a server choice per operation. I therefore configured the
persistent build adapter to use `https://api.deepgram.com` as the standard
base; it serves account-management routes such as `GET /v1/projects`. I kept
the upstream document unchanged. `SERVER_ROUTING.md` documents the one
generated operation that needs an agent-host client:
`client.AgentThinkModelsV1().list()` for
`GET /v1/agent/settings/think/models`.

## What worked well

I confirmed complete operation coverage: the comparison found 50 generated
points for 50 source operations, with no missing routes, unexpected routes, or
route collisions. TypeScript and Python builds, generated offline tests, and
generated README and REFERENCE examples passed. The TypeScript package dry run
also passed. I later built and inspected both the Python wheel and source
distribution using isolated build tooling.

I verified that SDKGen mapped Deepgram authentication correctly. The generated
clients construct `Authorization: Token <API_KEY>` from the `apikey` option;
they do not use Bearer authentication. I found only environment-variable
placeholders in the repository, not an API key.

## Problems encountered and their classification

### Generator design limitation

I found that SDKGen does not retain operation-level server selection. This is
a generator design limitation rather than an upstream-spec defect. My
persistent API-base configuration is an intentional project choice, but the
documented agent operation needs a separately constructed client with the
agent base URL. It must not silently use the standard API-base client.

### Generator and model quality findings

SDKGen marked seven inferred live-flow steps unreachable and disabled:

- `BasicProjectBalanceV1Flow#0` (`load`)
- `BasicProjectDistributionCredentialsV1Flow#0` (`load`)
- `BasicProjectKeyV1ResponseItemFlow#0` (`load`)
- `BasicProjectRequestFlow#0` (`list`)
- `BasicUpdateProjectMemberScopesV1Flow#0` (`update`)
- `BasicUpdateProjectV1Flow#0` (`update`)
- `BasicUsageFlow#0` (`load`)

I also observed schema-derived entity names that are less natural than a
hand-designed SDK surface, including
`ListProjectBalancesV1ResponseBalancesItem` and
`ListProjectDistributionCredentialsV1ResponseDistribution`. These are usable,
but clearer aliases or operation-oriented names would improve discoverability.

My final staged-tree check, `git diff --cached --check`, reported 997
whitespace findings across 149 generated files, primarily trailing whitespace
and extra blank lines at end of file. I did not reformat generated source just
to suppress this result. I consider this a generator/template quality issue
that should be fixed upstream or explicitly accepted before committing a
strict whitespace-clean tree.

SDKGen doctor reports three remaining drift findings: one deliberate Python
package-component fork that emits the PEP 621 author field, plus two
target-license template copy-record markers. The current TypeScript and Python
license templates contain the standard MIT text, but SDKGen still records their
initial provisional edits as drift and refuses to refresh them without a force
operation. Doctor reports no stale, missing, or outdated generator files.

### Environment compatibility observation

I ran Python compilation and tests with `python3`. The generated `make test`
route expects a `python` executable, which was not present. The original
offline packaging check could not run because the system Python lacked pip and
`python -m build`. I then used isolated build tooling and successfully built
and inspected both distribution formats, so this was an environment
compatibility observation rather than a generated-package failure.

## Suggestions for improvement

I would recommend that SDKGen preserve OpenAPI server declarations at the
operation level or provide a first-class per-operation server override. I
would also like clearer diagnostics and resolution guidance for unreachable
inferred flows, readable aliases for response-wrapper entities, and a
configurable Python interpreter that can prefer `python3`. Better formatting
in generator templates would also remove the current staged whitespace
findings.

## Offline verification

| Check | Result |
| --- | --- |
| OpenAPI operation coverage | Passed — 50/50 |
| TypeScript build | Passed |
| TypeScript generated tests | Passed — 420 total, 378 passed, 0 failed, 42 skipped |
| Python compilation | Passed |
| Python generated tests | Passed — 424 total, 303 passed, 0 failed, 121 skipped |
| Generated README and REFERENCE examples | Passed |
| TypeScript npm package dry run | Passed |
| Python wheel and source distribution builds | Passed using isolated build tooling |

## Live API verification

I verified the generated SDK against Deepgram's live API using two read-only
checks. The direct `GET /v1/projects` request returned HTTP 200. I also tested
the generated TypeScript SDK using `client.Project().list()`, which completed
successfully and returned one project.

I did not separately record the SDK's raw HTTP status. I did not perform
Python live API verification. I did not use transcription, speech synthesis,
audio processing, resource creation, deletion, or any other modifying
endpoint for this verification.

## Verdict

I would use SDKGen as a productive starting point for a client SDK when I can
keep the generated model under review and add focused integration tests. I
would not call this SDK fully production-ready yet. Before client delivery or
publication, I would resolve or explicitly accept the single-base-server
limitation, review the seven unreachable flows and generated naming, and
address the generated whitespace findings. The TypeScript package dry run and
both Python distribution builds passed, but they do not replace those design
and integration reviews.
