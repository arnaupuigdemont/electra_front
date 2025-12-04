declare module '@deck.gl/react' {
  const DeckGL: any;
  export default DeckGL;
}

declare module '@deck.gl/core' {
  export class OrthographicView {
    constructor(opts?: any);
  }
}

declare module '@deck.gl/layers' {
  export class ScatterplotLayer<T = any> {
    constructor(opts?: any);
  }
  export class LineLayer<T = any> {
    constructor(opts?: any);
  }
}
