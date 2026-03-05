#!/usr/bin/env node
/**
 * Applies the "do not mutate props" fix to react-native-camera-kit Camera.ios.tsx
 * so the camera doesn't throw "Cannot add new property 'zoom'" on React's read-only props.
 * Run automatically after yarn install (postinstall).
 */
const fs = require('fs');
const path = require('path');

const targetPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-camera-kit',
  'src',
  'Camera.ios.tsx'
);

if (!fs.existsSync(targetPath)) {
  console.log('patch-react-native-camera-kit: package not found, skipping.');
  process.exit(0);
}

let content = fs.readFileSync(targetPath, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

const oldBlock = `  // RN doesn't support optional view props yet (sigh)
  // so we have to use -1 to indicate 'undefined'
  // All int/float/double props from src/specs/CameraNativeComponent.ts need be mentioned here
  props.zoom = props.zoom ?? -1;
  props.maxZoom = props.maxZoom ?? -1;
  props.scanThrottleDelay = props.scanThrottleDelay ?? -1;
  props.iOsSleepBeforeStarting = props.iOsSleepBeforeStarting ?? -1;

  props.allowedBarcodeTypes = props.allowedBarcodeTypes ?? supportedCodeFormats;

  props.resetFocusTimeout = props.resetFocusTimeout ?? 0;
  props.resetFocusWhenMotionDetected = props.resetFocusWhenMotionDetected ?? true;

  React.useImperativeHandle(ref, () => ({`;

const newBlock = `  // RN doesn't support optional view props yet (sigh)
  // so we have to use -1 to indicate 'undefined'. Do not mutate props (read-only).
  const safeProps = {
    ...props,
    zoom: props.zoom ?? -1,
    maxZoom: props.maxZoom ?? -1,
    scanThrottleDelay: props.scanThrottleDelay ?? -1,
    iOsSleepBeforeStarting: props.iOsSleepBeforeStarting ?? -1,
    allowedBarcodeTypes: props.allowedBarcodeTypes ?? supportedCodeFormats,
    resetFocusTimeout: props.resetFocusTimeout ?? 0,
    resetFocusWhenMotionDetected: props.resetFocusWhenMotionDetected ?? true,
  };

  React.useImperativeHandle(ref, () => ({`;

const oldReturn = `  return <NativeCamera style={{ minWidth: 100, minHeight: 100 }} ref={nativeRef} {...props} />;`;
const newReturn = `  return <NativeCamera style={{ minWidth: 100, minHeight: 100 }} ref={nativeRef} {...safeProps} />;`;

if (content.includes('const safeProps = {')) {
  console.log('patch-react-native-camera-kit: already patched.');
  process.exit(0);
}

if (!content.includes('props.zoom = props.zoom ?? -1')) {
  console.warn('patch-react-native-camera-kit: source changed, skip patching.');
  process.exit(0);
}

content = content.replace(oldBlock, newBlock).replace(oldReturn, newReturn);
fs.writeFileSync(targetPath, content);
console.log('patch-react-native-camera-kit: applied.');
