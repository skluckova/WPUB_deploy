module.exports = function(grunt) {
    grunt.initConfig({
        cssmin: {
            css: {
                src: 'css/blog-home.css',
                dest: 'css/blog-home.css'
            }
        },
        uglify: {
            my_target:{
                files: {
                    'script.js':['script.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.registerTask('default', ['cssmin']);
    
}
