'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    var scale = [0.3, 0.3, 0.3];
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroBox
          position={[0, -0.5, -1]}
          scale={[0.3, 0.3, 0.1]}
          materials={['grid']}
          animation={{ name: 'rotate', run: true, loop: true }}
        />
        <ViroAmbientLight color={'#aaaaaa'} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        <ViroNode key="obj" position={[1, 0, -5]} scale={scale}>
          <Viro3DObject
            source={{
              uri:
                'https://raw.githubusercontent.com/viromedia/viro/master/js/ProductShowcase/res/tv.obj',
            }}
            materials={['tv']}
            type="OBJ"
          />
        </ViroNode>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  tv: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: {
      uri:
        'https://raw.githubusercontent.com/viromedia/viro/master/js/ProductShowcase/res/tv_diffuse.png',
    },
    specularTexture: {
      uri:
        'https://raw.githubusercontent.com/viromedia/viro/blob/master/js/ProductShowcase/res/tv_specular.png',
    },
  },
  grid: {
    diffuseTexture: {
      uri:
        'http://colombiavip.com/wp-content/uploads/cache/images/remote/i2-wp-com/63189807-2580968414.png',
    },
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    duration: 250, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;
