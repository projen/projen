

export function reduceRenderObject( obj:Record<string, any> ) {

  const result = Object.keys(obj).reduce( ( inp:Record<string, any>, key:string) => {

    if (obj[ key ] !== undefined) inp[ key ] = obj[ key ];

    return inp;
  }, {} );

  if ( Object.keys( result).length === 0 ) return undefined;

  return result;
}


export function reduceRenderArray( arr:any[]|undefined ) {

  if ( arr === undefined ) return arr;
  else if (arr.length === 0) return undefined;
  return arr;
}