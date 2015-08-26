const React = require('react/addons');
const expect = require('expect');

const { TestUtils } = React.addons;

jest.dontMock('../index.js');
const EntriesList = require('../index.js');
const EntryListItem = require('../../EntryListItem')

const shallowRenderer = TestUtils.createRenderer();

const defaultProps = {
  entries: [],
  loadPending: false,
  savePending: false
};

describe('EntriesList', () => {

  it('should render correctly', () => {
    expect(<EntriesList />).toExist();
    shallowRenderer.render(<EntriesList { ...defaultProps } />);
    const output = shallowRenderer.getRenderOutput();

    expect(output.type).toEqual('div');
    expect(output.props.className).toBe('entries-list');
  });

  it('should have a pending state for loading', () => {
    const props = {
      entries: [],
      loadPending: true,
      savePending: false
    };
    shallowRenderer.render(<EntriesList { ...props } />);
    const output = shallowRenderer.getRenderOutput();

    const div1 = output.props.children[0];

    expect(div1.props.className).toBe('loading-message');
    expect(div1.props.children).toMatch(/Loading notes.../);
  });

  it('should have the correct children', () => {
    shallowRenderer.render(<EntriesList { ...defaultProps } />);
    const output = shallowRenderer.getRenderOutput();

    const [ div1, div2 ] = output.props.children;

    expect(div1.props.className).toBe('loading-message');
    expect(div1.props.children).toBe('Loading notes...');

    expect(div2.props.className).toBe('entry-items-container');
    expect(div2.props.children.props.className).toBe('entry-content-empty');
    expect(div2.props.children.props.children).toMatch(/No notes found. Maybe you could add some now?/);
  });

  it('should render EntryListItems for entries', () => {
    const props = {
      entries: [
        {
          label: 'a label',
          type: 'a type',
          id: 'a key'
        },
        {
          label: 'another label',
          type: 'another type',
          id: 'another key'
        }
      ],
      loadPending: false,
      savePending: false
    };
    const entriesList = TestUtils.renderIntoDocument( <EntriesList { ...props } /> );
    const entryListItem = TestUtils.scryRenderedComponentsWithType(entriesList, EntryListItem);
    expect(entryListItem).toExist();
    const { entry } = entryListItem[0].props;
    expect(entry.label).toMatch(/a label/);
    expect(entry.type).toMatch(/a type/);
  });

});

