var util = require("util");
var Organel = require("organic").Organel;
var path = require("path");
var less = require("less");
var fs = require("fs");

module.exports = function BundleStyle(plasma, config){

    var self = this;

    Organel.call(this, plasma);
    this.cache = {};
    if(config.useCache)
        console.log("using style caching");

    if(config.cwd)
      for(var key in config.cwd)
        config[key] = process.cwd()+config.cwd[key];
    this.config = config;
    this.on("BundleStyle", this.message);

}

util.inherits(module.exports, Organel);

module.exports.prototype.message = function(chemical, callback) {
    var self = this;
    
    var target = (chemical.root || this.config.root || "")+(chemical.style || this.config.style);
    if(target.indexOf(".less") === -1)
        target += ".less";

    // get the type of the bundle by chemical, config or extension name of the target
    var type = chemical.styleType || this.config.styleType || path.extname(target);

    if((chemical.useCache || this.config.useCache) && this.cache[target]) {
        chemical.data = this.cache[target];
        callback(chemical);
    } else {
        switch(type) {
            case ".less":
                var lessConfig = chemical.less || this.config.less || {};
                lessConfig.rootpath = path.dirname(target);
                fs.readFile(target, 'utf8', parseLessFile(target, lessConfig, function(err, css){
                    if(err) {
                        err.message += " while trying to parse "+target;
                        throw err;
                    }
                    self.cache[target] = chemical.data = css;
                    callback(chemical);
                }));
            break;
            default:
                callback(new Error("unrecognized style bundle type requested"));
            break;
        }
    }
}

var parseLessFile = function(input, options, callback){
    return function (e, data) {
        if(e) return callback(e);

        new(less.Parser)({
            paths: [path.dirname(input)].concat(options.paths || []),
            optimization: options.optimization || 1,
            filename: input,
            rootpath: options.rootpath,
            relativeUrls: options.relativeUrls || false,
            strictImports: options.strictImports || false,
            dumpLineNumbers: options.dumpLineNumbers || false
        }).parse(data, function (err, tree) {
            if (err) throw err;
            var css = tree.toCSS({
                compress: options.compress || false,
                yuicompress: options.yuicompress || false
            });
            if (options.output) {
                fs.writeFileSync(options.output, css, 'utf8');
                callback(err, true);
            } else {
                callback(err, css);
            }
        });
    };
}
