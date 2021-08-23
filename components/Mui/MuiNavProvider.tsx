import React, { useState } from 'react';

export function MuiNavProvider({...props}) {

  const [PageValue, setPageValue] = useState(0);

  const childrenWithExtraProp = React.Children.map(props.children, child =>
    React.cloneElement(child, { setpagevalue: setPageValue, pagevalue: PageValue , ...child.props})
  );

  return <div>{childrenWithExtraProp}</div>;
};
