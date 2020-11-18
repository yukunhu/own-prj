module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(glb|gltf)$/,
          loader: 'file-loader',
          options: {}
        }
      ]
    }
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './'
}
