import * as entities from '../src/state/entities.js';
import * as squares from '../src/state/squares.js';
import * as battleMap from '../src/view/battle-map.js';
import * as selectors from "../src/state/selectors.js";

test('adds 1 + 2 to equal 3', () => {
    fetch.mockResponse(() => 'ok');

    entities.setEntities({1: {_id: 1, name: '1', text: '1', position: 1}});
    squares.setSquares({});
    battleMap.renderBattleMap();

    expect(selectors.getEntities()).toBe(2);
});
