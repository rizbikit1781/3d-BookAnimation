import React, { useRef } from "react";
import { pages } from "./UI";
import { BoxGeometry, Vector3 } from "three";

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71; 
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(
    PAGE_WIDTH,
    PAGE_HEIGHT,
    PAGE_DEPTH,
    PAGE_SEGMENTS,
    2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0)

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
    // ALL VERTICES
    vertex.fromBufferAttribute(position, i); // get the vertex
    const x = vertex.x; // get the x position of the vertex
  
    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH)); // calculate the skin index
    let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH; // calculate the skin weight
  
    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0); // set the skin indexes
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0); // set the skin weights
  }
  

const Page = ({ number, front, back, ...props }) => {
  const group = useRef();

  return (
    <group {...props} ref={group}>
      <mesh scale={0.1}>
        <primitive object={pageGeometry} attach={"geometry"} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
};

const Book = ({ ...prop }) => {
  return (
    <group {...prop}>
      {[...pages].map((pageData, index) => 
      index === 0 ? (
        <Page 
        position-x={index * 0.15}
        key={index} number={index} {...pageData} />
      ) : null
     
    )}
    </group>
  );
};

export default Book;
