module.exports = function(grunt) {
    grunt.initConfig({
        cssmin: {
            css: {
                src: 'css/blog-home.css',
                dest: 'css/blog-home.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['cssmin']);
}
