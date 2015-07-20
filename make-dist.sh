#!/bin/bash
# This script creates the distribution files. Usage:
# ./make-dist.sh

# remove dist files 
rm -rf dist/*

# compresses JavaScript files
cat src/jquery.sp-uri.js | uglifyjs \
    --compress \
    --mangle \
    --preamble "/*! jQuery.spUri v0.1.1 | Copyright (c) 2015 Gonzalo Chumillas | https://github.com/soloproyectos-js/jquery.sp-uri/blob/master/LICENSE */" \
    -o dist/jquery.sp-uri.min.js
