"use strict";
var config_1 = require('../util/config');
var copy_1 = require('../copy');
var path = require('path');
describe('copy', function () {
    describe('findFileCopyOptions', function () {
        it('should find copy option for a file in a directory', function () {
            var context = config_1.generateContext();
            var filePath = 'src/assets/some.jpg';
            var copyOptions = copy_1.findFileCopyOptions(context, copyConfig, filePath);
            expect(copyOptions.length).toEqual(1);
            expect(copyOptions[0].src).toEqual(path.join(context.rootDir, filePath));
            expect(copyOptions[0].dest).toEqual(path.join(context.rootDir, filePath).replace('src', 'www'));
        });
        it('should find copy option for an exact file', function () {
            var context = config_1.generateContext();
            var filePath = 'src/index.html';
            var copyOptions = copy_1.findFileCopyOptions(context, copyConfig, filePath);
            expect(copyOptions.length).toEqual(1);
            expect(copyOptions[0].src).toEqual(path.join(context.rootDir, filePath));
            expect(copyOptions[0].dest).toEqual(path.join(context.rootDir, filePath).replace('src', 'www'));
        });
        it('should not find any copy options', function () {
            var context = config_1.generateContext();
            var filePath = 'src/idk.json';
            var copyOptions = copy_1.findFileCopyOptions(context, copyConfig, filePath);
            expect(copyOptions.length).toEqual(0);
        });
    });
    var copyConfig = {
        include: [
            {
                src: '{{SRC}}/assets/',
                dest: '{{WWW}}/assets/'
            },
            {
                src: '{{SRC}}/index.html',
                dest: '{{WWW}}/index.html'
            },
            {
                src: '{{SRC}}/manifest.json',
                dest: '{{WWW}}/manifest.json'
            },
            {
                src: '{{SRC}}/service-worker.js',
                dest: '{{WWW}}/service-worker.js'
            },
            {
                src: 'node_modules/ionic-angular/polyfills/polyfills.js',
                dest: '{{BUILD}}/polyfills.js'
            },
            {
                src: 'node_modules/ionicons/dist/fonts/',
                dest: '{{WWW}}/assets/fonts/'
            },
        ]
    };
});
