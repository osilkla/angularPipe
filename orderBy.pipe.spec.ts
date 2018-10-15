import { ArraySortPipe } from '../orderBy.pipe';

let pipe: ArraySortPipe;
let items: any[];

describe('ArraySortPipe', () => {
    beforeAll(() => {
        items = [
            { id: 1, label: 'dog', town: 'angers' },
            { id: 2, label: 'elephant', town: 'marseille' },
            { id: 3, label: 'dahut', town: 'lyon' }
        ];
    });

    beforeEach(() => {
        pipe = new ArraySortPipe();
    });

    it('Should return empty array when list is null', () => {
        const orderedElements: any[] = pipe.transform(null, null);
        expect(orderedElements).toEqual([]);
    });

    it('Should return list when field is null', () => {
        const orderedElements: any[] = pipe.transform(items, null);
        expect(orderedElements).not.toBeNull();
        expect(orderedElements[0].id).toEqual(items[0].id);
        expect(orderedElements[1].id).toEqual(items[1].id);
        expect(orderedElements[2].id).toEqual(items[2].id);
    });

    it('Should return list when field is not in list', () => {
        const orderedElements: any[] = pipe.transform(items, 'other');
        expect(orderedElements).not.toBeNull();
        expect(orderedElements[0].id).toEqual(items[0].id);
        expect(orderedElements[1].id).toEqual(items[1].id);
        expect(orderedElements[2].id).toEqual(items[2].id);
    });

    it('Should order by town when field is town', () => {
        const orderedElements: any[] = pipe.transform(items, 'town');
        expect(orderedElements).not.toBeNull();
        expect(orderedElements[0].id).toEqual(1);
        expect(orderedElements[1].id).toEqual(3);
        expect(orderedElements[2].id).toEqual(2);
    });

    it('Should order by label when field is label', () => {
        const orderedElements: any[] = pipe.transform(items, 'label');
        expect(orderedElements).not.toBeNull();
        expect(orderedElements[0].id).toEqual(3);
        expect(orderedElements[1].id).toEqual(1);
        expect(orderedElements[2].id).toEqual(2);
    });

    it('Should order by nested field', () => {
      const nestedItems = [
        { item: { count: 3 }},
        { item: { count: 1 }},
        { item: { count: 4 }},
      ];
      const orderedElements: any[] = pipe.transform(nestedItems, 'item.count');
      expect(orderedElements).not.toBeNull();
      expect(orderedElements[0].item.count).toEqual(1);
      expect(orderedElements[1].item.count).toEqual(3);
      expect(orderedElements[2].item.count).toEqual(4);
    });

  it('Should not sort the list when nested field not exists', () => {
    const nestedItems = [
      { item: { count: 3 }},
      { item: { count: 1 }},
      { item: { count: 4 }},
    ];
    const orderedElements: any[] = pipe.transform(nestedItems, 'item.foo');
    expect(orderedElements).not.toBeNull();
    expect(orderedElements[0].item.count).toEqual(3);
    expect(orderedElements[1].item.count).toEqual(1);
    expect(orderedElements[2].item.count).toEqual(4);
  });

});
