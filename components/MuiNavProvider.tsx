import React, { useState } from 'react';

export function MuiNavProvider({...props}) {

  const [PageValue, setPageValue] = useState(0);

  const childrenWithExtraProp = React.Children.map(props.children, child =>
    React.cloneElement(child, { setPageValue: setPageValue, PageValue: PageValue })
  );

  return <div>{childrenWithExtraProp}</div>;
};
