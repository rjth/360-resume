require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"TextLayer":[function(require,module,exports){
var TextLayer, convertTextLayers, convertToTextLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = (function(superClass) {
  extend(TextLayer, superClass);

  function TextLayer(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    TextLayer.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
    this.style.outline = "none";
  }

  TextLayer.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  TextLayer.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  TextLayer.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  TextLayer.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  TextLayer.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  TextLayer.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  TextLayer.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  TextLayer.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  TextLayer.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  TextLayer.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  TextLayer.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  TextLayer.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  TextLayer.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  TextLayer.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  TextLayer.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  TextLayer.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return TextLayer;

})(Layer);

convertToTextLayer = function(layer) {
  var css, cssObj, importPath, t;
  t = new TextLayer({
    name: layer.name,
    frame: layer.frame,
    parent: layer.parent
  });
  cssObj = {};
  css = layer._info.metadata.css;
  css.forEach(function(rule) {
    var arr;
    if (_.includes(rule, '/*')) {
      return;
    }
    arr = rule.split(': ');
    return cssObj[arr[0]] = arr[1].replace(';', '');
  });
  t.style = cssObj;
  importPath = layer.__framerImportedFromPath;
  if (_.includes(importPath, '@2x')) {
    t.fontSize *= 2;
    t.lineHeight = (parseInt(t.lineHeight) * 2) + 'px';
    t.letterSpacing *= 2;
  }
  t.y -= (parseInt(t.lineHeight) - t.fontSize) / 2;
  t.y -= t.fontSize * 0.1;
  t.x -= t.fontSize * 0.08;
  t.width += t.fontSize * 0.5;
  t.text = layer._info.metadata.string;
  layer.destroy();
  return t;
};

Layer.prototype.convertToTextLayer = function() {
  return convertToTextLayer(this);
};

convertTextLayers = function(obj) {
  var layer, prop, results;
  results = [];
  for (prop in obj) {
    layer = obj[prop];
    if (layer._info.kind === "text") {
      results.push(obj[prop] = convertToTextLayer(layer));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Layer.prototype.frameAsTextLayer = function(properties) {
  var t;
  t = new TextLayer;
  t.frame = this.frame;
  t.superLayer = this.superLayer;
  _.extend(t, properties);
  this.destroy();
  return t;
};

exports.TextLayer = TextLayer;

exports.convertTextLayers = convertTextLayers;


},{}],"VRComponent":[function(require,module,exports){
"\nVRComponent class\n\nproperties\n- front (set: imagePath <string>, get: layer)\n- right\n- back\n- left\n- top\n- bottom\n- heading <number>\n- elevation <number>\n- tilt <number> readonly\n\n- orientationLayer <bool>\n- arrowKeys <bool>\n- lookAtLatestProjectedLayer <bool>\n\nmethods\n- projectLayer(layer) # heading and elevation are set as properties on the layer\n- hideEnviroment()\n\nevents\n- Events.OrientationDidChange, (data {heading, elevation, tilt})\n\n--------------------------------------------------------------------------------\n\nVRLayer class\n\nproperties\n- heading <number> (from 0 up to 360)\n- elevation <number> (from -90 down to 90 up)\n";
var KEYS, KEYSDOWN, SIDES, VRAnchorLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

SIDES = ["north", "front", "east", "right", "south", "back", "west", "left", "top", "bottom"];

KEYS = {
  LeftArrow: 37,
  UpArrow: 38,
  RightArrow: 39,
  DownArrow: 40
};

KEYSDOWN = {
  left: false,
  up: false,
  right: false,
  down: false
};

Events.OrientationDidChange = "orientationdidchange";

VRAnchorLayer = (function(superClass) {
  extend(VRAnchorLayer, superClass);

  function VRAnchorLayer(layer, cubeSide) {
    VRAnchorLayer.__super__.constructor.call(this, void 0);
    this.width = 0;
    this.height = 0;
    this.clip = false;
    this.name = "anchor";
    this.cubeSide = cubeSide;
    this.layer = layer;
    layer.superLayer = this;
    layer.center();
    layer.on("change:orientation", (function(_this) {
      return function(newValue, layer) {
        return _this.updatePosition(layer);
      };
    })(this));
    this.updatePosition(layer);
    layer._context.on("layer:destroy", (function(_this) {
      return function(layer) {
        if (layer === _this.layer) {
          return _this.destroy();
        }
      };
    })(this));
  }

  VRAnchorLayer.prototype.updatePosition = function(layer) {
    var halfCubSide;
    halfCubSide = this.cubeSide / 2;
    return this.style["webkitTransform"] = "translateX(" + ((this.cubeSide - this.width) / 2) + "px) translateY(" + ((this.cubeSide - this.height) / 2) + "px) rotateZ(" + layer.heading + "deg) rotateX(" + (90 - layer.elevation) + "deg) translateZ(" + layer.distance + "px) rotateX(180deg)";
  };

  return VRAnchorLayer;

})(Layer);

exports.VRLayer = (function(superClass) {
  extend(VRLayer, superClass);

  function VRLayer(options) {
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      heading: 0,
      elevation: 0
    });
    VRLayer.__super__.constructor.call(this, options);
  }

  VRLayer.define("heading", {
    get: function() {
      return this._heading;
    },
    set: function(value) {
      var rest;
      if (value >= 360) {
        value = value % 360;
      } else if (value < 0) {
        rest = Math.abs(value) % 360;
        value = 360 - rest;
      }
      if (this._heading !== value) {
        this._heading = value;
        this.emit("change:heading", value);
        return this.emit("change:orientation", value);
      }
    }
  });

  VRLayer.define("elevation", {
    get: function() {
      return this._elevation;
    },
    set: function(value) {
      value = Utils.clamp(value, -90, 90);
      if (value !== this._elevation) {
        this._elevation = value;
        this.emit("change:elevation", value);
        return this.emit("change:orientation", value);
      }
    }
  });

  VRLayer.define("distance", {
    get: function() {
      return this._distance;
    },
    set: function(value) {
      if (value !== this._distance) {
        this._distance = value;
        this.emit("change:distance", value);
        return this.emit("change:orientation", value);
      }
    }
  });

  return VRLayer;

})(Layer);

exports.VRComponent = (function(superClass) {
  extend(VRComponent, superClass);

  function VRComponent(options) {
    if (options == null) {
      options = {};
    }
    this.addDesktopPanLayer = bind(this.addDesktopPanLayer, this);
    this.removeDesktopPanLayer = bind(this.removeDesktopPanLayer, this);
    this.deviceOrientationUpdate = bind(this.deviceOrientationUpdate, this);
    this.createCube = bind(this.createCube, this);
    options = _.defaults(options, {
      cubeSide: 3000,
      perspective: 1200,
      lookAtLatestProjectedLayer: false,
      width: Screen.width,
      height: Screen.height,
      orientationLayer: true,
      arrowKeys: true
    });
    VRComponent.__super__.constructor.call(this, options);
    this.perspective = options.perspective;
    this.backgroundColor = null;
    this.createCube(options.cubeSide);
    this.degToRad = Math.PI / 180;
    this.layersToKeepLevel = [];
    this.lookAtLatestProjectedLayer = options.lookAtLatestProjectedLayer;
    this.arrowKeys = options.arrowKeys;
    this._keys();
    this._heading = 0;
    this._elevation = 0;
    this._tilt = 0;
    this._headingOffset = 0;
    this._elevationOffset = 0;
    this._deviceHeading = 0;
    this._deviceElevation = 0;
    if (options.heading) {
      this.heading = options.heading;
    }
    if (options.elevation) {
      this.elevation = options.elevation;
    }
    this.orientationLayer = options.orientationLayer;
    this.desktopPan(0, 0);
    if (Utils.isMobile()) {
      window.addEventListener("deviceorientation", (function(_this) {
        return function(event) {
          return _this.orientationData = event;
        };
      })(this));
    }
    Framer.Loop.on("update", this.deviceOrientationUpdate);
    Framer.CurrentContext.on("reset", function() {
      return Framer.Loop.off("update", this.deviceOrientationUpdate);
    });
    this.on("change:frame", function() {
      return this.desktopPan(0, 0);
    });
  }

  VRComponent.prototype._keys = function() {
    document.addEventListener("keydown", (function(_this) {
      return function(event) {
        if (_this.arrowKeys) {
          switch (event.which) {
            case KEYS.UpArrow:
              KEYSDOWN.up = true;
              return event.preventDefault();
            case KEYS.DownArrow:
              KEYSDOWN.down = true;
              return event.preventDefault();
            case KEYS.LeftArrow:
              KEYSDOWN.left = true;
              return event.preventDefault();
            case KEYS.RightArrow:
              KEYSDOWN.right = true;
              return event.preventDefault();
          }
        }
      };
    })(this));
    document.addEventListener("keyup", (function(_this) {
      return function(event) {
        if (_this.arrowKeys) {
          switch (event.which) {
            case KEYS.UpArrow:
              KEYSDOWN.up = false;
              return event.preventDefault();
            case KEYS.DownArrow:
              KEYSDOWN.down = false;
              return event.preventDefault();
            case KEYS.LeftArrow:
              KEYSDOWN.left = false;
              return event.preventDefault();
            case KEYS.RightArrow:
              KEYSDOWN.right = false;
              return event.preventDefault();
          }
        }
      };
    })(this));
    return window.onblur = function() {
      KEYSDOWN.up = false;
      KEYSDOWN.down = false;
      KEYSDOWN.left = false;
      return KEYSDOWN.right = false;
    };
  };

  VRComponent.define("orientationLayer", {
    get: function() {
      return this.desktopOrientationLayer !== null && this.desktopOrientationLayer !== void 0;
    },
    set: function(value) {
      if (this.world !== void 0) {
        if (Utils.isDesktop()) {
          if (value === true) {
            return this.addDesktopPanLayer();
          } else if (value === false) {
            return this.removeDesktopPanLayer();
          }
        }
      }
    }
  });

  VRComponent.define("heading", {
    get: function() {
      var heading, rest;
      heading = this._heading + this._headingOffset;
      if (heading > 360) {
        heading = heading % 360;
      } else if (heading < 0) {
        rest = Math.abs(heading) % 360;
        heading = 360 - rest;
      }
      return heading;
    },
    set: function(value) {
      return this.lookAt(value, this._elevation);
    }
  });

  VRComponent.define("elevation", {
    get: function() {
      return this._elevation;
    },
    set: function(value) {
      return this.lookAt(this._heading, value);
    }
  });

  VRComponent.define("tilt", {
    get: function() {
      return this._tilt;
    },
    set: function(value) {
      throw "Tilt is readonly";
    }
  });

  SIDES.map(function(face) {
    return VRComponent.define(face, {
      get: function() {
        return this.layerFromFace(face);
      },
      set: function(value) {
        return this.setImage(face, value);
      }
    });
  });

  VRComponent.prototype.createCube = function(cubeSide) {
    var colors, halfCubSide, i, index, key, len, ref, ref1, results, side, sideNames;
    if (cubeSide == null) {
      cubeSide = this.cubeSide;
    }
    this.cubeSide = cubeSide;
    if ((ref = this.world) != null) {
      ref.destroy();
    }
    this.world = new Layer({
      name: "world",
      superLayer: this,
      width: cubeSide,
      height: cubeSide,
      backgroundColor: null,
      clip: false
    });
    this.world.style.webkitTransformStyle = "preserve-3d";
    this.world.center();
    halfCubSide = this.cubeSide / 2;
    this.side0 = new Layer;
    this.side0.style["webkitTransform"] = "rotateX(-90deg) translateZ(-" + halfCubSide + "px)";
    this.side1 = new Layer;
    this.side1.style["webkitTransform"] = "rotateY(-90deg) translateZ(-" + halfCubSide + "px) rotateZ(90deg)";
    this.side2 = new Layer;
    this.side2.style["webkitTransform"] = "rotateX(90deg) translateZ(-" + halfCubSide + "px) rotateZ(180deg)";
    this.side3 = new Layer;
    this.side3.style["webkitTransform"] = "rotateY(90deg) translateZ(-" + halfCubSide + "px) rotateZ(-90deg)";
    this.side4 = new Layer;
    this.side4.style["webkitTransform"] = "rotateY(-180deg) translateZ(-" + halfCubSide + "px) rotateZ(180deg)";
    this.side5 = new Layer;
    this.side5.style["webkitTransform"] = "translateZ(-" + halfCubSide + "px)";
    this.sides = [this.side0, this.side1, this.side2, this.side3, this.side4, this.side5];
    colors = ["#866ccc", "#28affa", "#2dd7aa", "#ffc22c", "#7ddd11", "#f95faa"];
    sideNames = ["front", "right", "back", "left", "top", "bottom"];
    index = 0;
    ref1 = this.sides;
    for (i = 0, len = ref1.length; i < len; i++) {
      side = ref1[i];
      side.name = sideNames[index];
      side.width = side.height = cubeSide;
      side.superLayer = this.world;
      side.html = sideNames[index];
      side.color = "white";
      side._backgroundColor = colors[index];
      side.backgroundColor = colors[index];
      side.style = {
        lineHeight: cubeSide + "px",
        textAlign: "center",
        fontSize: (cubeSide / 10) + "px",
        fontWeight: "100",
        fontFamily: "Helvetica Neue"
      };
      index++;
    }
    if (this.sideImages) {
      results = [];
      for (key in this.sideImages) {
        results.push(this.setImage(key, this.sideImages[key]));
      }
      return results;
    }
  };

  VRComponent.prototype.hideEnviroment = function() {
    var i, len, ref, results, side;
    ref = this.sides;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      side = ref[i];
      results.push(side.destroy());
    }
    return results;
  };

  VRComponent.prototype.layerFromFace = function(face) {
    var map;
    map = {
      north: this.side0,
      front: this.side0,
      east: this.side1,
      right: this.side1,
      south: this.side2,
      back: this.side2,
      west: this.side3,
      left: this.side3,
      top: this.side4,
      bottom: this.side5
    };
    return map[face];
  };

  VRComponent.prototype.setImage = function(face, imagePath) {
    var layer, ref;
    if (ref = !face, indexOf.call(SIDES, ref) >= 0) {
      throw Error("VRComponent setImage, wrong name for face: " + face + ", valid options: front, right, back, left, top, bottom, north, east, south, west");
    }
    if (!this.sideImages) {
      this.sideImages = {};
    }
    this.sideImages[face] = imagePath;
    layer = this.layerFromFace(face);
    if (imagePath) {
      if (layer != null) {
        layer.html = "";
      }
      return layer != null ? layer.image = imagePath : void 0;
    } else {
      if (layer != null) {
        layer.html = layer != null ? layer.name : void 0;
      }
      return layer != null ? layer.backgroundColor = layer != null ? layer._backgroundColor : void 0 : void 0;
    }
  };

  VRComponent.prototype.getImage = function(face) {
    var layer, ref;
    if (ref = !face, indexOf.call(SIDES, ref) >= 0) {
      throw Error("VRComponent getImage, wrong name for face: " + face + ", valid options: front, right, back, left, top, bottom, north, east, south, west");
    }
    layer = this.layerFromFace(face);
    if (layer) {
      return layer.image;
    }
  };

  VRComponent.prototype.projectLayer = function(insertLayer) {
    var anchor, distance, elevation, heading, rest;
    heading = insertLayer.heading;
    if (heading === void 0) {
      heading = 0;
    }
    elevation = insertLayer.elevation;
    if (elevation === void 0) {
      elevation = 0;
    }
    if (heading >= 360) {
      heading = value % 360;
    } else if (heading < 0) {
      rest = Math.abs(heading) % 360;
      heading = 360 - rest;
    }
    elevation = Utils.clamp(elevation, -90, 90);
    distance = insertLayer.distance;
    if (distance === void 0) {
      distance = 1200;
    }
    insertLayer.heading = heading;
    insertLayer.elevation = elevation;
    insertLayer.distance = distance;
    anchor = new VRAnchorLayer(insertLayer, this.cubeSide);
    anchor.superLayer = this.world;
    if (this.lookAtLatestProjectedLayer) {
      return this.lookAt(heading, elevation);
    }
  };

  VRComponent.prototype.deviceOrientationUpdate = function() {
    var alpha, beta, date, diff, gamma, halfCubSide, orientation, rotation, translationX, translationY, translationZ, x, xAngle, yAngle, zAngle;
    if (Utils.isDesktop()) {
      if (this.arrowKeys) {
        if (this._lastCallHorizontal === void 0) {
          this._lastCallHorizontal = 0;
          this._lastCallVertical = 0;
          this._accelerationHorizontal = 1;
          this._accelerationVertical = 1;
          this._goingUp = false;
          this._goingLeft = false;
        }
        date = new Date();
        x = .1;
        if (KEYSDOWN.up || KEYSDOWN.down) {
          diff = date - this._lastCallVertical;
          if (diff < 30) {
            if (this._accelerationVertical < 30) {
              this._accelerationVertical += 0.18;
            }
          }
          if (KEYSDOWN.up) {
            if (this._goingUp === false) {
              this._accelerationVertical = 1;
              this._goingUp = true;
            }
            this.desktopPan(0, 1 * this._accelerationVertical * x);
          } else {
            if (this._goingUp === true) {
              this._accelerationVertical = 1;
              this._goingUp = false;
            }
            this.desktopPan(0, -1 * this._accelerationVertical * x);
          }
          this._lastCallVertical = date;
        } else {
          this._accelerationVertical = 1;
        }
        if (KEYSDOWN.left || KEYSDOWN.right) {
          diff = date - this._lastCallHorizontal;
          if (diff < 30) {
            if (this._accelerationHorizontal < 25) {
              this._accelerationHorizontal += 0.18;
            }
          }
          if (KEYSDOWN.left) {
            if (this._goingLeft === false) {
              this._accelerationHorizontal = 1;
              this._goingLeft = true;
            }
            this.desktopPan(1 * this._accelerationHorizontal * x, 0);
          } else {
            if (this._goingLeft === true) {
              this._accelerationHorizontal = 1;
              this._goingLeft = false;
            }
            this.desktopPan(-1 * this._accelerationHorizontal * x, 0);
          }
          return this._lastCallHorizontal = date;
        } else {
          return this._accelerationHorizontal = 1;
        }
      }
    } else if (this.orientationData) {
      alpha = this.orientationData.alpha;
      beta = this.orientationData.beta;
      gamma = this.orientationData.gamma;
      if (alpha !== 0 && beta !== 0 && gamma !== 0) {
        this.directionParams(alpha, beta, gamma);
      }
      xAngle = beta;
      yAngle = -gamma;
      zAngle = alpha;
      halfCubSide = this.cubeSide / 2;
      orientation = "rotate(" + (window.orientation * -1) + "deg) ";
      translationX = "translateX(" + ((this.width / 2) - halfCubSide) + "px)";
      translationY = " translateY(" + ((this.height / 2) - halfCubSide) + "px)";
      translationZ = " translateZ(" + this.perspective + "px)";
      rotation = translationZ + translationX + translationY + orientation + (" rotateY(" + yAngle + "deg) rotateX(" + xAngle + "deg) rotateZ(" + zAngle + "deg)") + (" rotateZ(" + (-this._headingOffset) + "deg)");
      return this.world.style["webkitTransform"] = rotation;
    }
  };

  VRComponent.prototype.directionParams = function(alpha, beta, gamma) {
    var alphaRad, betaRad, cA, cB, cG, cH, diff, elevation, gammaRad, heading, orientationTiltOffset, sA, sB, sG, tilt, xrA, xrB, xrC, yrA, yrB, yrC, zrA, zrB, zrC;
    alphaRad = alpha * this.degToRad;
    betaRad = beta * this.degToRad;
    gammaRad = gamma * this.degToRad;
    cA = Math.cos(alphaRad);
    sA = Math.sin(alphaRad);
    cB = Math.cos(betaRad);
    sB = Math.sin(betaRad);
    cG = Math.cos(gammaRad);
    sG = Math.sin(gammaRad);
    xrA = -sA * sB * sG + cA * cG;
    xrB = cA * sB * sG + sA * cG;
    xrC = cB * sG;
    yrA = -sA * cB;
    yrB = cA * cB;
    yrC = -sB;
    zrA = -sA * sB * cG - cA * sG;
    zrB = cA * sB * cG - sA * sG;
    zrC = cB * cG;
    heading = Math.atan(zrA / zrB);
    if (zrB < 0) {
      heading += Math.PI;
    } else if (zrA < 0) {
      heading += 2 * Math.PI;
    }
    elevation = Math.PI / 2 - Math.acos(-zrC);
    cH = Math.sqrt(1 - (zrC * zrC));
    tilt = Math.acos(-xrC / cH) * Math.sign(yrC);
    heading *= 180 / Math.PI;
    elevation *= 180 / Math.PI;
    tilt *= 180 / Math.PI;
    this._heading = Math.round(heading * 1000) / 1000;
    this._elevation = Math.round(elevation * 1000) / 1000;
    tilt = Math.round(tilt * 1000) / 1000;
    orientationTiltOffset = (window.orientation * -1) + 90;
    tilt += orientationTiltOffset;
    if (tilt > 180) {
      diff = tilt - 180;
      tilt = -180 + diff;
    }
    this._tilt = tilt;
    this._deviceHeading = this._heading;
    this._deviceElevation = this._elevation;
    return this._emitOrientationDidChangeEvent();
  };

  VRComponent.prototype.removeDesktopPanLayer = function() {
    var ref;
    return (ref = this.desktopOrientationLayer) != null ? ref.destroy() : void 0;
  };

  VRComponent.prototype.addDesktopPanLayer = function() {
    var ref;
    if ((ref = this.desktopOrientationLayer) != null) {
      ref.destroy();
    }
    this.desktopOrientationLayer = new Layer({
      width: 100000,
      height: 10000,
      backgroundColor: null,
      superLayer: this,
      name: "desktopOrientationLayer"
    });
    this.desktopOrientationLayer.center();
    this.desktopOrientationLayer.draggable.enabled = true;
    this.prevDesktopDir = this.desktopOrientationLayer.x;
    this.prevDesktopHeight = this.desktopOrientationLayer.y;
    this.desktopOrientationLayer.on(Events.DragStart, (function(_this) {
      return function() {
        _this.prevDesktopDir = _this.desktopOrientationLayer.x;
        _this.prevDesktopHeight = _this.desktopOrientationLayer.y;
        return _this.desktopDraggableActive = true;
      };
    })(this));
    this.desktopOrientationLayer.on(Events.Move, (function(_this) {
      return function() {
        var deltaDir, deltaHeight, strength;
        if (_this.desktopDraggableActive) {
          strength = Utils.modulate(_this.perspective, [1200, 900], [22, 17.5]);
          deltaDir = (_this.desktopOrientationLayer.x - _this.prevDesktopDir) / strength;
          deltaHeight = (_this.desktopOrientationLayer.y - _this.prevDesktopHeight) / strength;
          _this.desktopPan(deltaDir, deltaHeight);
          _this.prevDesktopDir = _this.desktopOrientationLayer.x;
          return _this.prevDesktopHeight = _this.desktopOrientationLayer.y;
        }
      };
    })(this));
    return this.desktopOrientationLayer.on(Events.AnimationEnd, (function(_this) {
      return function() {
        var ref1;
        _this.desktopDraggableActive = false;
        return (ref1 = _this.desktopOrientationLayer) != null ? ref1.center() : void 0;
      };
    })(this));
  };

  VRComponent.prototype.desktopPan = function(deltaDir, deltaHeight) {
    var halfCubSide, rotation, translationX, translationY, translationZ;
    halfCubSide = this.cubeSide / 2;
    translationX = "translateX(" + ((this.width / 2) - halfCubSide) + "px)";
    translationY = " translateY(" + ((this.height / 2) - halfCubSide) + "px)";
    translationZ = " translateZ(" + this.perspective + "px)";
    this._heading -= deltaDir;
    if (this._heading > 360) {
      this._heading -= 360;
    } else if (this._heading < 0) {
      this._heading += 360;
    }
    this._elevation += deltaHeight;
    this._elevation = Utils.clamp(this._elevation, -90, 90);
    rotation = translationZ + translationX + translationY + (" rotateX(" + (this._elevation + 90) + "deg) rotateZ(" + (360 - this._heading) + "deg)") + (" rotateZ(" + (-this._headingOffset) + "deg)");
    this.world.style["webkitTransform"] = rotation;
    this._heading = Math.round(this._heading * 1000) / 1000;
    this._tilt = 0;
    return this._emitOrientationDidChangeEvent();
  };

  VRComponent.prototype.lookAt = function(heading, elevation) {
    var halfCubSide, ref, rotation, translationX, translationY, translationZ;
    halfCubSide = this.cubeSide / 2;
    translationX = "translateX(" + ((this.width / 2) - halfCubSide) + "px)";
    translationY = " translateY(" + ((this.height / 2) - halfCubSide) + "px)";
    translationZ = " translateZ(" + this.perspective + "px)";
    rotation = translationZ + translationX + translationY + (" rotateZ(" + this._tilt + "deg) rotateX(" + (elevation + 90) + "deg) rotateZ(" + (-heading) + "deg)");
    if ((ref = this.world) != null) {
      ref.style["webkitTransform"] = rotation;
    }
    this._heading = heading;
    this._elevation = elevation;
    if (Utils.isMobile()) {
      this._headingOffset = this._heading - this._deviceHeading;
    }
    this._elevationOffset = this._elevation - this._deviceElevation;
    heading = this._heading;
    if (heading < 0) {
      heading += 360;
    } else if (heading > 360) {
      heading -= 360;
    }
    return this.emit(Events.OrientationDidChange, {
      heading: heading,
      elevation: this._elevation,
      tilt: this._tilt
    });
  };

  VRComponent.prototype._emitOrientationDidChangeEvent = function() {
    return this.emit(Events.OrientationDidChange, {
      heading: this.heading,
      elevation: this._elevation,
      tilt: this._tilt
    });
  };

  return VRComponent;

})(Layer);


},{}],"audio":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AudioPlayer = (function(superClass) {
  extend(AudioPlayer, superClass);

  function AudioPlayer(options) {
    if (options == null) {
      options = {};
    }
    this.getTimeLeft = bind(this.getTimeLeft, this);
    if (options.backgroundColor == null) {
      options.backgroundColor = "transparent";
    }
    this.player = document.createElement("audio");
    this.player.setAttribute("webkit-playsinline", "true");
    this.player.setAttribute("preload", "auto");
    this.player.style.width = "100%";
    this.player.style.height = "100%";
    this.player.on = this.player.addEventListener;
    this.player.off = this.player.removeEventListener;
    AudioPlayer.__super__.constructor.call(this, options);
    this.controls = new Layer({
      backgroundColor: "transparent",
      width: 80,
      height: 80,
      superLayer: this,
      name: "controls"
    });
    this.controls.showPlay = function() {
      return this.image = "images/play.png";
    };
    this.controls.showPause = function() {
      return this.image = "images/pause.png";
    };
    this.controls.showPlay();
    this.controls.center();
    this.timeStyle = {
      "font-size": "20px",
      "color": "#000"
    };
    this.on(Events.Click, function() {
      var currentTime, duration;
      currentTime = Math.round(this.player.currentTime);
      duration = Math.round(this.player.duration);
      if (this.player.paused) {
        this.player.play();
        this.controls.showPause();
        if (currentTime === duration) {
          this.player.currentTime = 0;
          return this.player.play();
        }
      } else {
        this.player.pause();
        return this.controls.showPlay();
      }
    });
    this.player.onplaying = (function(_this) {
      return function() {
        return _this.controls.showPause();
      };
    })(this);
    this.player.onended = (function(_this) {
      return function() {
        return _this.controls.showPlay();
      };
    })(this);
    this.player.formatTime = function() {
      var min, sec;
      sec = Math.floor(this.currentTime);
      min = Math.floor(sec / 60);
      sec = Math.floor(sec % 60);
      sec = sec >= 10 ? sec : '0' + sec;
      return min + ":" + sec;
    };
    this.player.formatTimeLeft = function() {
      var min, sec;
      sec = Math.floor(this.duration) - Math.floor(this.currentTime);
      min = Math.floor(sec / 60);
      sec = Math.floor(sec % 60);
      sec = sec >= 10 ? sec : '0' + sec;
      return min + ":" + sec;
    };
    this.audio = options.audio;
    this._element.appendChild(this.player);
  }

  AudioPlayer.define("audio", {
    get: function() {
      return this.player.src;
    },
    set: function(audio) {
      this.player.src = audio;
      if (this.player.canPlayType("audio/mp3") === "") {
        throw Error("No supported audio file included.");
      }
    }
  });

  AudioPlayer.define("showProgress", {
    get: function() {
      return this._showProgress;
    },
    set: function(showProgress) {
      return this.setProgress(showProgress, false);
    }
  });

  AudioPlayer.define("showVolume", {
    get: function() {
      return this._showVolume;
    },
    set: function(showVolume) {
      return this.setVolume(showVolume, false);
    }
  });

  AudioPlayer.define("showTime", {
    get: function() {
      return this._showTime;
    },
    set: function(showTime) {
      return this.getTime(showTime, false);
    }
  });

  AudioPlayer.define("showTimeLeft", {
    get: function() {
      return this._showTimeLeft;
    },
    set: function(showTimeLeft) {
      return this.getTimeLeft(showTimeLeft, false);
    }
  });

  AudioPlayer.prototype._checkBoolean = function(property) {
    var ref, ref1;
    if (_.isString(property)) {
      if ((ref = property.toLowerCase()) === "1" || ref === "true") {
        property = true;
      } else if ((ref1 = property.toLowerCase()) === "0" || ref1 === "false") {
        property = false;
      } else {
        return;
      }
    }
    if (!_.isBoolean(property)) {

    }
  };

  AudioPlayer.prototype.getTime = function(showTime) {
    this._checkBoolean(showTime);
    this._showTime = showTime;
    if (showTime === true) {
      this.time = new Layer({
        backgroundColor: "transparent",
        name: "currentTime"
      });
      this.time.style = this.timeStyle;
      this.time.html = "0:00";
      return this.player.ontimeupdate = (function(_this) {
        return function() {
          return _this.time.html = _this.player.formatTime();
        };
      })(this);
    }
  };

  AudioPlayer.prototype.getTimeLeft = function(showTimeLeft) {
    this._checkBoolean(showTimeLeft);
    this._showTimeLeft = showTimeLeft;
    if (showTimeLeft === true) {
      this.timeLeft = new Layer({
        backgroundColor: "transparent",
        name: "timeLeft"
      });
      this.timeLeft.style = this.timeStyle;
      this.timeLeft.html = "-0:00";
      this.player.on("loadedmetadata", (function(_this) {
        return function() {
          return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
        };
      })(this));
      return this.player.ontimeupdate = (function(_this) {
        return function() {
          return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
        };
      })(this);
    }
  };

  AudioPlayer.prototype.setProgress = function(showProgress) {
    var isMoving, wasPlaying;
    this._checkBoolean(showProgress);
    this._showProgress = showProgress;
    if (this._showProgress === true) {
      this.progressBar = new SliderComponent({
        width: 200,
        height: 6,
        backgroundColor: "#eee",
        knobSize: 20,
        value: 0,
        min: 0
      });
      this.player.oncanplay = (function(_this) {
        return function() {
          return _this.progressBar.max = Math.round(_this.player.duration);
        };
      })(this);
      this.progressBar.knob.draggable.momentum = false;
      wasPlaying = isMoving = false;
      if (!this.player.paused) {
        wasPlaying = true;
      }
      this.progressBar.on(Events.SliderValueChange, (function(_this) {
        return function() {
          var currentTime, progressBarTime;
          currentTime = Math.round(_this.player.currentTime);
          progressBarTime = Math.round(_this.progressBar.value);
          if (currentTime !== progressBarTime) {
            _this.player.currentTime = _this.progressBar.value;
          }
          if (_this.time && _this.timeLeft) {
            _this.time.html = _this.player.formatTime();
            return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
          }
        };
      })(this));
      this.progressBar.knob.on(Events.DragMove, (function(_this) {
        return function() {
          return isMoving = true;
        };
      })(this));
      this.progressBar.knob.on(Events.DragEnd, (function(_this) {
        return function(event) {
          var currentTime, duration;
          currentTime = Math.round(_this.player.currentTime);
          duration = Math.round(_this.player.duration);
          if (wasPlaying && currentTime !== duration) {
            _this.player.play();
            _this.controls.showPause();
          }
          if (currentTime === duration) {
            _this.player.pause();
            _this.controls.showPlay();
          }
          return isMoving = false;
        };
      })(this));
      return this.player.ontimeupdate = (function(_this) {
        return function() {
          if (!isMoving) {
            _this.progressBar.knob.midX = _this.progressBar.pointForValue(_this.player.currentTime);
            _this.progressBar.knob.draggable.isMoving = false;
          }
          if (_this.time && _this.timeLeft) {
            _this.time.html = _this.player.formatTime();
            return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
          }
        };
      })(this);
    }
  };

  AudioPlayer.prototype.setVolume = function(showVolume) {
    var base;
    this._checkBoolean(showVolume);
    if ((base = this.player).volume == null) {
      base.volume = 0.75;
    }
    this.volumeBar = new SliderComponent({
      width: 200,
      height: 6,
      backgroundColor: "#eee",
      knobSize: 20,
      min: 0,
      max: 1,
      value: this.player.volume
    });
    this.volumeBar.knob.draggable.momentum = false;
    this.volumeBar.on("change:width", (function(_this) {
      return function() {
        return _this.volumeBar.value = _this.player.volume;
      };
    })(this));
    return this.volumeBar.on("change:value", (function(_this) {
      return function() {
        return _this.player.volume = _this.volumeBar.value;
      };
    })(this));
  };

  return AudioPlayer;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcmp0aC9Ecm9wYm94L19Qcm9qZWN0cy9fSm9uYXRoYW4gUmF2YXN6L1Jlc3VtZS9WUl9SZXN1bWUuZnJhbWVyL21vZHVsZXMvVGV4dExheWVyLmNvZmZlZSIsIi9Vc2Vycy9yanRoL0Ryb3Bib3gvX1Byb2plY3RzL19Kb25hdGhhbiBSYXZhc3ovUmVzdW1lL1ZSX1Jlc3VtZS5mcmFtZXIvbW9kdWxlcy9WUkNvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvcmp0aC9Ecm9wYm94L19Qcm9qZWN0cy9fSm9uYXRoYW4gUmF2YXN6L1Jlc3VtZS9WUl9SZXN1bWUuZnJhbWVyL21vZHVsZXMvYXVkaW8uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxnREFBQTtFQUFBOzs7QUFBTTs7O0VBRVEsbUJBQUMsT0FBRDs7TUFBQyxVQUFROztJQUNyQixJQUFDLENBQUEsVUFBRCxHQUFjO0lBQ2QsSUFBQyxDQUFBLGdCQUFELEdBQW9COztNQUNwQixPQUFPLENBQUMsa0JBQXNCLE9BQU8sQ0FBQyxLQUFYLEdBQXNCLHdCQUF0QixHQUFvRDs7O01BQy9FLE9BQU8sQ0FBQyxRQUFTOzs7TUFDakIsT0FBTyxDQUFDLGFBQWM7OztNQUN0QixPQUFPLENBQUMsYUFBYzs7O01BQ3RCLE9BQU8sQ0FBQyxXQUFZOzs7TUFDcEIsT0FBTyxDQUFDLE9BQVE7O0lBQ2hCLDJDQUFNLE9BQU47SUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsR0FBb0I7SUFDcEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLEdBQWlCO0VBWEw7O3NCQWFiLFFBQUEsR0FBVSxTQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLFFBQWxCOztNQUFrQixXQUFXOztJQUN0QyxJQUFDLENBQUEsS0FBTSxDQUFBLFFBQUEsQ0FBUCxHQUFzQixRQUFILEdB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RUFBSyxDQUhMO01BR1EsR0FBQSxFQUFLLENBSGI7TUFJQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUpmO0tBRGdCO0lBT2pCLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUExQixHQUFxQztJQUVyQyxJQUFDLENBQUEsU0FBUyxDQUFDLEVBQVgsQ0FBYyxjQUFkLEVBQThCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUM3QixLQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsR0FBbUIsS0FBQyxDQUFBLE1BQU0sQ0FBQztNQURFO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE5QjtXQUdBLElBQUMsQ0FBQSxTQUFTLENBQUMsRUFBWCxDQUFjLGNBQWQsRUFBOEIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQzdCLEtBQUMsQ0FBQSxNQUFNLENBQUMsTUFBUixHQUFpQixLQUFDLENBQUEsU0FBUyxDQUFDO01BREM7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTlCO0VBbEJVOzs7O0dBL0xzQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBUZXh0TGF5ZXIgZXh0ZW5kcyBMYXllclxuXHRcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0QGRvQXV0b1NpemUgPSBmYWxzZVxuXHRcdEBkb0F1dG9TaXplSGVpZ2h0ID0gZmFsc2Vcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBpZiBvcHRpb25zLnNldHVwIHRoZW4gXCJoc2xhKDYwLCA5MCUsIDQ3JSwgLjQpXCIgZWxzZSBcInRyYW5zcGFyZW50XCJcblx0XHRvcHRpb25zLmNvbG9yID89IFwicmVkXCJcblx0XHRvcHRpb25zLmxpbmVIZWlnaHQgPz0gMS4yNVxuXHRcdG9wdGlvbnMuZm9udEZhbWlseSA/PSBcIkhlbHZldGljYVwiXG5cdFx0b3B0aW9ucy5mb250U2l6ZSA/PSAyMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlVzZSBsYXllci50ZXh0IHRvIGFkZCB0ZXh0XCJcblx0XHRzdXBlciBvcHRpb25zXG5cdFx0QHN0eWxlLndoaXRlU3BhY2UgPSBcInByZS1saW5lXCIgIyBhbGxvdyBcXG4gaW4gLnRleHRcblx0XHRAc3R5bGUub3V0bGluZSA9IFwibm9uZVwiICMgbm8gYm9yZGVyIHdoZW4gc2VsZWN0ZWRcblx0XHRcblx0c2V0U3R5bGU6IChwcm9wZXJ0eSwgdmFsdWUsIHB4U3VmZml4ID0gZmFsc2UpIC0+XG5cdFx0QHN0eWxlW3Byb3BlcnR5XSA9IGlmIHB4U3VmZml4IHRoZW4gdmFsdWUrXCJweFwiIGVsc2UgdmFsdWVcblx0XHRAZW1pdChcImNoYW5nZToje3Byb3BlcnR5fVwiLCB2YWx1ZSlcblx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdFx0XG5cdGNhbGNTaXplOiAtPlxuXHRcdHNpemVBZmZlY3RpbmdTdHlsZXMgPVxuXHRcdFx0bGluZUhlaWdodDogQHN0eWxlW1wibGluZS1oZWlnaHRcIl1cblx0XHRcdGZvbnRTaXplOiBAc3R5bGVbXCJmb250LXNpemVcIl1cblx0XHRcdGZvbnRXZWlnaHQ6IEBzdHlsZVtcImZvbnQtd2VpZ2h0XCJdXG5cdFx0XHRwYWRkaW5nVG9wOiBAc3R5bGVbXCJwYWRkaW5nLXRvcFwiXVxuXHRcdFx0cGFkZGluZ1JpZ2h0OiBAc3R5bGVbXCJwYWRkaW5nLXJpZ2h0XCJdXG5cdFx0XHRwYWRkaW5nQm90dG9tOiBAc3R5bGVbXCJwYWRkaW5nLWJvdHRvbVwiXVxuXHRcdFx0cGFkZGluZ0xlZnQ6IEBzdHlsZVtcInBhZGRpbmctbGVmdFwiXVxuXHRcdFx0dGV4dFRyYW5zZm9ybTogQHN0eWxlW1widGV4dC10cmFuc2Zvcm1cIl1cblx0XHRcdGJvcmRlcldpZHRoOiBAc3R5bGVbXCJib3JkZXItd2lkdGhcIl1cblx0XHRcdGxldHRlclNwYWNpbmc6IEBzdHlsZVtcImxldHRlci1zcGFjaW5nXCJdXG5cdFx0XHRmb250RmFtaWx5OiBAc3R5bGVbXCJmb250LWZhbWlseVwiXVxuXHRcdFx0Zm9udFN0eWxlOiBAc3R5bGVbXCJmb250LXN0eWxlXCJdXG5cdFx0XHRmb250VmFyaWFudDogQHN0eWxlW1wiZm9udC12YXJpYW50XCJdXG5cdFx0Y29uc3RyYWludHMgPSB7fVxuXHRcdGlmIEBkb0F1dG9TaXplSGVpZ2h0IHRoZW4gY29uc3RyYWludHMud2lkdGggPSBAd2lkdGhcblx0XHRzaXplID0gVXRpbHMudGV4dFNpemUgQHRleHQsIHNpemVBZmZlY3RpbmdTdHlsZXMsIGNvbnN0cmFpbnRzXG5cdFx0aWYgQHN0eWxlLnRleHRBbGlnbiBpcyBcInJpZ2h0XCJcblx0XHRcdEB3aWR0aCA9IHNpemUud2lkdGhcblx0XHRcdEB4ID0gQHgtQHdpZHRoXG5cdFx0ZWxzZVxuXHRcdFx0QHdpZHRoID0gc2l6ZS53aWR0aFxuXHRcdEBoZWlnaHQgPSBzaXplLmhlaWdodFxuXG5cdEBkZWZpbmUgXCJhdXRvU2l6ZVwiLFxuXHRcdGdldDogLT4gQGRvQXV0b1NpemVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAZG9BdXRvU2l6ZSA9IHZhbHVlXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJhdXRvU2l6ZUhlaWdodFwiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBkb0F1dG9TaXplID0gdmFsdWVcblx0XHRcdEBkb0F1dG9TaXplSGVpZ2h0ID0gdmFsdWVcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImNvbnRlbnRFZGl0YWJsZVwiLFxuXHRcdHNldDogKGJvb2xlYW4pIC0+XG5cdFx0XHRAX2VsZW1lbnQuY29udGVudEVkaXRhYmxlID0gYm9vbGVhblxuXHRcdFx0QGlnbm9yZUV2ZW50cyA9ICFib29sZWFuXG5cdFx0XHRAb24gXCJpbnB1dFwiLCAtPiBAY2FsY1NpemUoKSBpZiBAZG9BdXRvU2l6ZVxuXHRAZGVmaW5lIFwidGV4dFwiLFxuXHRcdGdldDogLT4gQF9lbGVtZW50LnRleHRDb250ZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX2VsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6dGV4dFwiLCB2YWx1ZSlcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImZvbnRGYW1pbHlcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udEZhbWlseVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250RmFtaWx5XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFNpemVcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFNpemUucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFNpemVcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJsaW5lSGVpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmxpbmVIZWlnaHQgXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxpbmVIZWlnaHRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250V2VpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRXZWlnaHQgXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRXZWlnaHRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250U3R5bGVcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFN0eWxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRTdHlsZVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRWYXJpYW50XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRWYXJpYW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRWYXJpYW50XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1wiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdUb3BcIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nQm90dG9tXCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nVG9wXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdUb3AucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdSaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nUmlnaHQucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ1JpZ2h0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ0JvdHRvbVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nQm90dG9tLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nTGVmdFwiLFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdMZWZ0LnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdMZWZ0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwidGV4dEFsaWduXCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInRleHRBbGlnblwiLCB2YWx1ZSlcblx0QGRlZmluZSBcInRleHRUcmFuc2Zvcm1cIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUudGV4dFRyYW5zZm9ybSBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dFRyYW5zZm9ybVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImxldHRlclNwYWNpbmdcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUubGV0dGVyU3BhY2luZy5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJsZXR0ZXJTcGFjaW5nXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwibGVuZ3RoXCIsIFxuXHRcdGdldDogLT4gQHRleHQubGVuZ3RoXG5cbmNvbnZlcnRUb1RleHRMYXllciA9IChsYXllcikgLT5cblx0dCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRuYW1lOiBsYXllci5uYW1lXG5cdFx0ZnJhbWU6IGxheWVyLmZyYW1lXG5cdFx0cGFyZW50OiBsYXllci5wYXJlbnRcblx0XG5cdGNzc09iaiA9IHt9XG5cdGNzcyA9IGxheWVyLl9pbmZvLm1ldGFkYXRhLmNzc1xuXHRjc3MuZm9yRWFjaCAocnVsZSkgLT5cblx0XHRyZXR1cm4gaWYgXy5pbmNsdWRlcyBydWxlLCAnLyonXG5cdFx0YXJyID0gcnVsZS5zcGxpdCgnOiAnKVxuXHRcdGNzc09ialthcnJbMF1dID0gYXJyWzFdLnJlcGxhY2UoJzsnLCcnKVxuXHR0LnN0eWxlID0gY3NzT2JqXG5cdFxuXHRpbXBvcnRQYXRoID0gbGF5ZXIuX19mcmFtZXJJbXBvcnRlZEZyb21QYXRoXG5cdGlmIF8uaW5jbHVkZXMgaW1wb3J0UGF0aCwgJ0AyeCdcblx0XHR0LmZvbnRTaXplICo9IDJcblx0XHR0LmxpbmVIZWlnaHQgPSAocGFyc2VJbnQodC5saW5lSGVpZ2h0KSoyKSsncHgnXG5cdFx0dC5sZXR0ZXJTcGFjaW5nICo9IDJcblx0XHRcdFx0XHRcblx0dC55IC09IChwYXJzZUludCh0LmxpbmVIZWlnaHQpLXQuZm9udFNpemUpLzIgIyBjb21wZW5zYXRlIGZvciBob3cgQ1NTIGhhbmRsZXMgbGluZSBoZWlnaHRcblx0dC55IC09IHQuZm9udFNpemUgKiAwLjEgIyBza2V0Y2ggcGFkZGluZ1xuXHR0LnggLT0gdC5mb250U2l6ZSAqIDAuMDggIyBza2V0Y2ggcGFkZGluZ1xuXHR0LndpZHRoICs9IHQuZm9udFNpemUgKiAwLjUgIyBza2V0Y2ggcGFkZGluZ1xuXG5cdHQudGV4dCA9IGxheWVyLl9pbmZvLm1ldGFkYXRhLnN0cmluZ1xuXHRsYXllci5kZXN0cm95KClcblx0cmV0dXJuIHRcblxuTGF5ZXI6OmNvbnZlcnRUb1RleHRMYXllciA9IC0+IGNvbnZlcnRUb1RleHRMYXllcihAKVxuXG5jb252ZXJ0VGV4dExheWVycyA9IChvYmopIC0+XG5cdGZvciBwcm9wLGxheWVyIG9mIG9ialxuXHRcdGlmIGxheWVyLl9pbmZvLmtpbmQgaXMgXCJ0ZXh0XCJcblx0XHRcdG9ialtwcm9wXSA9IGNvbnZlcnRUb1RleHRMYXllcihsYXllcilcblxuIyBCYWNrd2FyZHMgY29tcGFiaWxpdHkuIFJlcGxhY2VkIGJ5IGNvbnZlcnRUb1RleHRMYXllcigpXG5MYXllcjo6ZnJhbWVBc1RleHRMYXllciA9IChwcm9wZXJ0aWVzKSAtPlxuICAgIHQgPSBuZXcgVGV4dExheWVyXG4gICAgdC5mcmFtZSA9IEBmcmFtZVxuICAgIHQuc3VwZXJMYXllciA9IEBzdXBlckxheWVyXG4gICAgXy5leHRlbmQgdCxwcm9wZXJ0aWVzXG4gICAgQGRlc3Ryb3koKVxuICAgIHRcblxuZXhwb3J0cy5UZXh0TGF5ZXIgPSBUZXh0TGF5ZXJcbmV4cG9ydHMuY29udmVydFRleHRMYXllcnMgPSBjb252ZXJ0VGV4dExheWVyc1xuIiwiXCJcIlwiXG5cblZSQ29tcG9uZW50IGNsYXNzXG5cbnByb3BlcnRpZXNcbi0gZnJvbnQgKHNldDogaW1hZ2VQYXRoIDxzdHJpbmc+LCBnZXQ6IGxheWVyKVxuLSByaWdodFxuLSBiYWNrXG4tIGxlZnRcbi0gdG9wXG4tIGJvdHRvbVxuLSBoZWFkaW5nIDxudW1iZXI+XG4tIGVsZXZhdGlvbiA8bnVtYmVyPlxuLSB0aWx0IDxudW1iZXI+IHJlYWRvbmx5XG5cbi0gb3JpZW50YXRpb25MYXllciA8Ym9vbD5cbi0gYXJyb3dLZXlzIDxib29sPlxuLSBsb29rQXRMYXRlc3RQcm9qZWN0ZWRMYXllciA8Ym9vbD5cblxubWV0aG9kc1xuLSBwcm9qZWN0TGF5ZXIobGF5ZXIpICMgaGVhZGluZyBhbmQgZWxldmF0aW9uIGFyZSBzZXQgYXMgcHJvcGVydGllcyBvbiB0aGUgbGF5ZXJcbi0gaGlkZUVudmlyb21lbnQoKVxuXG5ldmVudHNcbi0gRXZlbnRzLk9yaWVudGF0aW9uRGlkQ2hhbmdlLCAoZGF0YSB7aGVhZGluZywgZWxldmF0aW9uLCB0aWx0fSlcblxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuVlJMYXllciBjbGFzc1xuXG5wcm9wZXJ0aWVzXG4tIGhlYWRpbmcgPG51bWJlcj4gKGZyb20gMCB1cCB0byAzNjApXG4tIGVsZXZhdGlvbiA8bnVtYmVyPiAoZnJvbSAtOTAgZG93biB0byA5MCB1cClcblxuXCJcIlwiXG5cblNJREVTID0gW1xuXHRcIm5vcnRoXCIsIFxuXHRcImZyb250XCIsIFxuXHRcImVhc3RcIixcblx0XCJyaWdodFwiLCBcblx0XCJzb3V0aFwiLCBcblx0XCJiYWNrXCIsIFxuXHRcIndlc3RcIiwgXG5cdFwibGVmdFwiLCBcblx0XCJ0b3BcIiwgXG5cdFwiYm90dG9tXCIsIFxuXVxuXG5LRVlTID0ge1xuXHRMZWZ0QXJyb3c6IDM3XG5cdFVwQXJyb3c6IDM4XG5cdFJpZ2h0QXJyb3c6IDM5XG5cdERvd25BcnJvdzogNDBcbn1cblxuS0VZU0RPV04gPSB7XG5cdGxlZnQ6IGZhbHNlXG5cdHVwOiBmYWxzZVxuXHRyaWdodDogZmFsc2Vcblx0ZG93bjogZmFsc2Vcbn1cblxuRXZlbnRzLk9yaWVudGF0aW9uRGlkQ2hhbmdlID0gXCJvcmllbnRhdGlvbmRpZGNoYW5nZVwiXG5cbmNsYXNzIFZSQW5jaG9yTGF5ZXIgZXh0ZW5kcyBMYXllclxuXG5cdGNvbnN0cnVjdG9yOiAobGF5ZXIsIGN1YmVTaWRlKSAtPlxuXHRcdHN1cGVyIHVuZGVmaW5lZFxuXHRcdEB3aWR0aCA9IDBcblx0XHRAaGVpZ2h0ID0gMFxuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAbmFtZSA9IFwiYW5jaG9yXCJcblx0XHRAY3ViZVNpZGUgPSBjdWJlU2lkZVxuXG5cdFx0QGxheWVyID0gbGF5ZXJcblx0XHRsYXllci5zdXBlckxheWVyID0gQFxuXHRcdGxheWVyLmNlbnRlcigpXG5cblx0XHRsYXllci5vbiBcImNoYW5nZTpvcmllbnRhdGlvblwiLCAobmV3VmFsdWUsIGxheWVyKSA9PlxuXHRcdFx0QHVwZGF0ZVBvc2l0aW9uKGxheWVyKVxuXHRcdEB1cGRhdGVQb3NpdGlvbihsYXllcilcblxuXHRcdGxheWVyLl9jb250ZXh0Lm9uIFwibGF5ZXI6ZGVzdHJveVwiLCAobGF5ZXIpID0+XG5cdFx0XHRpZiBsYXllciA9PSBAbGF5ZXJcblx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cdHVwZGF0ZVBvc2l0aW9uOiAobGF5ZXIpIC0+XG5cdFx0aGFsZkN1YlNpZGUgPSBAY3ViZVNpZGUvMlxuXHRcdEBzdHlsZVtcIndlYmtpdFRyYW5zZm9ybVwiXSA9IFwidHJhbnNsYXRlWCgjeyhAY3ViZVNpZGUgLSBAd2lkdGgpLzJ9cHgpIHRyYW5zbGF0ZVkoI3soQGN1YmVTaWRlIC0gQGhlaWdodCkvMn1weCkgcm90YXRlWigje2xheWVyLmhlYWRpbmd9ZGVnKSByb3RhdGVYKCN7OTAtbGF5ZXIuZWxldmF0aW9ufWRlZykgdHJhbnNsYXRlWigje2xheWVyLmRpc3RhbmNlfXB4KSByb3RhdGVYKDE4MGRlZylcIlxuXG5jbGFzcyBleHBvcnRzLlZSTGF5ZXIgZXh0ZW5kcyBMYXllclxuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMgPSBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRoZWFkaW5nOiAwXG5cdFx0XHRlbGV2YXRpb246IDBcblx0XHRzdXBlciBvcHRpb25zXG5cblx0QGRlZmluZSBcImhlYWRpbmdcIixcblx0XHRnZXQ6IC0+IEBfaGVhZGluZ1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0aWYgdmFsdWUgPj0gMzYwXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUgJSAzNjBcblx0XHRcdGVsc2UgaWYgdmFsdWUgPCAwXG5cdFx0XHRcdHJlc3QgPSBNYXRoLmFicyh2YWx1ZSkgJSAzNjBcblx0XHRcdFx0dmFsdWUgPSAzNjAgLSByZXN0XG5cdFx0XHRpZiBAX2hlYWRpbmcgIT0gdmFsdWVcblx0XHRcdFx0QF9oZWFkaW5nID0gdmFsdWVcblx0XHRcdFx0QGVtaXQoXCJjaGFuZ2U6aGVhZGluZ1wiLCB2YWx1ZSlcblx0XHRcdFx0QGVtaXQoXCJjaGFuZ2U6b3JpZW50YXRpb25cIiwgdmFsdWUpXG5cblx0QGRlZmluZSBcImVsZXZhdGlvblwiLFxuXHRcdGdldDogLT4gQF9lbGV2YXRpb25cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdHZhbHVlID0gVXRpbHMuY2xhbXAodmFsdWUsIC05MCwgOTApXG5cdFx0XHRpZiB2YWx1ZSAhPSBAX2VsZXZhdGlvblxuXHRcdFx0XHRAX2VsZXZhdGlvbiA9IHZhbHVlXG5cdFx0XHRcdEBlbWl0KFwiY2hhbmdlOmVsZXZhdGlvblwiLCB2YWx1ZSlcblx0XHRcdFx0QGVtaXQoXCJjaGFuZ2U6b3JpZW50YXRpb25cIiwgdmFsdWUpXG5cblx0QGRlZmluZSBcImRpc3RhbmNlXCIsXG5cdFx0Z2V0OiAtPiBAX2Rpc3RhbmNlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiB2YWx1ZSAhPSBAX2Rpc3RhbmNlXG5cdFx0XHRcdEBfZGlzdGFuY2UgPSB2YWx1ZVxuXHRcdFx0XHRAZW1pdChcImNoYW5nZTpkaXN0YW5jZVwiLCB2YWx1ZSlcblx0XHRcdFx0QGVtaXQoXCJjaGFuZ2U6b3JpZW50YXRpb25cIiwgdmFsdWUpXG5cbmNsYXNzIGV4cG9ydHMuVlJDb21wb25lbnQgZXh0ZW5kcyBMYXllclxuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMgPSBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRjdWJlU2lkZTogMzAwMFxuXHRcdFx0cGVyc3BlY3RpdmU6IDEyMDBcblx0XHRcdGxvb2tBdExhdGVzdFByb2plY3RlZExheWVyOiBmYWxzZVxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHRvcmllbnRhdGlvbkxheWVyOiB0cnVlXG5cdFx0XHRhcnJvd0tleXM6IHRydWVcblx0XHRzdXBlciBvcHRpb25zXG5cdFx0QHBlcnNwZWN0aXZlID0gb3B0aW9ucy5wZXJzcGVjdGl2ZVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0QGNyZWF0ZUN1YmUob3B0aW9ucy5jdWJlU2lkZSlcblx0XHRAZGVnVG9SYWQgPSBNYXRoLlBJIC8gMTgwXG5cdFx0QGxheWVyc1RvS2VlcExldmVsID0gW11cblx0XHRAbG9va0F0TGF0ZXN0UHJvamVjdGVkTGF5ZXIgPSBvcHRpb25zLmxvb2tBdExhdGVzdFByb2plY3RlZExheWVyXG5cdFx0QGFycm93S2V5cyA9IG9wdGlvbnMuYXJyb3dLZXlzXG5cdFx0QF9rZXlzKClcblxuXHRcdEBfaGVhZGluZyA9IDBcblx0XHRAX2VsZXZhdGlvbiA9IDBcblx0XHRAX3RpbHQgPSAwXG5cblx0XHRAX2hlYWRpbmdPZmZzZXQgPSAwXG5cdFx0QF9lbGV2YXRpb25PZmZzZXQgPSAwXG5cdFx0QF9kZXZpY2VIZWFkaW5nID0gMFxuXHRcdEBfZGV2aWNlRWxldmF0aW9uID0gMFxuXG5cdFx0aWYgb3B0aW9ucy5oZWFkaW5nXG5cdFx0XHRAaGVhZGluZyA9IG9wdGlvbnMuaGVhZGluZ1xuXHRcdGlmIG9wdGlvbnMuZWxldmF0aW9uXG5cdFx0XHRAZWxldmF0aW9uID0gb3B0aW9ucy5lbGV2YXRpb25cblxuXHRcdEBvcmllbnRhdGlvbkxheWVyID0gb3B0aW9ucy5vcmllbnRhdGlvbkxheWVyXG5cblx0XHRAZGVza3RvcFBhbigwLCAwKVxuXG5cdFx0IyB0aWx0aW5nIGFuZCBwYW5uaW5nXG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKVxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJkZXZpY2VvcmllbnRhdGlvblwiLCAoZXZlbnQpID0+XG5cdFx0XHRcdEBvcmllbnRhdGlvbkRhdGEgPSBldmVudFxuXG5cdFx0RnJhbWVyLkxvb3Aub24oXCJ1cGRhdGVcIiwgQGRldmljZU9yaWVudGF0aW9uVXBkYXRlKVxuXG5cdFx0IyBNYWtlIHN1cmUgd2UgcmVtb3ZlIHRoZSB1cGRhdGUgZnJvbSB0aGUgbG9vcCB3aGVuIHdlIGRlc3Ryb3kgdGhlIGNvbnRleHRcblx0XHRGcmFtZXIuQ3VycmVudENvbnRleHQub24gXCJyZXNldFwiLCAtPlxuXHRcdFx0RnJhbWVyLkxvb3Aub2ZmKFwidXBkYXRlXCIsIEBkZXZpY2VPcmllbnRhdGlvblVwZGF0ZSlcblxuXHRcdEBvbiBcImNoYW5nZTpmcmFtZVwiLCAtPlxuXHRcdFx0QGRlc2t0b3BQYW4oMCwwKVxuXG5cblx0X2tleXM6IC0+XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgKGV2ZW50KSA9PlxuXHRcdFx0aWYgQGFycm93S2V5c1xuXHRcdFx0XHRzd2l0Y2ggZXZlbnQud2hpY2hcblx0XHRcdFx0XHR3aGVuIEtFWVMuVXBBcnJvd1xuXHRcdFx0XHRcdFx0S0VZU0RPV04udXAgPSB0cnVlXG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0d2hlbiBLRVlTLkRvd25BcnJvd1xuXHRcdFx0XHRcdFx0S0VZU0RPV04uZG93biA9IHRydWVcblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHR3aGVuIEtFWVMuTGVmdEFycm93XG5cdFx0XHRcdFx0XHRLRVlTRE9XTi5sZWZ0ID0gdHJ1ZVxuXHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdHdoZW4gS0VZUy5SaWdodEFycm93XG5cdFx0XHRcdFx0XHRLRVlTRE9XTi5yaWdodCA9IHRydWVcblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXl1cFwiLCAoZXZlbnQpID0+XG5cdFx0XHRpZiBAYXJyb3dLZXlzXG5cdFx0XHRcdHN3aXRjaCBldmVudC53aGljaFxuXHRcdFx0XHRcdHdoZW4gS0VZUy5VcEFycm93XG5cdFx0XHRcdFx0XHRLRVlTRE9XTi51cCA9IGZhbHNlXG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0d2hlbiBLRVlTLkRvd25BcnJvd1xuXHRcdFx0XHRcdFx0S0VZU0RPV04uZG93biA9IGZhbHNlXG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0d2hlbiBLRVlTLkxlZnRBcnJvd1xuXHRcdFx0XHRcdFx0S0VZU0RPV04ubGVmdCA9IGZhbHNlXG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0d2hlbiBLRVlTLlJpZ2h0QXJyb3dcblx0XHRcdFx0XHRcdEtFWVNET1dOLnJpZ2h0ID0gZmFsc2Vcblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdHdpbmRvdy5vbmJsdXIgPSAtPlxuXHRcdFx0S0VZU0RPV04udXAgPSBmYWxzZVxuXHRcdFx0S0VZU0RPV04uZG93biA9IGZhbHNlXG5cdFx0XHRLRVlTRE9XTi5sZWZ0ID0gZmFsc2Vcblx0XHRcdEtFWVNET1dOLnJpZ2h0ID0gZmFsc2VcblxuXHRAZGVmaW5lIFwib3JpZW50YXRpb25MYXllclwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBkZXNrdG9wT3JpZW50YXRpb25MYXllciAhPSBudWxsICYmIEBkZXNrdG9wT3JpZW50YXRpb25MYXllciAhPSB1bmRlZmluZWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmIEB3b3JsZCAhPSB1bmRlZmluZWRcblx0XHRcdFx0aWYgVXRpbHMuaXNEZXNrdG9wKClcblx0XHRcdFx0XHRpZiB2YWx1ZSA9PSB0cnVlXG5cdFx0XHRcdFx0XHRAYWRkRGVza3RvcFBhbkxheWVyKClcblx0XHRcdFx0XHRlbHNlIGlmIHZhbHVlID09IGZhbHNlXG5cdFx0XHRcdFx0XHRAcmVtb3ZlRGVza3RvcFBhbkxheWVyKClcblxuXHRAZGVmaW5lIFwiaGVhZGluZ1wiLFxuXHRcdGdldDogLT5cblx0XHRcdGhlYWRpbmcgPSBAX2hlYWRpbmcgKyBAX2hlYWRpbmdPZmZzZXRcblx0XHRcdGlmIGhlYWRpbmcgPiAzNjBcblx0XHRcdFx0aGVhZGluZyA9IGhlYWRpbmcgJSAzNjBcblx0XHRcdGVsc2UgaWYgaGVhZGluZyA8IDBcblx0XHRcdFx0cmVzdCA9IE1hdGguYWJzKGhlYWRpbmcpICUgMzYwXG5cdFx0XHRcdGhlYWRpbmcgPSAzNjAgLSByZXN0XG5cdFx0XHRyZXR1cm4gaGVhZGluZ1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QGxvb2tBdCh2YWx1ZSwgQF9lbGV2YXRpb24pXG5cblx0QGRlZmluZSBcImVsZXZhdGlvblwiLFxuXHRcdGdldDogLT4gQF9lbGV2YXRpb25cblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQGxvb2tBdChAX2hlYWRpbmcsIHZhbHVlKVxuXG5cdEBkZWZpbmUgXCJ0aWx0XCIsXG5cdFx0Z2V0OiAtPiBAX3RpbHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gdGhyb3cgXCJUaWx0IGlzIHJlYWRvbmx5XCJcblxuXHRTSURFUy5tYXAgKGZhY2UpID0+XG5cdFx0QGRlZmluZSBmYWNlLFxuXHRcdFx0Z2V0OiAtPiBAbGF5ZXJGcm9tRmFjZShmYWNlKSAjIEBnZXRJbWFnZShmYWNlKVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRJbWFnZShmYWNlLCB2YWx1ZSlcblxuXHRjcmVhdGVDdWJlOiAoY3ViZVNpZGUgPSBAY3ViZVNpZGUpID0+XG5cdFx0QGN1YmVTaWRlID0gY3ViZVNpZGVcblxuXHRcdEB3b3JsZD8uZGVzdHJveSgpXG5cdFx0QHdvcmxkID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIndvcmxkXCJcblx0XHRcdHN1cGVyTGF5ZXI6IEBcblx0XHRcdHdpZHRoOiBjdWJlU2lkZSwgaGVpZ2h0OiBjdWJlU2lkZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjbGlwOiBmYWxzZVxuXHRcdEB3b3JsZC5zdHlsZS53ZWJraXRUcmFuc2Zvcm1TdHlsZSA9IFwicHJlc2VydmUtM2RcIlxuXHRcdEB3b3JsZC5jZW50ZXIoKVxuXG5cdFx0aGFsZkN1YlNpZGUgPSBAY3ViZVNpZGUvMlxuXG5cdFx0QHNpZGUwID0gbmV3IExheWVyXG5cdFx0QHNpZGUwLnN0eWxlW1wid2Via2l0VHJhbnNmb3JtXCJdID0gXCJyb3RhdGVYKC05MGRlZykgdHJhbnNsYXRlWigtI3toYWxmQ3ViU2lkZX1weClcIlxuXHRcdEBzaWRlMSA9IG5ldyBMYXllclxuXHRcdEBzaWRlMS5zdHlsZVtcIndlYmtpdFRyYW5zZm9ybVwiXSA9IFwicm90YXRlWSgtOTBkZWcpIHRyYW5zbGF0ZVooLSN7aGFsZkN1YlNpZGV9cHgpIHJvdGF0ZVooOTBkZWcpXCJcblx0XHRAc2lkZTIgPSBuZXcgTGF5ZXJcblx0XHRAc2lkZTIuc3R5bGVbXCJ3ZWJraXRUcmFuc2Zvcm1cIl0gPSBcInJvdGF0ZVgoOTBkZWcpIHRyYW5zbGF0ZVooLSN7aGFsZkN1YlNpZGV9cHgpIHJvdGF0ZVooMTgwZGVnKVwiXG5cdFx0QHNpZGUzID0gbmV3IExheWVyXG5cdFx0QHNpZGUzLnN0eWxlW1wid2Via2l0VHJhbnNmb3JtXCJdID0gXCJyb3RhdGVZKDkwZGVnKSB0cmFuc2xhdGVaKC0je2hhbGZDdWJTaWRlfXB4KSByb3RhdGVaKC05MGRlZylcIlxuXHRcdEBzaWRlNCA9IG5ldyBMYXllclxuXHRcdEBzaWRlNC5zdHlsZVtcIndlYmtpdFRyYW5zZm9ybVwiXSA9IFwicm90YXRlWSgtMTgwZGVnKSB0cmFuc2xhdGVaKC0je2hhbGZDdWJTaWRlfXB4KSByb3RhdGVaKDE4MGRlZylcIlxuXHRcdEBzaWRlNSA9IG5ldyBMYXllclxuXHRcdEBzaWRlNS5zdHlsZVtcIndlYmtpdFRyYW5zZm9ybVwiXSA9IFwidHJhbnNsYXRlWigtI3toYWxmQ3ViU2lkZX1weClcIlxuXG5cdFx0QHNpZGVzID0gW0BzaWRlMCwgQHNpZGUxLCBAc2lkZTIsIEBzaWRlMywgQHNpZGU0LCBAc2lkZTVdXG5cdFx0Y29sb3JzID0gW1wiIzg2NmNjY1wiLCBcIiMyOGFmZmFcIiwgXCIjMmRkN2FhXCIsIFwiI2ZmYzIyY1wiLCBcIiM3ZGRkMTFcIiwgXCIjZjk1ZmFhXCJdXG5cdFx0c2lkZU5hbWVzID0gW1wiZnJvbnRcIiwgXCJyaWdodFwiLCBcImJhY2tcIiwgXCJsZWZ0XCIsIFwidG9wXCIsIFwiYm90dG9tXCJdXG5cblx0XHRpbmRleCA9IDBcblx0XHRmb3Igc2lkZSBpbiBAc2lkZXNcblx0XHRcdHNpZGUubmFtZSA9IHNpZGVOYW1lc1tpbmRleF1cblx0XHRcdHNpZGUud2lkdGggPSBzaWRlLmhlaWdodCA9IGN1YmVTaWRlXG5cdFx0XHRzaWRlLnN1cGVyTGF5ZXIgPSBAd29ybGRcblx0XHRcdHNpZGUuaHRtbCA9IHNpZGVOYW1lc1tpbmRleF1cblx0XHRcdHNpZGUuY29sb3IgPSBcIndoaXRlXCJcblx0XHRcdHNpZGUuX2JhY2tncm91bmRDb2xvciA9IGNvbG9yc1tpbmRleF1cblx0XHRcdHNpZGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JzW2luZGV4XVxuXHRcdFx0c2lkZS5zdHlsZSA9XG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiI3tjdWJlU2lkZX1weFwiXG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRmb250U2l6ZTogXCIje2N1YmVTaWRlIC8gMTB9cHhcIlxuXHRcdFx0XHRmb250V2VpZ2h0OiBcIjEwMFwiXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiSGVsdmV0aWNhIE5ldWVcIlxuXHRcdFx0aW5kZXgrK1xuXG5cdFx0aWYgQHNpZGVJbWFnZXNcblx0XHRcdGZvciBrZXkgb2YgQHNpZGVJbWFnZXNcblx0XHRcdFx0QHNldEltYWdlIGtleSwgQHNpZGVJbWFnZXNba2V5XVxuXG5cdGhpZGVFbnZpcm9tZW50OiAtPlxuXHRcdGZvciBzaWRlIGluIEBzaWRlc1xuXHRcdFx0c2lkZS5kZXN0cm95KClcblxuXHRsYXllckZyb21GYWNlOiAoZmFjZSkgLT5cblx0XHRtYXAgPVxuXHRcdFx0bm9ydGg6IEBzaWRlMFxuXHRcdFx0ZnJvbnQ6IEBzaWRlMFxuXHRcdFx0ZWFzdDogIEBzaWRlMVxuXHRcdFx0cmlnaHQ6IEBzaWRlMVxuXHRcdFx0c291dGg6IEBzaWRlMlxuXHRcdFx0YmFjazogIEBzaWRlMlxuXHRcdFx0d2VzdDogIEBzaWRlM1xuXHRcdFx0bGVmdDogIEBzaWRlM1xuXHRcdFx0dG9wOiAgIEBzaWRlNFxuXHRcdFx0Ym90dG9tOkBzaWRlNVxuXHRcdHJldHVybiBtYXBbZmFjZV1cblxuXHRzZXRJbWFnZTogKGZhY2UsIGltYWdlUGF0aCkgLT5cblx0XHRcblx0XHRpZiBub3QgZmFjZSBpbiBTSURFU1xuXHRcdFx0dGhyb3cgRXJyb3IgXCJWUkNvbXBvbmVudCBzZXRJbWFnZSwgd3JvbmcgbmFtZSBmb3IgZmFjZTogXCIgKyBmYWNlICsgXCIsIHZhbGlkIG9wdGlvbnM6IGZyb250LCByaWdodCwgYmFjaywgbGVmdCwgdG9wLCBib3R0b20sIG5vcnRoLCBlYXN0LCBzb3V0aCwgd2VzdFwiXG5cblx0XHRpZiBub3QgQHNpZGVJbWFnZXNcblx0XHRcdEBzaWRlSW1hZ2VzID0ge31cblx0XHRAc2lkZUltYWdlc1tmYWNlXSA9IGltYWdlUGF0aFxuXG5cdFx0bGF5ZXIgPSBAbGF5ZXJGcm9tRmFjZShmYWNlKVxuXHRcdFxuXHRcdGlmIGltYWdlUGF0aFxuXHRcdFx0bGF5ZXI/Lmh0bWwgPSBcIlwiXG5cdFx0XHRsYXllcj8uaW1hZ2UgPSBpbWFnZVBhdGhcblx0XHRlbHNlXG5cdFx0XHRsYXllcj8uaHRtbCA9IGxheWVyPy5uYW1lXG5cdFx0XHRsYXllcj8uYmFja2dyb3VuZENvbG9yID0gbGF5ZXI/Ll9iYWNrZ3JvdW5kQ29sb3JcblxuXHRnZXRJbWFnZTogKGZhY2UpIC0+XG5cblx0XHRpZiBub3QgZmFjZSBpbiBTSURFU1xuXHRcdFx0dGhyb3cgRXJyb3IgXCJWUkNvbXBvbmVudCBnZXRJbWFnZSwgd3JvbmcgbmFtZSBmb3IgZmFjZTogXCIgKyBmYWNlICsgXCIsIHZhbGlkIG9wdGlvbnM6IGZyb250LCByaWdodCwgYmFjaywgbGVmdCwgdG9wLCBib3R0b20sIG5vcnRoLCBlYXN0LCBzb3V0aCwgd2VzdFwiXG5cblx0XHRsYXllciA9IEBsYXllckZyb21GYWNlKGZhY2UpXG5cdFx0aWYgbGF5ZXJcblx0XHRcdGxheWVyLmltYWdlXG5cblx0cHJvamVjdExheWVyOiAoaW5zZXJ0TGF5ZXIpIC0+XG5cblx0XHRoZWFkaW5nID0gaW5zZXJ0TGF5ZXIuaGVhZGluZ1xuXHRcdGlmIGhlYWRpbmcgPT0gdW5kZWZpbmVkXG5cdFx0XHRoZWFkaW5nID0gMFxuXHRcdGVsZXZhdGlvbiA9IGluc2VydExheWVyLmVsZXZhdGlvblxuXHRcdGlmIGVsZXZhdGlvbiA9PSB1bmRlZmluZWRcblx0XHRcdGVsZXZhdGlvbiA9IDBcblxuXHRcdGlmIGhlYWRpbmcgPj0gMzYwXG5cdFx0XHRoZWFkaW5nID0gdmFsdWUgJSAzNjBcblx0XHRlbHNlIGlmIGhlYWRpbmcgPCAwXG5cdFx0XHRyZXN0ID0gTWF0aC5hYnMoaGVhZGluZykgJSAzNjBcblx0XHRcdGhlYWRpbmcgPSAzNjAgLSByZXN0XG5cblx0XHRlbGV2YXRpb24gPSBVdGlscy5jbGFtcChlbGV2YXRpb24sIC05MCwgOTApXG5cblx0XHRkaXN0YW5jZSA9IGluc2VydExheWVyLmRpc3RhbmNlXG5cdFx0aWYgZGlzdGFuY2UgPT0gdW5kZWZpbmVkXG5cdFx0XHRkaXN0YW5jZSA9IDEyMDBcblxuXHRcdGluc2VydExheWVyLmhlYWRpbmcgPSBoZWFkaW5nXG5cdFx0aW5zZXJ0TGF5ZXIuZWxldmF0aW9uID0gZWxldmF0aW9uXG5cdFx0aW5zZXJ0TGF5ZXIuZGlzdGFuY2UgPSBkaXN0YW5jZVxuXG5cdFx0YW5jaG9yID0gbmV3IFZSQW5jaG9yTGF5ZXIoaW5zZXJ0TGF5ZXIsIEBjdWJlU2lkZSlcblx0XHRhbmNob3Iuc3VwZXJMYXllciA9IEB3b3JsZFxuXG5cdFx0aWYgQGxvb2tBdExhdGVzdFByb2plY3RlZExheWVyXG5cdFx0XHRAbG9va0F0KGhlYWRpbmcsIGVsZXZhdGlvbilcblxuXHQjIE1vYmlsZSBkZXZpY2Ugb3JpZW50YXRpb25cblxuXHRkZXZpY2VPcmllbnRhdGlvblVwZGF0ZTogPT5cblxuXHRcdGlmIFV0aWxzLmlzRGVza3RvcCgpXG5cdFx0XHRpZiBAYXJyb3dLZXlzXG5cdFx0XHRcdGlmIEBfbGFzdENhbGxIb3Jpem9udGFsID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdEBfbGFzdENhbGxIb3Jpem9udGFsID0gMFxuXHRcdFx0XHRcdEBfbGFzdENhbGxWZXJ0aWNhbCA9IDBcblx0XHRcdFx0XHRAX2FjY2VsZXJhdGlvbkhvcml6b250YWwgPSAxXG5cdFx0XHRcdFx0QF9hY2NlbGVyYXRpb25WZXJ0aWNhbCA9IDFcblx0XHRcdFx0XHRAX2dvaW5nVXAgPSBmYWxzZVxuXHRcdFx0XHRcdEBfZ29pbmdMZWZ0ID0gZmFsc2VcblxuXHRcdFx0XHRkYXRlID0gbmV3IERhdGUoKVxuXHRcdFx0XHR4ID0gLjFcblx0XHRcdFx0aWYgS0VZU0RPV04udXAgfHwgS0VZU0RPV04uZG93blxuXHRcdFx0XHRcdGRpZmYgPSBkYXRlIC0gQF9sYXN0Q2FsbFZlcnRpY2FsXG5cdFx0XHRcdFx0aWYgZGlmZiA8IDMwXG5cdFx0XHRcdFx0XHRpZiBAX2FjY2VsZXJhdGlvblZlcnRpY2FsIDwgMzBcblx0XHRcdFx0XHRcdFx0QF9hY2NlbGVyYXRpb25WZXJ0aWNhbCArPSAwLjE4XG5cdFx0XHRcdFx0aWYgS0VZU0RPV04udXBcblx0XHRcdFx0XHRcdGlmIEBfZ29pbmdVcCA9PSBmYWxzZVxuXHRcdFx0XHRcdFx0XHRAX2FjY2VsZXJhdGlvblZlcnRpY2FsID0gMVxuXHRcdFx0XHRcdFx0XHRAX2dvaW5nVXAgPSB0cnVlXG5cdFx0XHRcdFx0XHRAZGVza3RvcFBhbigwLCAxICogQF9hY2NlbGVyYXRpb25WZXJ0aWNhbCAqIHgpXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0aWYgQF9nb2luZ1VwID09IHRydWVcblx0XHRcdFx0XHRcdFx0QF9hY2NlbGVyYXRpb25WZXJ0aWNhbCA9IDFcblx0XHRcdFx0XHRcdFx0QF9nb2luZ1VwID0gZmFsc2Vcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0QGRlc2t0b3BQYW4oMCwgLTEgKiBAX2FjY2VsZXJhdGlvblZlcnRpY2FsICogeClcblx0XHRcdFx0XHRAX2xhc3RDYWxsVmVydGljYWwgPSBkYXRlXG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEBfYWNjZWxlcmF0aW9uVmVydGljYWwgPSAxXG5cblx0XHRcdFx0aWYgS0VZU0RPV04ubGVmdCB8fCBLRVlTRE9XTi5yaWdodFxuXHRcdFx0XHRcdGRpZmYgPSBkYXRlIC0gQF9sYXN0Q2FsbEhvcml6b250YWxcblx0XHRcdFx0XHRpZiBkaWZmIDwgMzBcblx0XHRcdFx0XHRcdGlmIEBfYWNjZWxlcmF0aW9uSG9yaXpvbnRhbCA8IDI1XG5cdFx0XHRcdFx0XHRcdEBfYWNjZWxlcmF0aW9uSG9yaXpvbnRhbCArPSAwLjE4XG5cdFx0XHRcdFx0aWYgS0VZU0RPV04ubGVmdFxuXHRcdFx0XHRcdFx0aWYgQF9nb2luZ0xlZnQgPT0gZmFsc2Vcblx0XHRcdFx0XHRcdFx0QF9hY2NlbGVyYXRpb25Ib3Jpem9udGFsID0gMVxuXHRcdFx0XHRcdFx0XHRAX2dvaW5nTGVmdCA9IHRydWVcblx0XHRcdFx0XHRcdEBkZXNrdG9wUGFuKDEgKiBAX2FjY2VsZXJhdGlvbkhvcml6b250YWwgKiB4LCAwKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGlmIEBfZ29pbmdMZWZ0ID09IHRydWVcblx0XHRcdFx0XHRcdFx0QF9hY2NlbGVyYXRpb25Ib3Jpem9udGFsID0gMVxuXHRcdFx0XHRcdFx0XHRAX2dvaW5nTGVmdCA9IGZhbHNlXG5cdFx0XHRcdFx0XHRAZGVza3RvcFBhbigtMSAqIEBfYWNjZWxlcmF0aW9uSG9yaXpvbnRhbCAqIHgsIDApXG5cdFx0XHRcdFx0QF9sYXN0Q2FsbEhvcml6b250YWwgPSBkYXRlXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRAX2FjY2VsZXJhdGlvbkhvcml6b250YWwgPSAxXG5cblx0XHRlbHNlIGlmIEBvcmllbnRhdGlvbkRhdGFcblxuXHRcdFx0YWxwaGEgPSBAb3JpZW50YXRpb25EYXRhLmFscGhhXG5cdFx0XHRiZXRhID0gQG9yaWVudGF0aW9uRGF0YS5iZXRhXG5cdFx0XHRnYW1tYSA9IEBvcmllbnRhdGlvbkRhdGEuZ2FtbWFcblxuXHRcdFx0aWYgYWxwaGEgIT0gMCAmJiBiZXRhICE9IDAgJiYgZ2FtbWEgIT0gMFxuXHRcdFx0XHRAZGlyZWN0aW9uUGFyYW1zKGFscGhhLCBiZXRhLCBnYW1tYSlcblxuXHRcdFx0eEFuZ2xlID0gYmV0YVxuXHRcdFx0eUFuZ2xlID0gLWdhbW1hXG5cdFx0XHR6QW5nbGUgPSBhbHBoYVxuXG5cdFx0XHRoYWxmQ3ViU2lkZSA9IEBjdWJlU2lkZS8yXG5cdFx0XHRvcmllbnRhdGlvbiA9IFwicm90YXRlKCN7d2luZG93Lm9yaWVudGF0aW9uICogLTF9ZGVnKSBcIlxuXHRcdFx0dHJhbnNsYXRpb25YID0gXCJ0cmFuc2xhdGVYKCN7KEB3aWR0aCAvIDIpIC0gaGFsZkN1YlNpZGV9cHgpXCJcblx0XHRcdHRyYW5zbGF0aW9uWSA9IFwiIHRyYW5zbGF0ZVkoI3soQGhlaWdodCAvIDIpIC0gaGFsZkN1YlNpZGV9cHgpXCJcblx0XHRcdHRyYW5zbGF0aW9uWiA9IFwiIHRyYW5zbGF0ZVooI3tAcGVyc3BlY3RpdmV9cHgpXCJcblx0XHRcdHJvdGF0aW9uID0gdHJhbnNsYXRpb25aICsgdHJhbnNsYXRpb25YICsgdHJhbnNsYXRpb25ZICsgb3JpZW50YXRpb24gKyBcIiByb3RhdGVZKCN7eUFuZ2xlfWRlZykgcm90YXRlWCgje3hBbmdsZX1kZWcpIHJvdGF0ZVooI3t6QW5nbGV9ZGVnKVwiICsgXCIgcm90YXRlWigjey1AX2hlYWRpbmdPZmZzZXR9ZGVnKVwiXG5cdFx0XHRAd29ybGQuc3R5bGVbXCJ3ZWJraXRUcmFuc2Zvcm1cIl0gPSByb3RhdGlvblxuXG5cdGRpcmVjdGlvblBhcmFtczogKGFscGhhLCBiZXRhLCBnYW1tYSkgLT5cblxuXHRcdGFscGhhUmFkID0gYWxwaGEgKiBAZGVnVG9SYWRcblx0XHRiZXRhUmFkID0gYmV0YSAqIEBkZWdUb1JhZFxuXHRcdGdhbW1hUmFkID0gZ2FtbWEgKiBAZGVnVG9SYWRcblxuXHRcdCMgQ2FsY3VsYXRlIGVxdWF0aW9uIGNvbXBvbmVudHNcblx0XHRjQSA9IE1hdGguY29zKGFscGhhUmFkKVxuXHRcdHNBID0gTWF0aC5zaW4oYWxwaGFSYWQpXG5cdFx0Y0IgPSBNYXRoLmNvcyhiZXRhUmFkKVxuXHRcdHNCID0gTWF0aC5zaW4oYmV0YVJhZClcblx0XHRjRyA9IE1hdGguY29zKGdhbW1hUmFkKVxuXHRcdHNHID0gTWF0aC5zaW4oZ2FtbWFSYWQpXG5cblx0XHQjIHggdW5pdHZlY3RvclxuXHRcdHhyQSA9IC1zQSAqIHNCICogc0cgKyBjQSAqIGNHXG5cdFx0eHJCID0gY0EgKiBzQiAqIHNHICsgc0EgKiBjR1xuXHRcdHhyQyA9IGNCICogc0dcblxuXHRcdCMgeSB1bml0dmVjdG9yXG5cdFx0eXJBID0gLXNBICogY0Jcblx0XHR5ckIgPSBjQSAqIGNCXG5cdFx0eXJDID0gLXNCXG5cblx0XHQjIC16IHVuaXR2ZWN0b3Jcblx0XHR6ckEgPSAtc0EgKiBzQiAqIGNHIC0gY0EgKiBzR1xuXHRcdHpyQiA9IGNBICogc0IgKiBjRyAtIHNBICogc0dcblx0XHR6ckMgPSBjQiAqIGNHXG5cblx0XHQjIENhbGN1bGF0ZSBoZWFkaW5nXG5cdFx0aGVhZGluZyA9IE1hdGguYXRhbih6ckEgLyB6ckIpXG5cblx0XHQjIENvbnZlcnQgZnJvbSBoYWxmIHVuaXQgY2lyY2xlIHRvIHdob2xlIHVuaXQgY2lyY2xlXG5cdFx0aWYgenJCIDwgMFxuXHRcdFx0aGVhZGluZyArPSBNYXRoLlBJXG5cdFx0ZWxzZSBpZiB6ckEgPCAwXG5cdFx0XHRoZWFkaW5nICs9IDIgKiBNYXRoLlBJXG5cblx0XHQjICMgQ2FsY3VsYXRlIEFsdGl0dWRlIChpbiBkZWdyZWVzKVxuXHRcdGVsZXZhdGlvbiA9IE1hdGguUEkgLyAyIC0gTWF0aC5hY29zKC16ckMpXG5cblx0XHRjSCA9IE1hdGguc3FydCgxIC0gKHpyQyAqIHpyQykpXG5cdFx0dGlsdCA9IE1hdGguYWNvcygteHJDIC8gY0gpICogTWF0aC5zaWduKHlyQylcblxuXHRcdCMgQ29udmVydCByYWRpYW5zIHRvIGRlZ3JlZXNcblx0XHRoZWFkaW5nICo9IDE4MCAvIE1hdGguUElcblx0XHRlbGV2YXRpb24gKj0gMTgwIC8gTWF0aC5QSVxuXHRcdHRpbHQgKj0gMTgwIC8gTWF0aC5QSVxuXG5cdFx0QF9oZWFkaW5nID0gTWF0aC5yb3VuZChoZWFkaW5nICogMTAwMCkgLyAxMDAwXG5cdFx0QF9lbGV2YXRpb24gPSBNYXRoLnJvdW5kKGVsZXZhdGlvbiAqIDEwMDApIC8gMTAwMFxuXG5cdFx0dGlsdCA9IE1hdGgucm91bmQodGlsdCAqIDEwMDApIC8gMTAwMFxuXHRcdG9yaWVudGF0aW9uVGlsdE9mZnNldCA9ICh3aW5kb3cub3JpZW50YXRpb24gKiAtMSkgKyA5MFxuXHRcdHRpbHQgKz0gb3JpZW50YXRpb25UaWx0T2Zmc2V0XG5cdFx0aWYgdGlsdCA+IDE4MFxuXHRcdFx0ZGlmZiA9IHRpbHQgLSAxODBcblx0XHRcdHRpbHQgPSAtMTgwICsgZGlmZlxuXHRcdEBfdGlsdCA9IHRpbHRcblxuXHRcdEBfZGV2aWNlSGVhZGluZyA9IEBfaGVhZGluZ1xuXHRcdEBfZGV2aWNlRWxldmF0aW9uID0gQF9lbGV2YXRpb25cblxuXHRcdEBfZW1pdE9yaWVudGF0aW9uRGlkQ2hhbmdlRXZlbnQoKVxuXG5cdCMgRGVza3RvcCB0aWx0XG5cblx0cmVtb3ZlRGVza3RvcFBhbkxheWVyOiA9PlxuXHRcdEBkZXNrdG9wT3JpZW50YXRpb25MYXllcj8uZGVzdHJveSgpXG5cblx0YWRkRGVza3RvcFBhbkxheWVyOiA9PlxuXHRcdEBkZXNrdG9wT3JpZW50YXRpb25MYXllcj8uZGVzdHJveSgpXG5cdFx0QGRlc2t0b3BPcmllbnRhdGlvbkxheWVyID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogMTAwMDAwLCBoZWlnaHQ6IDEwMDAwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHN1cGVyTGF5ZXI6QFxuXHRcdFx0bmFtZTogXCJkZXNrdG9wT3JpZW50YXRpb25MYXllclwiXG5cdFx0QGRlc2t0b3BPcmllbnRhdGlvbkxheWVyLmNlbnRlcigpXG5cdFx0QGRlc2t0b3BPcmllbnRhdGlvbkxheWVyLmRyYWdnYWJsZS5lbmFibGVkID0gdHJ1ZVxuXHRcdFxuXHRcdEBwcmV2RGVza3RvcERpciA9IEBkZXNrdG9wT3JpZW50YXRpb25MYXllci54XG5cdFx0QHByZXZEZXNrdG9wSGVpZ2h0ID0gQGRlc2t0b3BPcmllbnRhdGlvbkxheWVyLnlcblx0XHRcblx0XHRAZGVza3RvcE9yaWVudGF0aW9uTGF5ZXIub24gRXZlbnRzLkRyYWdTdGFydCwgPT5cblx0XHRcdEBwcmV2RGVza3RvcERpciA9IEBkZXNrdG9wT3JpZW50YXRpb25MYXllci54XG5cdFx0XHRAcHJldkRlc2t0b3BIZWlnaHQgPSBAZGVza3RvcE9yaWVudGF0aW9uTGF5ZXIueVxuXHRcdFx0QGRlc2t0b3BEcmFnZ2FibGVBY3RpdmUgPSB0cnVlXG5cdFx0XHRcblx0XHRAZGVza3RvcE9yaWVudGF0aW9uTGF5ZXIub24gRXZlbnRzLk1vdmUsID0+XG5cdFx0XHRpZiBAZGVza3RvcERyYWdnYWJsZUFjdGl2ZVxuXHRcdFx0XHRzdHJlbmd0aCA9IFV0aWxzLm1vZHVsYXRlKEBwZXJzcGVjdGl2ZSwgWzEyMDAsIDkwMF0sIFsyMiwgMTcuNV0pXG5cdFx0XHRcdGRlbHRhRGlyID0gKEBkZXNrdG9wT3JpZW50YXRpb25MYXllci54IC0gQHByZXZEZXNrdG9wRGlyKSAvIHN0cmVuZ3RoXG5cdFx0XHRcdGRlbHRhSGVpZ2h0ID0gKEBkZXNrdG9wT3JpZW50YXRpb25MYXllci55IC0gQHByZXZEZXNrdG9wSGVpZ2h0KSAvIHN0cmVuZ3RoXG5cdFx0XHRcdEBkZXNrdG9wUGFuKGRlbHRhRGlyLCBkZWx0YUhlaWdodClcblx0XHRcdFx0QHByZXZEZXNrdG9wRGlyID0gQGRlc2t0b3BPcmllbnRhdGlvbkxheWVyLnhcblx0XHRcdFx0QHByZXZEZXNrdG9wSGVpZ2h0ID0gQGRlc2t0b3BPcmllbnRhdGlvbkxheWVyLnlcblx0XHRcblx0XHRAZGVza3RvcE9yaWVudGF0aW9uTGF5ZXIub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdEBkZXNrdG9wRHJhZ2dhYmxlQWN0aXZlID0gZmFsc2Vcblx0XHRcdEBkZXNrdG9wT3JpZW50YXRpb25MYXllcj8uY2VudGVyKClcblxuXHRkZXNrdG9wUGFuOiAoZGVsdGFEaXIsIGRlbHRhSGVpZ2h0KSAtPlxuXHRcdGhhbGZDdWJTaWRlID0gQGN1YmVTaWRlLzJcblx0XHR0cmFuc2xhdGlvblggPSBcInRyYW5zbGF0ZVgoI3soQHdpZHRoIC8gMikgLSBoYWxmQ3ViU2lkZX1weClcIlxuXHRcdHRyYW5zbGF0aW9uWSA9IFwiIHRyYW5zbGF0ZVkoI3soQGhlaWdodCAvIDIpIC0gaGFsZkN1YlNpZGV9cHgpXCJcblx0XHR0cmFuc2xhdGlvblogPSBcIiB0cmFuc2xhdGVaKCN7QHBlcnNwZWN0aXZlfXB4KVwiXG5cdFx0QF9oZWFkaW5nIC09IGRlbHRhRGlyXG5cblx0XHRpZiBAX2hlYWRpbmcgPiAzNjBcblx0XHRcdEBfaGVhZGluZyAtPSAzNjBcblx0XHRlbHNlIGlmIEBfaGVhZGluZyA8IDBcblx0XHRcdEBfaGVhZGluZyArPSAzNjBcblxuXHRcdEBfZWxldmF0aW9uICs9IGRlbHRhSGVpZ2h0XG5cdFx0QF9lbGV2YXRpb24gPSBVdGlscy5jbGFtcChAX2VsZXZhdGlvbiwgLTkwLCA5MClcblxuXHRcdHJvdGF0aW9uID0gdHJhbnNsYXRpb25aICsgdHJhbnNsYXRpb25YICsgdHJhbnNsYXRpb25ZICsgXCIgcm90YXRlWCgje0BfZWxldmF0aW9uICsgOTB9ZGVnKSByb3RhdGVaKCN7MzYwIC0gQF9oZWFkaW5nfWRlZylcIiArIFwiIHJvdGF0ZVooI3stQF9oZWFkaW5nT2Zmc2V0fWRlZylcIlxuXHRcdEB3b3JsZC5zdHlsZVtcIndlYmtpdFRyYW5zZm9ybVwiXSA9IHJvdGF0aW9uXG5cblx0XHRAX2hlYWRpbmcgPSBNYXRoLnJvdW5kKEBfaGVhZGluZyAqIDEwMDApIC8gMTAwMFxuXHRcdEBfdGlsdCA9IDBcblx0XHRAX2VtaXRPcmllbnRhdGlvbkRpZENoYW5nZUV2ZW50KClcblxuXHRsb29rQXQ6IChoZWFkaW5nLCBlbGV2YXRpb24pIC0+XG5cdFx0aGFsZkN1YlNpZGUgPSBAY3ViZVNpZGUvMlxuXHRcdHRyYW5zbGF0aW9uWCA9IFwidHJhbnNsYXRlWCgjeyhAd2lkdGggLyAyKSAtIGhhbGZDdWJTaWRlfXB4KVwiXG5cdFx0dHJhbnNsYXRpb25ZID0gXCIgdHJhbnNsYXRlWSgjeyhAaGVpZ2h0IC8gMikgLSBoYWxmQ3ViU2lkZX1weClcIlxuXHRcdHRyYW5zbGF0aW9uWiA9IFwiIHRyYW5zbGF0ZVooI3tAcGVyc3BlY3RpdmV9cHgpXCJcblx0XHRyb3RhdGlvbiA9IHRyYW5zbGF0aW9uWiArIHRyYW5zbGF0aW9uWCArIHRyYW5zbGF0aW9uWSArIFwiIHJvdGF0ZVooI3tAX3RpbHR9ZGVnKSByb3RhdGVYKCN7ZWxldmF0aW9uICsgOTB9ZGVnKSByb3RhdGVaKCN7LWhlYWRpbmd9ZGVnKVwiXG5cblx0XHRAd29ybGQ/LnN0eWxlW1wid2Via2l0VHJhbnNmb3JtXCJdID0gcm90YXRpb25cblx0XHRAX2hlYWRpbmcgPSBoZWFkaW5nXG5cdFx0QF9lbGV2YXRpb24gPSBlbGV2YXRpb25cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpXG5cdFx0XHRAX2hlYWRpbmdPZmZzZXQgPSBAX2hlYWRpbmcgLSBAX2RldmljZUhlYWRpbmdcblxuXHRcdEBfZWxldmF0aW9uT2Zmc2V0ID0gQF9lbGV2YXRpb24gLSBAX2RldmljZUVsZXZhdGlvblxuXG5cdFx0aGVhZGluZyA9IEBfaGVhZGluZ1xuXHRcdGlmIGhlYWRpbmcgPCAwXG5cdFx0XHRoZWFkaW5nICs9IDM2MFxuXHRcdGVsc2UgaWYgaGVhZGluZyA+IDM2MFxuXHRcdFx0aGVhZGluZyAtPSAzNjBcblxuXHRcdEBlbWl0KEV2ZW50cy5PcmllbnRhdGlvbkRpZENoYW5nZSwge2hlYWRpbmc6IGhlYWRpbmcsIGVsZXZhdGlvbjogQF9lbGV2YXRpb24sIHRpbHQ6IEBfdGlsdH0pXG5cblx0X2VtaXRPcmllbnRhdGlvbkRpZENoYW5nZUV2ZW50OiAtPlxuXHRcdEBlbWl0KEV2ZW50cy5PcmllbnRhdGlvbkRpZENoYW5nZSwge2hlYWRpbmc6IEBoZWFkaW5nLCBlbGV2YXRpb246IEBfZWxldmF0aW9uLCB0aWx0OiBAX3RpbHR9KVxuIiwiY2xhc3MgZXhwb3J0cy5BdWRpb1BsYXllciBleHRlbmRzIExheWVyXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwidHJhbnNwYXJlbnRcIlxuXG5cdFx0IyBEZWZpbmUgcGxheWVyXG5cdFx0QHBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiKVxuXHRcdEBwbGF5ZXIuc2V0QXR0cmlidXRlKFwid2Via2l0LXBsYXlzaW5saW5lXCIsIFwidHJ1ZVwiKVxuXHRcdEBwbGF5ZXIuc2V0QXR0cmlidXRlKFwicHJlbG9hZFwiLCBcImF1dG9cIilcblx0XHRAcGxheWVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcblx0XHRAcGxheWVyLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiXG5cblx0XHRAcGxheWVyLm9uID0gQHBsYXllci5hZGRFdmVudExpc3RlbmVyXG5cdFx0QHBsYXllci5vZmYgPSBAcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXJcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdCMgRGVmaW5lIGJhc2ljIGNvbnRyb2xzXG5cdFx0QGNvbnRyb2xzID0gbmV3IExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0d2lkdGg6IDgwLCBoZWlnaHQ6IDgwLCBzdXBlckxheWVyOiBAXG5cdFx0XHRuYW1lOiBcImNvbnRyb2xzXCJcblxuXHRcdEBjb250cm9scy5zaG93UGxheSA9IC0+IEBpbWFnZSA9IFwiaW1hZ2VzL3BsYXkucG5nXCJcblx0XHRAY29udHJvbHMuc2hvd1BhdXNlID0gLT4gQGltYWdlID0gXCJpbWFnZXMvcGF1c2UucG5nXCJcblx0XHRAY29udHJvbHMuc2hvd1BsYXkoKVxuXHRcdEBjb250cm9scy5jZW50ZXIoKVxuXG5cdFx0QHRpbWVTdHlsZSA9IHsgXCJmb250LXNpemVcIjogXCIyMHB4XCIsIFwiY29sb3JcIjogXCIjMDAwXCIgfVxuXG5cdFx0IyBPbiBjbGlja1xuXHRcdEBvbiBFdmVudHMuQ2xpY2ssIC0+XG5cdFx0XHRjdXJyZW50VGltZSA9IE1hdGgucm91bmQoQHBsYXllci5jdXJyZW50VGltZSlcblx0XHRcdGR1cmF0aW9uID0gTWF0aC5yb3VuZChAcGxheWVyLmR1cmF0aW9uKVxuXG5cdFx0XHRpZiBAcGxheWVyLnBhdXNlZFxuXHRcdFx0XHRAcGxheWVyLnBsYXkoKVxuXHRcdFx0XHRAY29udHJvbHMuc2hvd1BhdXNlKClcblxuXHRcdFx0XHRpZiBjdXJyZW50VGltZSBpcyBkdXJhdGlvblxuXHRcdFx0XHRcdEBwbGF5ZXIuY3VycmVudFRpbWUgPSAwXG5cdFx0XHRcdFx0QHBsYXllci5wbGF5KClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHBsYXllci5wYXVzZSgpXG5cdFx0XHRcdEBjb250cm9scy5zaG93UGxheSgpXG5cblx0XHQjIE9uIGVuZCwgc3dpdGNoIHRvIHBsYXkgYnV0dG9uXG5cdFx0QHBsYXllci5vbnBsYXlpbmcgPSA9PiBAY29udHJvbHMuc2hvd1BhdXNlKClcblx0XHRAcGxheWVyLm9uZW5kZWQgPSA9PiBAY29udHJvbHMuc2hvd1BsYXkoKVxuXG5cdFx0IyBVdGlsc1xuXHRcdEBwbGF5ZXIuZm9ybWF0VGltZSA9IC0+XG5cdFx0XHRzZWMgPSBNYXRoLmZsb29yKEBjdXJyZW50VGltZSlcblx0XHRcdG1pbiA9IE1hdGguZmxvb3Ioc2VjIC8gNjApXG5cdFx0XHRzZWMgPSBNYXRoLmZsb29yKHNlYyAlIDYwKVxuXHRcdFx0c2VjID0gaWYgc2VjID49IDEwIHRoZW4gc2VjIGVsc2UgJzAnICsgc2VjXG5cdFx0XHRyZXR1cm4gXCIje21pbn06I3tzZWN9XCJcblxuXHRcdEBwbGF5ZXIuZm9ybWF0VGltZUxlZnQgPSAtPlxuXHRcdFx0c2VjID0gTWF0aC5mbG9vcihAZHVyYXRpb24pIC0gTWF0aC5mbG9vcihAY3VycmVudFRpbWUpXG5cdFx0XHRtaW4gPSBNYXRoLmZsb29yKHNlYyAvIDYwKVxuXHRcdFx0c2VjID0gTWF0aC5mbG9vcihzZWMgJSA2MClcblx0XHRcdHNlYyA9IGlmIHNlYyA+PSAxMCB0aGVuIHNlYyBlbHNlICcwJyArIHNlY1xuXHRcdFx0cmV0dXJuIFwiI3ttaW59OiN7c2VjfVwiXG5cblx0XHRAYXVkaW8gPSBvcHRpb25zLmF1ZGlvXG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkKEBwbGF5ZXIpXG5cblx0QGRlZmluZSBcImF1ZGlvXCIsXG5cdFx0Z2V0OiAtPiBAcGxheWVyLnNyY1xuXHRcdHNldDogKGF1ZGlvKSAtPlxuXHRcdFx0QHBsYXllci5zcmMgPSBhdWRpb1xuXHRcdFx0aWYgQHBsYXllci5jYW5QbGF5VHlwZShcImF1ZGlvL21wM1wiKSA9PSBcIlwiXG5cdFx0XHRcdHRocm93IEVycm9yIFwiTm8gc3VwcG9ydGVkIGF1ZGlvIGZpbGUgaW5jbHVkZWQuXCJcblxuXHRAZGVmaW5lIFwic2hvd1Byb2dyZXNzXCIsXG5cdFx0Z2V0OiAtPiBAX3Nob3dQcm9ncmVzc1xuXHRcdHNldDogKHNob3dQcm9ncmVzcykgLT4gQHNldFByb2dyZXNzKHNob3dQcm9ncmVzcywgZmFsc2UpXG5cblx0QGRlZmluZSBcInNob3dWb2x1bWVcIixcblx0XHRnZXQ6IC0+IEBfc2hvd1ZvbHVtZVxuXHRcdHNldDogKHNob3dWb2x1bWUpIC0+IEBzZXRWb2x1bWUoc2hvd1ZvbHVtZSwgZmFsc2UpXG5cblx0QGRlZmluZSBcInNob3dUaW1lXCIsXG5cdFx0Z2V0OiAtPiBAX3Nob3dUaW1lXG5cdFx0c2V0OiAoc2hvd1RpbWUpIC0+IEBnZXRUaW1lKHNob3dUaW1lLCBmYWxzZSlcblxuXHRAZGVmaW5lIFwic2hvd1RpbWVMZWZ0XCIsXG5cdFx0Z2V0OiAtPiBAX3Nob3dUaW1lTGVmdFxuXHRcdHNldDogKHNob3dUaW1lTGVmdCkgLT4gQGdldFRpbWVMZWZ0KHNob3dUaW1lTGVmdCwgZmFsc2UpXG5cblx0IyBDaGVja3MgYSBwcm9wZXJ0eSwgcmV0dXJucyBcInRydWVcIiBvciBcImZhbHNlXCJcblx0X2NoZWNrQm9vbGVhbjogKHByb3BlcnR5KSAtPlxuXHRcdGlmIF8uaXNTdHJpbmcocHJvcGVydHkpXG5cdFx0XHRpZiBwcm9wZXJ0eS50b0xvd2VyQ2FzZSgpIGluIFtcIjFcIiwgXCJ0cnVlXCJdXG5cdFx0XHRcdHByb3BlcnR5ID0gdHJ1ZVxuXHRcdFx0ZWxzZSBpZiBwcm9wZXJ0eS50b0xvd2VyQ2FzZSgpIGluIFtcIjBcIiwgXCJmYWxzZVwiXVxuXHRcdFx0XHRwcm9wZXJ0eSA9IGZhbHNlXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVyblxuXHRcdGlmIG5vdCBfLmlzQm9vbGVhbihwcm9wZXJ0eSkgdGhlbiByZXR1cm5cblxuXHRnZXRUaW1lOiAoc2hvd1RpbWUpIC0+XG5cdFx0QF9jaGVja0Jvb2xlYW4oc2hvd1RpbWUpXG5cdFx0QF9zaG93VGltZSA9IHNob3dUaW1lXG5cblx0XHRpZiBzaG93VGltZSBpcyB0cnVlXG5cdFx0XHRAdGltZSA9IG5ldyBMYXllclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0XHRuYW1lOiBcImN1cnJlbnRUaW1lXCJcblxuXHRcdFx0QHRpbWUuc3R5bGUgPSBAdGltZVN0eWxlXG5cdFx0XHRAdGltZS5odG1sID0gXCIwOjAwXCJcblxuXHRcdFx0QHBsYXllci5vbnRpbWV1cGRhdGUgPSA9PlxuXHRcdFx0XHRAdGltZS5odG1sID0gQHBsYXllci5mb3JtYXRUaW1lKClcblxuXHRnZXRUaW1lTGVmdDogKHNob3dUaW1lTGVmdCkgPT5cblx0XHRAX2NoZWNrQm9vbGVhbihzaG93VGltZUxlZnQpXG5cdFx0QF9zaG93VGltZUxlZnQgPSBzaG93VGltZUxlZnRcblxuXHRcdGlmIHNob3dUaW1lTGVmdCBpcyB0cnVlXG5cdFx0XHRAdGltZUxlZnQgPSBuZXcgTGF5ZXJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRcdFx0bmFtZTogXCJ0aW1lTGVmdFwiXG5cblx0XHRcdEB0aW1lTGVmdC5zdHlsZSA9IEB0aW1lU3R5bGVcblxuXHRcdFx0IyBTZXQgdGltZUxlZnRcblx0XHRcdEB0aW1lTGVmdC5odG1sID0gXCItMDowMFwiXG5cdFx0XHRAcGxheWVyLm9uIFwibG9hZGVkbWV0YWRhdGFcIiwgPT5cblx0XHRcdFx0QHRpbWVMZWZ0Lmh0bWwgPSBcIi1cIiArIEBwbGF5ZXIuZm9ybWF0VGltZUxlZnQoKVxuXG5cdFx0XHRAcGxheWVyLm9udGltZXVwZGF0ZSA9ID0+XG5cdFx0XHRcdEB0aW1lTGVmdC5odG1sID0gXCItXCIgKyBAcGxheWVyLmZvcm1hdFRpbWVMZWZ0KClcblxuXHRzZXRQcm9ncmVzczogKHNob3dQcm9ncmVzcykgLT5cblx0XHRAX2NoZWNrQm9vbGVhbihzaG93UHJvZ3Jlc3MpXG5cblx0XHQjIFNldCBhcmd1bWVudCAoc2hvd1Byb2dyZXNzIGlzIGVpdGhlciB0cnVlIG9yIGZhbHNlKVxuXHRcdEBfc2hvd1Byb2dyZXNzID0gc2hvd1Byb2dyZXNzXG5cblx0XHRpZiBAX3Nob3dQcm9ncmVzcyBpcyB0cnVlXG5cblx0XHRcdCMgQ3JlYXRlIFByb2dyZXNzIEJhciArIERlZmF1bHRzXG5cdFx0XHRAcHJvZ3Jlc3NCYXIgPSBuZXcgU2xpZGVyQ29tcG9uZW50XG5cdFx0XHRcdHdpZHRoOiAyMDAsIGhlaWdodDogNiwgYmFja2dyb3VuZENvbG9yOiBcIiNlZWVcIlxuXHRcdFx0XHRrbm9iU2l6ZTogMjAsIHZhbHVlOiAwLCBtaW46IDBcblxuXHRcdFx0QHBsYXllci5vbmNhbnBsYXkgPSA9PiBAcHJvZ3Jlc3NCYXIubWF4ID0gTWF0aC5yb3VuZChAcGxheWVyLmR1cmF0aW9uKVxuXHRcdFx0QHByb2dyZXNzQmFyLmtub2IuZHJhZ2dhYmxlLm1vbWVudHVtID0gZmFsc2VcblxuXHRcdFx0IyBDaGVjayBpZiB0aGUgcGxheWVyIHdhcyBwbGF5aW5nXG5cdFx0XHR3YXNQbGF5aW5nID0gaXNNb3ZpbmcgPSBmYWxzZVxuXHRcdFx0dW5sZXNzIEBwbGF5ZXIucGF1c2VkIHRoZW4gd2FzUGxheWluZyA9IHRydWVcblxuXHRcdFx0QHByb2dyZXNzQmFyLm9uIEV2ZW50cy5TbGlkZXJWYWx1ZUNoYW5nZSwgPT5cblx0XHRcdFx0Y3VycmVudFRpbWUgPSBNYXRoLnJvdW5kKEBwbGF5ZXIuY3VycmVudFRpbWUpXG5cdFx0XHRcdHByb2dyZXNzQmFyVGltZSA9IE1hdGgucm91bmQoQHByb2dyZXNzQmFyLnZhbHVlKVxuXHRcdFx0XHRAcGxheWVyLmN1cnJlbnRUaW1lID0gQHByb2dyZXNzQmFyLnZhbHVlIHVubGVzcyBjdXJyZW50VGltZSA9PSBwcm9ncmVzc0JhclRpbWVcblxuXHRcdFx0XHRpZiBAdGltZSBhbmQgQHRpbWVMZWZ0XG5cdFx0XHRcdFx0QHRpbWUuaHRtbCA9IEBwbGF5ZXIuZm9ybWF0VGltZSgpXG5cdFx0XHRcdFx0QHRpbWVMZWZ0Lmh0bWwgPSBcIi1cIiArIEBwbGF5ZXIuZm9ybWF0VGltZUxlZnQoKVxuXG5cdFx0XHRAcHJvZ3Jlc3NCYXIua25vYi5vbiBFdmVudHMuRHJhZ01vdmUsID0+IGlzTW92aW5nID0gdHJ1ZVxuXG5cdFx0XHRAcHJvZ3Jlc3NCYXIua25vYi5vbiBFdmVudHMuRHJhZ0VuZCwgKGV2ZW50KSA9PlxuXHRcdFx0XHRjdXJyZW50VGltZSA9IE1hdGgucm91bmQoQHBsYXllci5jdXJyZW50VGltZSlcblx0XHRcdFx0ZHVyYXRpb24gPSBNYXRoLnJvdW5kKEBwbGF5ZXIuZHVyYXRpb24pXG5cblx0XHRcdFx0aWYgd2FzUGxheWluZyBhbmQgY3VycmVudFRpbWUgaXNudCBkdXJhdGlvblxuXHRcdFx0XHRcdEBwbGF5ZXIucGxheSgpXG5cdFx0XHRcdFx0QGNvbnRyb2xzLnNob3dQYXVzZSgpXG5cblx0XHRcdFx0aWYgY3VycmVudFRpbWUgaXMgZHVyYXRpb25cblx0XHRcdFx0XHRAcGxheWVyLnBhdXNlKClcblx0XHRcdFx0XHRAY29udHJvbHMuc2hvd1BsYXkoKVxuXG5cdFx0XHRcdHJldHVybiBpc01vdmluZyA9IGZhbHNlXG5cblx0XHRcdCMgVXBkYXRlIFByb2dyZXNzXG5cdFx0XHRAcGxheWVyLm9udGltZXVwZGF0ZSA9ID0+XG5cdFx0XHRcdHVubGVzcyBpc01vdmluZ1xuXHRcdFx0XHRcdEBwcm9ncmVzc0Jhci5rbm9iLm1pZFggPSBAcHJvZ3Jlc3NCYXIucG9pbnRGb3JWYWx1ZShAcGxheWVyLmN1cnJlbnRUaW1lKVxuXHRcdFx0XHRcdEBwcm9ncmVzc0Jhci5rbm9iLmRyYWdnYWJsZS5pc01vdmluZyA9IGZhbHNlXG5cblx0XHRcdFx0aWYgQHRpbWUgYW5kIEB0aW1lTGVmdFxuXHRcdFx0XHRcdEB0aW1lLmh0bWwgPSBAcGxheWVyLmZvcm1hdFRpbWUoKVxuXHRcdFx0XHRcdEB0aW1lTGVmdC5odG1sID0gXCItXCIgKyBAcGxheWVyLmZvcm1hdFRpbWVMZWZ0KClcblxuXHRzZXRWb2x1bWU6IChzaG93Vm9sdW1lKSAtPlxuXHRcdEBfY2hlY2tCb29sZWFuKHNob3dWb2x1bWUpXG5cblx0XHQjIFNldCBkZWZhdWx0IHRvIDc1JVxuXHRcdEBwbGF5ZXIudm9sdW1lID89IDAuNzVcblxuXHRcdEB2b2x1bWVCYXIgPSBuZXcgU2xpZGVyQ29tcG9uZW50XG5cdFx0XHR3aWR0aDogMjAwLCBoZWlnaHQ6IDZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjZWVlXCJcblx0XHRcdGtub2JTaXplOiAyMFxuXHRcdFx0bWluOiAwLCBtYXg6IDFcblx0XHRcdHZhbHVlOiBAcGxheWVyLnZvbHVtZVxuXG5cdFx0QHZvbHVtZUJhci5rbm9iLmRyYWdnYWJsZS5tb21lbnR1bSA9IGZhbHNlXG5cblx0XHRAdm9sdW1lQmFyLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRAdm9sdW1lQmFyLnZhbHVlID0gQHBsYXllci52b2x1bWVcblxuXHRcdEB2b2x1bWVCYXIub24gXCJjaGFuZ2U6dmFsdWVcIiwgPT5cblx0XHRcdEBwbGF5ZXIudm9sdW1lID0gQHZvbHVtZUJhci52YWx1ZVxuIl19
