
const { ApiDef } = require('@voxgig/apidef')
const Fs = require('node:fs')
const Path = require('node:path')

const officialSpec = Path.resolve(__dirname, '../def/openapi.yml')

// Preserve the upstream document on disk exactly as downloaded. Its global
// server list puts agent.deepgram.com first, but account-management endpoints
// (including GET /v1/projects) are served by api.deepgram.com. apidef/sdkgen
// use only servers[0] as a generated client default and do not preserve an
// operation-level server selector. The read-only in-memory reorder below makes
// the standard API host the generated default while retaining both servers in
// the derived model. Agent-host calls require a separately constructed client
// with base: 'https://agent.deepgram.com'.
const specFs = Object.create(Fs)
specFs.readFileSync = function (filename, ...args) {
  const source = Fs.readFileSync(filename, ...args)
  if (Path.resolve(String(filename)) !== officialSpec) return source

  const marker = '__DEEPGRAM_API_SERVER__'
  return String(source)
    .replace('https://agent.deepgram.com', marker)
    .replace('https://api.deepgram.com', 'https://agent.deepgram.com')
    .replace(marker, 'https://api.deepgram.com')
}

const opts = {
  folder: __dirname + '/../model',
  fs: specFs,
}

module.exports = ApiDef.makeBuild(opts)
