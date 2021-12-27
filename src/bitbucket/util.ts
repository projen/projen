

export function nonEmptyMembers( ...members: any[] ) {

  for ( var i = 0; i < members.length; i += 1 ) {

    if ( members[ i ].length > 0 ) return true;
  }

  return false;
}