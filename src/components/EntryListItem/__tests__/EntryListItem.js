const React = require('react/addons');
const expect = require('expect');

const { TestUtils } = React.addons;

jest.dontMock('../index.js');
const EntryListItem = require('../index.js');

let shallowRenderer;

const defaultProps = {
  entry: {
    label: 'a label',
    type: 'a type',
    id: 'a key'
  }
};


describe('EntryListItem', () => {
  beforeEach(function(){
    shallowRenderer = TestUtils.createRenderer();
  });

  it('should render correctly', () => {
    expect(<EntryListItem />).toExist();
    shallowRenderer.render(<EntryListItem { ...defaultProps } />);

    const output = shallowRenderer.getRenderOutput();

    expect(output.type).toEqual('div');
    expect(output.props.className).toBe('entry-list-item');
  });
  it('should have the correct children', () => {
    shallowRenderer.render(<EntryListItem { ...defaultProps } />);
    const output = shallowRenderer.getRenderOutput();
    let [ div1, div2 ] = output.props.children;

    expect(div1.props.children).toMatch(/a label/);

    let small = div2.props.children;
    expect(small.props.children).toMatch(/a type/);
  });
});

