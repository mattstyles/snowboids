
const { build } = require('esbuild')
const chokidar = require('chokidar')
const live = require('live-server')
const cpy = require('cpy')
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    p: 'port',
    o: 'open'
  },
  default: {
    port: 3000,
    open: false
  }
})

const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || argv.port

const run = async () => {
  const builder = await build({
    entryPoints: ['./src/index.js'],
    outfile: './dist/index.js',
    bundle: true,
    loader: {
      '.js': 'jsx'
    },
    inject: [
      './scripts/react-shim.js'
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
    },
    minify: isProd,
    incremental: !isProd
  })

  await copy()

  if (!isProd) {
    chokidar
      .watch('./src/**/*.{js,jsx,html}', {
        interval: 0
      })
      .on('all', async () => {
        builder.rebuild()
        await copy()
      })

    live.start({
      open: argv.open,
      port: port,
      root: './dist'
    })
  }
}

const copy = async () => {
  await cpy([
    './src/index.html'
  ], './dist')
}

run()
