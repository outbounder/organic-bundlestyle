# organel 

* `cwd` - Object

  *optional* object containing key:values, where values will be prefixed with `process.cwd()` and placed within config itself with coresponding keys

  Useful to provide `root` value relative to current working directory

* `root` - String
* `less` - Object, Less Options

  configuration options for Less compiler, possible values:

    * paths - Array of paths, by default the root folder of `style` is injected first
    * optimization - 1
    * rootpath 
    * relativeUrls - false
    * strictImports - false
    * dumpLineNumbers - false
    * compress - false
    * yuicompress - false
    * output - String undefined, fullpath to where the compiled bundle should be written

* `styleType` - String, autodetected from extension
* `style` - String 

# incoming | BundleStyle

* `style` - String

  **required**, given value should map to fullpath to the entry point of the style to be generated using less compiler

  * if BundleStyle organelle is configured with `root` option, it will be prepended to the style variable

  * if BundleStyle incoming chemical contains `root` variable, it will be prepended to the style variable

* `root` - String, optional

  *optional*, value to be prepended to the style path

* `styleType` - String, optional

  if not provided, extname of the `style` will be used. This option indicates the type of the parser to be used. Currently only Less is supported.

* `less` - Object, optional

  configuration options for Less compiler. If not provided less configuration from the Organelle will be used or its defaults.

  possible values

    * paths - Array of paths, by default the root folder of `style` is injected first
    * optimization
    * rootpath
    * relativeUrls
    * strictImports
    * dumpLineNumbers
    * compress
    * yuicompress
    * output - String, fullpath to where the compiled bundle should be written


## Response Chemical Structure ##

  * data - `true` when bundle should be written to file or compiled bundle contents