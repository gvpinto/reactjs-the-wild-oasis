import styled from 'styled-components';
import GlobalStyles from './styles/globalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const StyledApp = styled.div`
  background-color: orange;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as='h1'>Hello World</Heading>
        <Button onClick={() => alert('Check In')}>Check in</Button>
        <Button onClick={() => alert('Check Out')}>Check Out</Button>
        <Heading as='h2'>Check In Check Out</Heading>

        <Heading as='h3'>Form</Heading>
        <Input
          type='number'
          placeholder='Number of guests'
        />
      </StyledApp>
    </>
  );
}

export default App;
