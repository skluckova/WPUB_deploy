module.exports = function(grunt) {
    grunt.initConfig({
        cssmin: {
            css: {
                src: 'css/blog-home.css',
                dest: 'css/blog-home.css'
            }
        },
        uglify: {
            dist:{
                files: {
                    'script.js':'script.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['cssmin']);
    
}
