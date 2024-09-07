import { CodeBlock } from '../CodeBlock';
import SubTitle from '../ui/SubTitle';

export const Usage = () => {
  return (
    <div>
      <SubTitle>Usage</SubTitle>
      <p>Render the toaster in the root of your app.</p>
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
