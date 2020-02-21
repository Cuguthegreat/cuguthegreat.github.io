import * as init from '../src/init.js';
import * as selectors from "../src/state/selectors.js";

test('adds 1 + 2 to equal 3', () => {
    fetch.mockResponse(() => 'ok');
    init.initBattleMap({1: {_id: 1, name: '1', text: '1', position: 1}}, {});

    expect(selectors.getEntities()).toBe(2);
});
