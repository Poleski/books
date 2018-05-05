module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            all: {
                options: {
                    compress: true,
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
                    ]
                },
                files: {
                    "src/styles.css": "src/styles.less"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
};
