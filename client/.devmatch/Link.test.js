import renderer from 'react-test-renderer';
import LogIn from '../src/views/Auth/LogIn.js';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <LogIn page="http://www.facebook.com">Facebook</LogIn>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});