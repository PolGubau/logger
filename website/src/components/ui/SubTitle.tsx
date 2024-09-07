import { PropsWithChildren } from 'react';

const SubTitle = (props: PropsWithChildren) => {
  return <h2>{props.children}</h2>;
};

export default SubTitle;
