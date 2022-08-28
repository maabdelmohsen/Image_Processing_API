"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images = express_1.default.Router();
var path = require('path');
var fs = require('fs');
var sharp = require('sharp');
images.get('/', function (req, res) {
    var fullpath = path.join(__dirname, '..', '\\images\\full\\');
    var thumbpath = path.join(__dirname, '..', '\\images\\thumb\\');
    var filename = req.query.filename;
    var width = (req.query.width) ? parseInt(req.query.width) : 400;
    var high = (req.query.high) ? parseInt(req.query.high) : 400;
    var thumb_filename = filename.split('.').slice(0, -1).join('.') + '_thumb.jpg';
    try {
        fs.accessSync(thumbpath + thumb_filename);
        res.sendFile(thumbpath + thumb_filename);
    }
    catch (err) {
        sharp(fullpath + filename).resize(width, high).toFile(thumbpath + thumb_filename, function (err, info) {
            if (err) {
                res.send('"' + thumb_filename + '" Does not Exist!');
            }
            else {
                res.sendFile(thumbpath + thumb_filename);
            }
        });
    }
});
exports.default = images;
