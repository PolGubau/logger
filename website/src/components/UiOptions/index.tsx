'use client';
import { CodeBlock } from '../CodeBlock';
import SubTitle from '../ui/SubTitle';

export const UiOptions = () => {
  return (
    <div>
      <SubTitle>UI components</SubTitle>
      <p>To render the log list in your app, multiple options are provided</p>

      <h3>Modal log list</h3>
      {/* <ModalView /> */}

      <CodeBlock initialHeight={270}>{`import { Toaster, toast } from 'logger'
      
function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast('My first toast')}>
        Give me a toast
      </button>
    </div>
  )
}`}</CodeBlock>
    </div>
  );
};
