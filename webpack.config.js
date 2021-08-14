const path = require("path");

module.exports = {
  entry: '.',
  target: 'node',
  mode: 'production',
  output: {
     path: __dirname + '/release',
     filename: 'bundle.js',
  },
  externals: {
    electron: "electron"
  },        
  resolve: {
     modules: [
        "node_modules"
     ],
     extensions: [".js"]
  },
  optimization: {
   minimize: true
	}
};